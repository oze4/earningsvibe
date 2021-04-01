import got from 'got';
import { Earnings, BeforeOrAfter, Stock, TimePeriod } from './types';
import { getRelativeDate } from './utils';

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
        String(numberOfPriorEarnings + 2) +
        '&apikey=' +
        this.#apiKey;

      const r = await got(url);
      const earnings: Earnings[] = JSON.parse(r.body);

      return (
        earnings
          // fmpcloud will give us future earnings, even though the objects will not contain data.
          // We only care about earnings that have already been reported.
          .filter((e: Earnings) => e.eps !== null)
          // Add start and end dates to each Earning object
          .map((e) => {
            const d = new Date(e.date);
            return {
              ...e,
              daysAfter: getRelativeDate(BeforeOrAfter.after, 2, d),
              daysBefore: getRelativeDate(BeforeOrAfter.before, 2, d)
            };
          })
          // Only return requested amount of earnings
          .slice(0, numberOfPriorEarnings)
      );
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
      return stockdata.map((sd: Stock) => ({ ...sd, earningsDate }));
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
      const stockDataRequests = earnings.map((e) => {
        return this.HistoricalStock(
          e.symbol,
          e.daysBefore,
          e.daysAfter,
          TimePeriod['1min'],
          e.date
        );
      });

      const stockDatas = await Promise.all(stockDataRequests);

      const returnData = earnings.map((earning) => {
        console.log(`\nEarning Date : ${earning.date} : Before : ${earning.daysBefore} : After : ${earning.daysAfter}`);
        let vibe = { earning, stock: [] as Stock[] };

        stockDatas.forEach((stockData) => {
          if (!stockData[0].date) throw new Error('stockData date is empty!');
          if (!stockData[0].earningsDate) throw new Error('stockData earningsDate is empty');

          const sdDate = stockData[0].earningsDate && new Date(stockData[0].earningsDate);
          if (sdDate === null) throw new Error('sdDate is null');

          if (sdDate >= new Date(earning.daysBefore) && sdDate <= new Date(earning.daysAfter)) {
          // if (sdDate == new Date(earning.date)) {
            console.log('\t-y\n'
              // `\t -YEP!! stockDate = ${sdDate}\n\t\tearningDate = ${new Date(earning.date)}`
            );
            vibe.stock = stockData;
          } else {
            console.log('\t-n\n'
            //  `\t -NOPE stockDate = ${sdDate}\n\t\tearningDate = ${new Date(earning.date)}`
            );
          }
        });

        return vibe;
      });

      return returnData;
    } catch (e) {
      console.error(`Error : [VibeCheck] : ${e}`);
      throw e;
    }
  };
}
