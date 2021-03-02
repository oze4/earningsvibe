const express = require('express');
const helmet = require('helmet');
const path = require('path');
const FMPCloud = require('./fmpcloud');

const fmpcloud = new FMPCloud();
const app = express();
const appPort = 8081;

const getDatePriorToDate = (date, daysPrior = 1) => {
  const d = new Date(date);
  return new Date(d.setDate(d.getDate() - daysPrior));
}

const getDateAfterDate = (date, daysAfter) => {
  const d = new Date(date);
  return new Date(d.setDate(d.getDate() + daysAfter));
}

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
 *   - yearsAgo=Number
 */
app.get('/api/earnings/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const { yearsAgo } = req.query;
    const _yearsAgo = yearsAgo ? yearsAgo : 1;
    const earnings = await fmpcloud.HistoricalEarnings(symbol, _yearsAgo);
    // Add 'year' prop to each object
    const earningsData = earnings.map((report) => {
      const reportDate = new Date(report.date);
      const year = reportDate.getFullYear();
      const daysBefore = getDatePriorToDate(reportDate, 2);
      const daysAfter = getDateAfterDate(reportDate, 2);
      return { year, daysBefore, daysAfter, ...report };
    });
    res.status(200).send(earningsData);
  } catch (err) {
    console.log(err);
    res.status(500).send(null);
  }
});

app.get('*', (_req, res) => {
  res.status(404).send({ response: null, status: 404 });
});

app.listen(appPort, () => {
  console.log(`App listening on port : ${appPort}`);
});
