const express = require('express');
const helmet = require('helmet');
const path = require('path');
const FMPCloud = require('./fmpcloud');
const { getRelativeDate } = require('../src/utils');

const fmpcloud = new FMPCloud();
const app = express();
const appPort = 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use('/static', express.static(path.join(__dirname, '../build/static')));

app.get('/', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

app.get('/api/profile/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const data = await fmpcloud.CompanyProfile(symbol);
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(null);
  }
});

/**
 * Query params:
 *   - yearsAgo=Number (ex: /api/earnings/aapl?yearsAgo=5)
 */
app.get('/api/earnings/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const { yearsAgo } = req.query;
    const years = yearsAgo ? yearsAgo : 1;
    const earnings = await fmpcloud.HistoricalEarnings(symbol, years);
    res.status(200).send(earnings);
  } catch (err) {
    console.log(err);
    res.status(500).send(null);
  }
});

/**
 * Get stock price history for a time range.
 *
 * ex: /api/history/aapl
 *      ?from=2020-01-01
 *      &to=2021-01-01
 *      &chart_type=1min
 *
 * Query Info:
 *  - from : formatting matters! YYY-MM-DD
 *  - to : formatting matters! YYY-MM-DD
 *  - chart_type : must be one of the following; 1min|5min|15min|30min|1hour
 */
app.get('/api/history/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const { from, to } = req.query;
    const dateFrom = fmpcloud._formatDateString(new Date(from));
    const dateTo = fmpcloud._formatDateString(new Date(to));
    const data = await fmpcloud.HistoricalStock(symbol, dateFrom, dateTo);
    console.log(data);
    res.status(200).send(data);
  } catch (err) {
    console.log('error [/api/history/:symbol', err);
    res.status(500).send(null);
  }
});

app.get('/api/vibe_check/:symbol/:years_ago', async (req, res) => {
  try {
    const { symbol, years_ago } = req.params;
    const data = await fmpcloud.VibeCheck(symbol, years_ago);
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send(null);
  }
});

app.get('*', (_req, res) => {
  res.status(404).send({ response: null, status: 404 });
});

app.listen(appPort, () => {
  console.log(`App listening on port : ${appPort}`);
});
