/// <reference path="../types/index.d.ts" />

import 'dotenv/config';
import path from 'path';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import FMPCloud from './utils/fmpcloud';

if (!process.env.FMPCLOUD_API_KEY) {
  throw new Error('Missing FMPCLOUD_API_KEY env var!');
}

const fmpcloud = new FMPCloud(process.env.FMPCLOUD_API_KEY);
const app = express();
const appPort = process.env.PORT || 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

const frontendRootDirectory = path.resolve(__dirname, '../../build/frontend');
const staticDirectory = path.join(frontendRootDirectory, '/static'); // path.join(__dirname, path.resolve(frontendRootDirectory, '/static'));
const staticPathOnDisk = express.static(staticDirectory);

app.use('/static', staticPathOnDisk);

app.get('/', (_req: Request, res: Response) => {
  const html = path.resolve(__dirname, `${frontendRootDirectory}/index.html`);
  res.sendFile(html);
});

/**
 * Query Params: (* means required)
 *   - * symbol = ticker symbol
 *   - * to = start date (in YYYY-MM-DD format)
 *   - * from = end date (in YYYY-MM-DD format)
 *   - timePeriod = length of time for each candle. must be one of: ("1min"|"5min"|"15min"|"30min"|"1hour"). defaults to "1hour".
 */
app.get('/api/stock_data', async (req: Request, res: Response) => {
  try {
    const { symbol, years_ago } = req.params;
    // const data = await fmpcloud.VibeCheck(String(symbol).toUpperCase(), years_ago);
    // if (!symbol || !years_ago) {
    //   res.status(404).send({ status: 400, response: 'Incorrect parameters' })
    // }
    const data = await fmpcloud.HistoricalEarnings(symbol, Number(years_ago));
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send(null);
  }
});

app.get('*', (_req: Request, res: Response) => {
  res.status(404).send({ response: null, status: 404 });
});

app.listen(appPort, () => {
  console.log(`App listening at : http://localhost:${appPort}`);
});
