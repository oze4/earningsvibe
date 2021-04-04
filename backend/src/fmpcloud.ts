import got from 'got';
import {
  Earnings,
  BeforeOrAfter,
  Stock,
  TimePeriod,
  EarningsVibe
} from './types';
import { getRelativeDate } from './utils';
import e from 'express';
import { stdout } from 'process';

/**
 * FMPCloud allows you to interact with the fmpcloud.io API
 */
export default class FMPCloud {
  #baseURL = 'https://fmpcloud.io/api/v3';
  #apiKey = '';

  constructor(apikey = '') {
    if (apikey === '') {
      throw new Error('Error : FMPCloud : apikey is required!');
    }
    this.#apiKey = apikey;
  }

  /**
   * Formats a date to YYYY-MM-DD
   * @param {Date} date date to format
   */
  #formatDateString = (date = new Date(Date.now())) => {
    const x = new Date(date);
    const year = x.getFullYear();
    // need a 2 digit month
    let month = String(x.getMonth() + 1);
    if (month.length === 1) {
      month = '0' + month;
    }
    // need a 2 digit day
    let day = String(x.getDate());
    if (day.length === 1) {
      day = '0' + day;
    }
    return `${year}-${month}-${day}`;
  };

  /**
   * Returns "company profile" (misc data) for a symbol
   * @param {string} symbol ticker symbol
   */
  CompanyProfile = async (symbol = '') => {
    try {
      const url =
        this.#baseURL +
        '/profile/' +
        symbol.toUpperCase() +
        '?apikey=' +
        this.#apiKey;

      const r = await got(url);
      return JSON.parse(r.body);
    } catch (e) {
      console.log('Error : CompanyProfile : ', e);
      throw e;
    }
  };

  /**
   * Returns historical earnings info
   * @param {string} symbol ticker symbol
   * @param {number} numberOfPriorEarnings N number of prior earnings to return
   */
  HistoricalEarnings = async (
    symbol: string,
    numberOfPriorEarnings: number
  ) => {
    try {
      const url =
        this.#baseURL +
        '/historical/earning_calendar/' +
        symbol.toUpperCase() +
        '?limit=' +
        // NOTE : we have to add a buffer the earnings count because fmpcloud.io will return
        // the "next" earnings date(s), even though there will be no data.... Sometimes they
        // return one null date, sometimes two, etc... We add a buffer, then slice at the end
        // as to return the requested amount of earnings.
        String(numberOfPriorEarnings + 8) +
        '&apikey=' +
        this.#apiKey;

      const r = await got(url);
      const earnings: Earnings[] = JSON.parse(r.body);

      return earnings
        .filter((e) => e.eps !== null)
        .map((e) => {
          const d = new Date(e.date);
          return {
            ...e,
            daysAfter: new Date(getRelativeDate(BeforeOrAfter.after, 1, d)),
            daysBefore: new Date(getRelativeDate(BeforeOrAfter.before, 1, d))
          };
        })
        .slice(0, numberOfPriorEarnings);
    } catch (e) {
      console.log('Error : HistoricalEarnings : ', e);
      throw e;
    }
  };

  /**
   * Get historical stock info.
   * @param {string} symbol stock ticker symbol
   * @param {Date} startDate starting date range
   * @param {Date} endDate ending date range
   * @param {TimePeriod} timePeriod
   */
  HistoricalStock = async (
    symbol: string,
    startDate: Date,
    endDate: Date,
    timePeriod = TimePeriod['1hour']
  ): Promise<Stock[]> => {
    try {
      const from = this.#formatDateString(startDate);
      const to = this.#formatDateString(endDate);
      console.log(`getting historial stock data from ${from} to ${to}`);
      const url =
        this.#baseURL +
        '/historical-chart/' +
        timePeriod.toString() +
        '/' +
        symbol.toUpperCase() +
        '?from=' +
        from +
        '&to=' +
        to +
        '&apikey=' +
        this.#apiKey;

      console.log(`HistoricalStock : url ${url}`);

      const resp = await got(url);
      const data = JSON.parse(resp.body);
      return data.map((d: Stock) => ({ ...d, formattedDate: this.#formatDateString(d.date) }));
    } catch (error) {
      const e = new Error(`fmpcloud.HistoricalStock : Error : ${error}`);
      console.log(e);
      throw e;
    }
  };

  /**
   * Gets N earnings for X symbol. Gathers intraday data for the dates "surrounding" each
   * earnings report (so you can get a feel for historical bias).
   * @param {string} symbol ticker symbol
   * @param {number} count number of historical earnings to vibe check
   */
  VibeCheck = async (symbol: string, count = 4): Promise<any> => {
    const earnings = await this.HistoricalEarnings(symbol, count);

    const promises: Promise<Stock[]>[] = [];
    earnings.forEach((e) => {
      promises.push(
        this.HistoricalStock(
          e.symbol,
          e.daysBefore,
          e.daysAfter,
          TimePeriod['1min']
        )
      );
    });

    const stockDatas = await Promise.all(promises);

    let finalData: EarningsVibe[] = [];
    stockDatas.forEach((stockData) => {
      const stock = stockData[0];
      if (stock && stock.date) {
        console.log(`valid stock data found : `, new Date(stock.date));
        const stockDate = new Date(stock.date).valueOf();
        const foundEarnings = earnings.find((e) => {
          const start = new Date(e.daysBefore).valueOf();
          const end = new Date(e.daysAfter).valueOf();

          const _start = new Date(new Date(start).setHours(0, 0, 0, 0));
          const _end = new Date(new Date(end).setHours(0, 0, 0, 0));
          const _stockDate = new Date(new Date(stockDate).setHours(0, 0, 0, 0));
          const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          var d = new Date();
          const foundDates = stockData.reduce(
            (accumulator, current) => {
              if(!accumulator.some(x => x.date.valueOf() === current.date.valueOf())) {
                accumulator.push(current)
              }
              return accumulator;
            }, ([] as Stock[])
          )
          const isEarnings =
            _stockDate.valueOf() >= _start.valueOf() &&
            _stockDate.valueOf() <= _end.valueOf();
          console.log({
            dateLocaleStringWithCurrentTimezone: d.toLocaleString('en-US', {
              timeZone
            }),
            timeZone,
            earningsDate: e.date,
            daysBefore: e.daysBefore,
            stockDate: stock.date,
            daysAfter: e.daysAfter,
            startBefore: new Date(e.daysBefore),
            startBeforeWithCurrentTimezone: new Date(
              start
            ).toLocaleString('en-US', { timeZone }),
            start_hoursZerodOut: new Date(_start).toLocaleString(),
            endBefore: new Date(e.daysAfter),
            endBeforeWithCurrentTimezone: new Date(end).toLocaleString(
              'en-US',
              { timeZone }
            ),
            end_hoursZerodOut: new Date(_end).toLocaleString(),
            stockDateBefore: new Date(stockDate).toLocaleString(),
            stockDate_hoursZerodOut: new Date(_stockDate).toLocaleString(),
            isEarningsFormula: `'${_stockDate}' less than or equal to '${_start}' and greater than or equal to '${_end}'`,
            isEarnings,
            foundDates: isEarnings ? foundDates.length : '',
          });
          // console.log({ start: new Date(new Date(start).setHours(0, 0, 0, 0)), end: new Date(new Date(end).setHours(0, 0, 0, 0)), stockDate: new Date(new Date(stockDate).setHours(0, 0, 0, 0)), isEarnings: `${new Date(stockDate).setHours(0, 0, 0, 0)} >= ${new Date(start).setHours(0, 0, 0, 0)} && ${new Date(stockDate).setHours(0, 0, 0, 0)} <= ${new Date(end).setHours(0, 0, 0, 0)} === ${new Date(stockDate).setHours(0, 0, 0, 0) >= new Date(start).setHours(0, 0, 0, 0) && new Date(stockDate).setHours(0, 0, 0, 0) <= new Date(end).setHours(0, 0, 0, 0)}` })
          //return new Date(stockDate).setHours(0, 0, 0, 0) >= new Date(start).setHours(0, 0, 0, 0) && new Date(stockDate).setHours(0, 0, 0, 0) <= new Date(end).setHours(0, 0, 0, 0);
          return (
            _stockDate.valueOf() >= _start.valueOf() &&
            _stockDate.valueOf() <= _end.valueOf()
          );
        });

        if (foundEarnings) {
          const ssd = stockData.sort(
            (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
          );
          console.log(
            `found earnings that matches stock date! Pushing into finalData : ${
              ssd.length
            } : start ${ssd[0].date} : end ${ssd[ssd.length - 1].date}`
          );
          finalData.push({
            earnings: foundEarnings,
            stock: ssd
          });
        }
      } else {
        console.log(`invalid or missing stock data`);
      }
    });
    console.log(`finalData.length = ${finalData.length}`);
    return finalData;
  };
}
