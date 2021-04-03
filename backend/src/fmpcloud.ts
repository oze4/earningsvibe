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
        String(numberOfPriorEarnings) +
        '&apikey=' +
        this.#apiKey;

      const r = await got(url);
      const earnings: Earnings[] = JSON.parse(r.body);

      return earnings.map((e) => {
        const d = new Date(e.date);
        return {
          ...e,
          daysAfter: new Date(getRelativeDate(BeforeOrAfter.after, 1, d)),
          daysBefore: new Date(getRelativeDate(BeforeOrAfter.before, 1, d))
        };
      });
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
    timePeriod = TimePeriod['1hour'],
    earningsDate: Date
  ): Promise<Stock[]> => {
    try {
      if (timePeriod in TimePeriod === false) {
        throw new Error('Invalid time period');
      }

      const url =
        this.#baseURL +
        '/historical-chart/' +
        timePeriod.toString() +
        '/' +
        symbol.toUpperCase() +
        '?from=' +
        this.#formatDateString(startDate) +
        '&to=' +
        this.#formatDateString(endDate) +
        '&apikey=' +
        this.#apiKey;

      const res = await got(url);
      const stockdata = JSON.parse(res.body);
      return stockdata.sort();
    } catch (err) {
      console.log(`Error : [HistoricalStock] : ${err}`);
      throw err;
    }
  };

  /**
   * Gets N earnings for X symbol. Gathers intraday data for the dates "surrounding" each
   * earnings report (so you can get a feel for historical bias).
   * @param {string} symbol ticker symbol
   * @param {number} count number of historical earnings to vibe check
   */
  VibeCheck = async (symbol: string, count = 4): Promise<any> => {
    try {
      const earnings = await this.HistoricalEarnings(symbol, count);

      console.log(`got earnings : count = ${earnings.length}`);

      const promises: Promise<Stock[]>[] = [];
      earnings.forEach((e) => {
        promises.push(
          this.HistoricalStock(
            e.symbol,
            e.daysBefore,
            e.daysAfter,
            TimePeriod['1min'],
            e.date // this is a hack
          )
        );
      });

      const stockDataArrayOfArrays = await Promise.all(promises);

      console.log(`got stock data : count = ${stockDataArrayOfArrays.length}`);

      const finalData: EarningsVibe[] = [];

      stockDataArrayOfArrays.forEach((stockDataArray) => {
        const firstStockData = stockDataArray[0];
        if (firstStockData && firstStockData.date) {
          console.log(`found first stock data : ${new Date(firstStockData.date)}`);
          const firstStockDataDate = new Date(firstStockData.date).valueOf();

          const foundEarnings = earnings.find((e) => {
            const start = new Date(e.daysBefore).valueOf();
            const end = new Date(e.daysAfter).valueOf();
            return firstStockDataDate >= start && firstStockDataDate <= end;
          });
          if (foundEarnings) {
            finalData.push({
              earnings: foundEarnings,
              stock: stockDataArray.sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              )
            });
          }
        }
      });

      return finalData;

      // return earnings.map((earning) => {
      //   let vibe = { earning, stock: [] as Stock[] };
      //   stockDataArrayOfArrays.forEach((stockData) => {
      //     console.log({ stockDataZero: stockData[0] });
      //     if (!stockData || stockData.length <= 0 || !stockData[0].date)
      //       throw new Error('stockData[0].date is null');
      //     const stockDataDate = new Date(stockData[0].date);
      //     console.log(
      //       `${stockDataDate.valueOf()} >= ${earning.daysBefore.valueOf()} && ${stockDataDate.valueOf()} <= ${earning.daysAfter.valueOf()}`,
      //       stockDataDate.valueOf() >= earning.daysBefore.valueOf(),
      //       stockDataDate.valueOf() <= earning.daysAfter.valueOf()
      //     );
      //     if (
      //       stockDataDate.valueOf() >= earning.daysBefore.valueOf() &&
      //       stockDataDate.valueOf() <= earning.daysAfter.valueOf()
      //     ) {
      //       vibe.stock = stockData;
      //     }
      //   });
      //   return vibe;
      // });
    } catch (e) {
      console.error(`Error : [VibeCheck] : ${e}`);
      throw e;
    }
  };
}
