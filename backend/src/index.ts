import 'dotenv/config';
// import path from 'path';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { ValidateTimePeriod, ValidateToAndFromQueryParams } from './middleware';
import { TimePeriod } from './types';
import FMPCloud from './fmpcloud';
import { NewHTTPError } from './errors';

import { Stock } from './types';
import { send } from 'process';

if (!process.env.FMPCLOUD_API_KEY) {
  throw new Error('Missing FMPCLOUD_API_KEY env var!');
}

const fmpcloud = new FMPCloud(process.env.FMPCLOUD_API_KEY);
const app = express();
const APP_PORT = Number(process.env.PORT || 8082);
const APP_IP = '0.0.0.0';

app.use(express.json());
app.use(
  cors({
    origin: '*'
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(helmet());

/**
 * Route Example:
 * /api/stock_data/tsla?from=2021-01-01-31&to=2021-02-15&time_period=15min
 */
app.get(
  '/api/stock_data/:symbol',
  [ValidateTimePeriod, ValidateToAndFromQueryParams],
  (req: Request, res: Response) => {
    const { symbol } = req.params;
    const { to = '', from = '', time_period = '1hour' } = req.query;
    const tp = (time_period as unknown) as TimePeriod;
    const fromDate = new Date(from.toString());
    const toDate = new Date(to.toString());

    const sortDatesOldToNew = (d: Stock[]) => {
      return d.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    };

    fmpcloud
      .HistoricalStock(symbol, fromDate, toDate, tp)
      .then((data) => res.status(200).send(sortDatesOldToNew(data)))
      .catch((error) => res.status(500).send(error));
  }
);

app.get('/api/test', async (req: Request, res: Response) => {
  try {
    const tickers = ['TSLA', 'MSFT', 'AAPL', 'ROKU'];
    const promises: Promise<Stock[]>[] = [];
    tickers.forEach((ticker) => {
      promises.push(
        fmpcloud.HistoricalStock(
          ticker,
          new Date('3/20/2019'),
          new Date('3/25/2019'),
          TimePeriod['1min']
        )
      );
    });
    const results = await Promise.all(promises);
    res.status(200).send(results);
  } catch (e) {
    console.log(`Error : [/test] : ${e}`);
    res.status(500).send({ status: 500, error: e });
  }
});

/**
 * Route Example:
 * /api/earnings_data/tsla?count=10
 *
 * The example above will get 10 prior earnings reports.
 *
 * Notes:
 *  - If no count query param is proided, we default to 4 prior earnings (typically ~1 years worth)
 */
app.get('/api/earnings_data/:symbol', async (req: Request, res: Response) => {
  try {
    const { symbol } = req.params;
    const { count = 4 } = req.query;
    const data = await fmpcloud.HistoricalEarnings(
      symbol.toUpperCase(),
      Number(count)
    );
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send(`${e}`);
  }
});

/**
 * Route Example:
 * /api/vibe_check?symbol=tsla&count=10
 *
 * The example above will vibe check the previous 10 earnings
 *
 * Notes:
 *  - If no count query param is proided, we default to 4 prior earnings (typically ~1 years worth)
 */
app.get('/api/vibe_check', async (req, res) => {
  try {
    console.log(
      `Server TZ offset : ${new Date(Date.now()).getTimezoneOffset()}`
    );
    const { symbol = '', count = 4 } = req.query;
    const data = await fmpcloud.VibeCheck(symbol.toString(), Number(count));
    res.status(200).send(data);
  } catch (error) {
    console.log(`/api/vibe_check : Error : ${error}`);
    res.status(500).send(error);
  }
});

app.get('/api/server_tz', (_req: Request, res: Response) => {
  const serverTzOffset = new Date(Date.now()).getTimezoneOffset();
  const html = `
  <table>
    <tr>
      <th>Server TZ Offset</th>
    </tr>
    <tr>
      <td>${serverTzOffset || 'null'}</td>
    </tr>
  </table>
  `;
  console.log(html); 
  res.status(200).send(html);
});

app.get('*', (_req: Request, res: Response) => {
  res.status(404).send({ response: null, status: 404 });
});

const server = app.listen(APP_PORT, APP_IP, () => {
  console.log(`app listening at :`, { server: server.address() });
});
