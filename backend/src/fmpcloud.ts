import got from 'got';
import {
  Earnings,
  BeforeOrAfter,
  Stock,
  TimePeriod,
  EarningsVibe
} from './types';
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
  _formatDateString = (date = new Date(Date.now())) => {
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
   * Returns info about a symbol
   * @param {string} symbol ticker symbol
   */
  CompanyProfile = async (symbol = '') => {
    try {
      const a = this.#apiKey;
      const b = this.#baseURL;
      const s = symbol.toUpperCase();
      const u = `${b}/profile/${s}?apikey=${a}`;
      const r = await got(u);
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
      // NOTE : we have to double the earnings count because fmpcloud.io will return
      // the "next" earnings date(s), even though there will be no data.... Sometimes they
      // return one null date, sometimes two... We just double, then slice at the end.
      const l = numberOfPriorEarnings * 2;
      const b = this.#baseURL;
      const a = this.#apiKey;
      const s = symbol.toUpperCase();
      const u = `${b}/historical/earning_calendar/${s}?limit=${l}&apikey=${a}`;
      const r = await got(u);
      const earnings: Earnings[] = JSON.parse(r.body);
      return earnings
        .filter(
          (e: Earnings) =>
            e.eps !== null && new Date(e.date) < new Date(Date.now())
        )
        .map((e) => {
          const d = new Date(e.date);
          const daysBefore = getRelativeDate(BeforeOrAfter.before, 2, d);
          const daysAfter = getRelativeDate(BeforeOrAfter.after, 2, d);
          return { ...e, daysAfter, daysBefore };
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
      if (timePeriod in TimePeriod === false) {
        throw new Error('Invalid time period');
      }
      const b = this.#baseURL;
      const a = this.#apiKey;
      const t = timePeriod.toString();
      const s = this._formatDateString(startDate);
      const e = this._formatDateString(endDate);
      const url = `${b}/historical-chart/${t}/${symbol.toUpperCase()}?from=${s}&to=${e}&apikey=${a}`;
      const res = await got(url);
      return JSON.parse(res.body);
    } catch (err) {
      console.log(`Error : [HistoricalStock] : ${err}`);
      throw err;
    }
  };

  VibeCheck = async (symbol: string, count = 4): Promise<any> => {
    try {
      const earnings = await this.HistoricalEarnings(symbol, count);
      const stockDataRequests = earnings.map((e) => {
        return this.HistoricalStock(
          e.symbol,
          e.daysBefore,
          e.daysAfter,
          TimePeriod['1min']
        );
      });
      const stockDatas = await Promise.all(stockDataRequests);
      const vibes = earnings.map((earning) => {
        let vibe = { earning, stock: [] as Stock[] };
        stockDatas.forEach((stockData) => {
          const sdDate = new Date(stockData[0].date);
          if (sdDate >= earning.daysBefore && sdDate <= earning.daysAfter) {
            vibe.stock = stockData;
          }
        });
        return vibe;
      });
      return vibes;
    } catch (e) {
      console.error(`Error : [VibeCheck] : ${e}`);
      throw e;
    }
  };
}
