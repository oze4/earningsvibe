const dotenv = require('dotenv');
const got = require('got');

dotenv.config();

module.exports = class FMPCloud {
  _baseURL = 'https://fmpcloud.io/api/v3';
  _apiKey = '';

  constructor(apikey = null) {
    this._apiKey = apikey !== null ? apikey : process.env.FMPCLOUD_API_KEY;
  }

  CompanyProfile = async (symbol) => {
    try {
      const url = `${this._baseURL}/profile/${symbol}?apikey=${this._apiKey}`;
      const res = await got(url);
      return JSON.parse(res.body);
    } catch (err) {
      throw err.response.body;
    }
  };

  HistoricalEarnings = async (symbol, yearsAgo = 1) => {
    try {
      // Since the API expects limit N num of earnings,
      // we use this rough formula of 4 earnings per year
      const limit = yearsAgo * 4;
      const url = `${this._baseURL}/historical/earning_calendar/${symbol}?limit=${limit}&apikey=${this._apiKey}`;
      const res = await got(url);
      return JSON.parse(res.body);
    } catch (err) {
      throw err.response.body;
    }
  };
};
