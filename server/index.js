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
app.use('/static', express.static(path.join(__dirname, '../build/static')));

app.get('/', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
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
