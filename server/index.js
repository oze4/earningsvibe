const express = require('express');
const helmet = require('helmet');
const path = require('path');
const FMPCloud = require('./fmpcloud');

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

app.get('/profile/:symbol', async (req, res) => {
  try {
    const fmpcloud = new FMPCloud();
    const data = await fmpcloud.CompanyProfile(req.params.symbol);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get('/earnings/:symbol', async (req, res) => {});

app.get('*', (_req, res) => {
  res.status(404).send({ response: null, status: 404 });
});

app.listen(appPort, () => {
  console.log(`App listening on port : ${appPort}`);
});
