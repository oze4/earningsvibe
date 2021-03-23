/// <reference path="../types/index.d.ts" />

import 'dotenv/config';
import path from 'path';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import { FMPCloud, NewHTTPError } from './utils';
import {
  ValidateTimePeriod,
  ValidateToAndFromQueryParams
} from './middlewares';

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
const staticDirectory = path.join(frontendRootDirectory, '/static');
const staticPathOnDisk = express.static(staticDirectory);

app.use('/static', staticPathOnDisk);

app.get('/', (_req: Request, res: Response) => {
  const html = path.resolve(__dirname, `${frontendRootDirectory}/index.html`);
  res.sendFile(html);
});

/**
 * Query Params: (* means required)
 *   - * to = start date (in YYYY-MM-DD format)
 *   - * from = end date (in YYYY-MM-DD format)
 *   - time_period = length of time for each candle. must be one of: ("1min"|"5min"|"15min"|"30min"|"1hour"). defaults to "1hour".
 */
app.get(
  '/api/:symbol/stock_data',
  [ValidateTimePeriod, ValidateToAndFromQueryParams],
  async (req: Request, res: Response) => {
    try {
      const { symbol } = req.params;
      const { to = '', from = '', time_period = '1hour' } = req.query;

      const tp = time_period as TimePeriod;
      const fromDate = new Date(from.toString());
      const toDate = new Date(to.toString());
      
      console.log({ tp });

      //* Get data from fmpcloud.io
      const resp = await fmpcloud.HistoricalStock(symbol, fromDate, toDate, tp);

      // TODO : finish this - Need to finish building out the fmpcloud class as well
    } catch (e) {
      console.log(e);
      res.status(500).send(NewHTTPError(500, e));
    }
  }
);

app.get('*', (_req: Request, res: Response) => {
  res.status(404).send({ response: null, status: 404 });
});

app.listen(appPort, () => {
  console.log(`App listening at : http://localhost:${appPort}`);
});
