const dotenv = require('dotenv');
const got = require('got');

dotenv.config();

module.exports = class FMPCloud {
  _baseURL = 'https://fmpcloud.io/api/v3';
  _apiKey = '';

  constructor(apikey = null) {
    this._apiKey = apikey !== null ? apikey : process.env.FMPCLOUD_API_KEY;
  }

  _formatDateString = (date = Date.now()) => {
    const x = new Date(date);
    const year = x.getFullYear();
    const month = x.getMonth();
    const day = x.getDate();
    return `${year}-${month}-${day}`;
  };

  CompanyProfile = async (symbol = '') => {
    try {
      const url = `${this._baseURL}/profile/${symbol.toUpperCase()}?apikey=${
        this._apiKey
      }`;
      const res = await got(url);
      return JSON.parse(res.body);
    } catch (err) {
      throw err.response.body;
    }
  };

  HistoricalEarnings = async (symbol = '', yearsAgo = 1) => {
    try {
      // Since the API expects limit N num of earnings, we use this rough formula of 4 earnings per year
      const limit = yearsAgo * 4;
      const url = `${
        this._baseURL
      }/historical/earning_calendar/${symbol.toUpperCase()}?limit=${limit}&apikey=${
        this._apiKey
      }`;
      const res = await got(url);
      return JSON.parse(res.body);
    } catch (err) {
      throw err.response.body;
    }
  };

  HistoricalStock = async (
    symbol,
    startDate = Date.now(),
    endDate = Date.now()
  ) => {
    try {
      const b = this._baseURL;
      const a = this._apiKey;
      const s = this._formatDateString(startDate);
      const e = this._formatDateString(endDate);

      const url = `${b}/historical-price-full/${symbol}?from=${s}&to=${e}&apikey=${a}`;

      const res = await got(url);
      return JSON.parse(res.body);
    } catch (err) {
      console.log(`Error : [fmpcloud.HistoricalStock] : ${err}`);
      throw err.response.body;
    }
  };
};
