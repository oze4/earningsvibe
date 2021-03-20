import dotenv from 'dotenv';
dotenv.config();

import got from 'got';
import { getRelativeDate } from '../utils';

export default class FMPCloud {
  _baseURL = 'https://fmpcloud.io/api/v3';
  _apiKey = '';

  constructor(apikey = '') {
    if (apikey !== '') {
      this._apiKey = apikey;
    } else {
      if (process.env.FMPCLOUD_API_KEY) {
        this._apiKey = process.env.FMPCLOUD_API_KEY;
      }
    }
  }

  _formatDateString = (date = Date.now()) => {
    const x = new Date(date);
    const year = x.getFullYear();
    const month = x.getMonth() + 1;
    const day = x.getDate();
    return `${year}-${month}-${day}`;
  };

  CompanyProfile = async (symbol = '') => {
    try {
      const a = this._apiKey;
      const b = this._baseURL;
      const s = symbol.toUpperCase();
      const u = `${b}/profile/${s}?apikey=${a}`;
      const r = await got(u);
      return JSON.parse(r.body);
    } catch (e) {
      console.log('Error : CompanyProfile : ', e);
      throw e;
    }
  };

  HistoricalEarnings = async (symbol: string, numberOfPriorEarnings: number) => {
    try {
      // Since the API expects limit N num of earnings, we use this rough formula of 4 earnings per year
      const l = numberOfPriorEarnings;
      const b = this._baseURL;
      const a = this._apiKey;
      const s = symbol.toUpperCase();
      const u = `${b}/historical/earning_calendar/${s}?limit=${l}&apikey=${a}`;
      const r = await got(u);
      const earnings = JSON.parse(r.body);
      // Add 'year' prop to each object
      // Changes prop `changePercent` to `percentChange`
      const finalEarnings = earnings.map((e) => {
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
   * @param {String} symbol stock ticker symbol
   * @param {Date} startDate starting date range
   * @param {Date} endDate ending date range
   * @param {String} timePeriod must be one of: ("1min"|"5min"|"15min"|"30min"|"1hour"|"1day")
   */
  HistoricalStock = async (
    symbol,
    startDate = Date.now(),
    endDate = Date.now(),
    metadata = {},
    timePeriod = '1day' // must be one of: ("1min"|"5min"|"15min"|"30min"|"1hour"|"1day")
  ) => {
    // Param validation
    const allowedTimePeriods = [
      '1day',
      '1min',
      '5min',
      '15min',
      '30min',
      '1hour'
    ];
    if (!allowedTimePeriods.includes(timePeriod)) {
      const m = `timePeriod not allowed!\n\tgot '${JSON.stringify(
        timePeriod
      )}'\n\texpected one of : '${allowedTimePeriods}'`;
      throw new Error(m);
    }

    // This check is important. If you want a 1day chart, you leave the param
    // empty (that's just how fmpcloud takes it)...
    if (timePeriod === '1day') {
      timePeriod = '';
    }

    try {
      const b = this._baseURL;
      const a = this._apiKey;
      const s = this._formatDateString(startDate);
      const e = this._formatDateString(endDate);

      const url = `${b}/historical-price-full/${symbol}?from=${s}&to=${e}&apikey=${a}`;
      const res = await got(url);
      const json = JSON.parse(res.body);

      return (
        json.historical &&
        json.historical.length &&
        json.historical.map((h) => {
          const c = {
            ...h,
            percentChange: h.changePercent, //  rename changePercent to percentChange
            date: new Date(h.date)
          };
          delete c.changePercent; // remove changePercent prop
          return { ...c, ...metadata }; // combine metadata with final object
        })
      );
    } catch (err) {
      console.log(`Error : [HistoricalStock] : ${err}`);
      throw err;
    }
  };

  VibeCheck = async (symbol = '', yearsAgo = 1) => {
    try {
      const earnings = await this.HistoricalEarnings(symbol, yearsAgo);
      console.log('got earnings', { earnings });

      // We need to get stock data for the 'buffer' range (a couple of days before and after earnings).
      // That is why we map thru earnings to get stock data.
      const stockdataRequests = earnings.map((e) => {
        return this.HistoricalStock(
          symbol,
          e.daysBefore,
          e.daysAfter,
          {},
          '1min',
          {
            earningsDate: e.date
          }
        );
      });

      const stockdataRaw = await Promise.all(stockdataRequests);
      console.log('got stockdataRaw');

      return earnings.map((e) => {
        let stockdata = 'Stock data not found';

        stockdataRaw.forEach((sdr) => {
          // Since we get a couple days before and after earnings (so an array of stock data) it doesn't
          // matter which element in the array we check the earningsDate prop on, since each element will
          // have the same earningsDate prop. We add the earningsDate prop to the object received from
          // fmpcloud.io.
          if (sdr.length > 0 && sdr[0].earningsDate === e.date) {
            stockdata = sdr;
          }
        });

        return { ...e, stockData: stockdata };
      });
    } catch (e) {
      console.log(`Error : [VibeCheck] : ${e}`);
    }
  };
};