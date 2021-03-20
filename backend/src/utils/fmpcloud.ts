import dotenv from 'dotenv';
import got from 'got';
import { getRelativeDate } from '.';

dotenv.config();

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
  _formatDateString = (date: Date = new Date(Date.now())) => {
    const x = new Date(date);
    const year = x.getFullYear();
    const month = x.getMonth() + 1;
    const day = x.getDate();
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
      // Since the API expects limit N num of earnings, we use this rough formula of 4 earnings per year
      const l = numberOfPriorEarnings;
      const b = this.#baseURL;
      const a = this.#apiKey;
      const s = symbol.toUpperCase();
      const u = `${b}/historical/earning_calendar/${s}?limit=${l}&apikey=${a}`;
      const r = await got(u);
      const earnings = JSON.parse(r.body);
      // Add 'year' prop to each object
      // Changes prop `changePercent` to `percentChange`
      const finalEarnings = earnings.map((e: EarningsData) => {
        const d = new Date(e.date);
        const y = d.getFullYear();
        const b = getRelativeDate(BeforeOrAfter.before, 60, d);
        const a = getRelativeDate(BeforeOrAfter.after, 60, d);
        return { year: y, daysBefore: b, daysAfter: a, ...e };
      });
      return finalEarnings;
    } catch (e) {
      console.log('Error : HistoricalEarnings : ', e);
      throw e;
    }
  };

  /**
   * Get historical stock info
   * @param {string} symbol stock ticker symbol
   * @param {Date} startDate starting date range
   * @param {Date} endDate ending date range
   * @param {TimePeriod} timePeriod
   */
  HistoricalStock = async (
    symbol: string,
    startDate: Date = new Date(Date.now()),
    endDate: Date = new Date(Date.now()),
    timePeriod: TimePeriod = TimePeriod.OneHour
  ) => {
    try {
      const b = this.#baseURL;
      const a = this.#apiKey;
      const s = this._formatDateString(startDate);
      const e = this._formatDateString(endDate);
      console.log(timePeriod.toString());
      const url = `${b}/historical-chart/${timePeriod.toString()}/${symbol}?from=${s}&to=${e}&apikey=${a}`;
      const res = await got(url);
      const json = JSON.parse(res.body);

      return (
        json.historical &&
        json.historical.length &&
        json.historical.map((h: StockData) => {
          const c = {
            ...h,
            percentChange: h.changePercent, //  rename changePercent to percentChange
            date: new Date(h.date)
          };
          return { ...c }; // combine metadata with final object
        })
      );
    } catch (err) {
      console.log(`Error : [HistoricalStock] : ${err}`);
      throw err;
    }
  };
}