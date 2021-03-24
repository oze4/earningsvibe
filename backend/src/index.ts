/// <reference path="../types/index.d.ts" />

import 'dotenv/config';
import path from 'path';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import { FMPCloud, NewHTTPError, ValidateTimePeriod, ValidateToAndFromQueryParams } from './utils';

if (!process.env.FMPCLOUD_API_KEY) {
  throw new Error('Missing FMPCLOUD_API_KEY env var!');
}

const fmpcloud = new FMPCloud(process.env.FMPCLOUD_API_KEY);
const app = express();
const appPort = process.env.PORT || 8081;
const feBuildPath = path.resolve(__dirname, '../../build/frontend');
const feStaticAssets = path.join(feBuildPath, '/static');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

// Path for frontend static assets
app.use('/static', express.static(feStaticAssets));

app.get('/', (_req: Request, res: Response) => {
  const html = path.resolve(__dirname, `${feBuildPath}/index.html`);
  res.sendFile(html);
});

/**
 * Query Params:
 *   + to : [required]
 *       start date (in YYYY-MM-DD format)
 *   + from : [required]
 *       end date (in YYYY-MM-DD format)
 *   + time_period : [defaults to '1hour']
 *       length of time for each candle. must be one of: ("1min"|"5min"|"15min"|"30min"|"1hour"). defaults to "1hour".
 *
 * Example:
 * /api/stock_data/tsla?from=2021-01-01-31&to=2021-02-15&time_period=15min
 */
app.get('/api/stock_data/:symbol', async (req: Request, res: Response) => {
  ValidateTimePeriod(req, res);
  ValidateToAndFromQueryParams(req, res);
  try {
    const { symbol } = req.params;
    const { to = '', from = '', time_period = '1hour' } = req.query;
    const tp = time_period as TimePeriod;
    const fromDate = new Date(from.toString());
    const toDate = new Date(to.toString());
    console.log({ tp });
    const data = await fmpcloud.HistoricalStock(symbol, fromDate, toDate, tp);
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send(NewHTTPError(500, e));
  }
});

app.get('*', (_req: Request, res: Response) => {
  res.status(404).send({ response: null, status: 404 });
});

app.listen(appPort, () => {
  console.log(`App listening at : http://localhost:${appPort}`);
});
