/// <reference path="../types/index.d.ts" />

import 'dotenv/config';
import path from 'path';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import { FMPCloud, NewHTTPError } from './utils';

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
 *   - * to = start date (in YYYY-MM-DD format)
 *   - * from = end date (in YYYY-MM-DD format)
 *   - time_period = length of time for each candle. must be one of: ("1min"|"5min"|"15min"|"30min"|"1hour"). defaults to "1hour".
 */
app.get('/api/:symbol/stock_data', async (req: Request, res: Response) => {
  try {
    const { to = '', from = '', time_period = '1hour' } = req.query;
    const { symbol } = req.params;

    // Validate to and from query params were provided
    if (!to || !from) {
      res.status(404).send(
        NewHTTPError(
          404,
          `missing query param : ${
            // If 'to' but not 'from' was given, put "from" in the error msg.
            // If 'from' but not 'to' was given, put "to" inthe error msg.
            // If neither were provided, put both in error msg.
            to && !from ? '"from"' : from && !to ? '"to"' : '"to" and "from"'
          }`
        )
      );
    }

    // Validate 'time_period' param is acceptable
    if (time_period in TimePeriod === false) {
      res.status(404).send(NewHTTPError(404, `time period '${time_period}' is not allowed`));
    }
    const tp = time_period as TimePeriod;
    const resp = await fmpcloud.HistoricalStock(symbol, new Date(from.toString()), new Date(to.toString()), tp);
    // TODO : finish this - Need to finish building out the fmpcloud class as well
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
