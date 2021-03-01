const express = require('express');
const helmet = require('helmet');
const path = require('path');
const FMPCloud = require('./fmpcloud');

const fmpcloud = new FMPCloud();
const app = express();
const appPort = 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, '../build/static')));

app.get('/', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

app.get('/api/profile/:symbol', async (req, res) => {
  try {
    const data = await fmpcloud.CompanyProfile(req.params.symbol);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/api/earnings/:symbol/:yearsAgo', async (req, res) => {
  try {
    const { symbol, yearsAgo } = req.params;
    if (!yearsAgo) {
      yearsAgo = 1;
    }
    const data = await fmpcloud.HistoricalEarnings(symbol, yearsAgo);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('*', (_req, res) => {
  res.status(404).send({ response: null, status: 404 });
});

app.listen(appPort, () => {
  console.log(`App listening on port : ${appPort}`);
});
