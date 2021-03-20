import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import express, { Request, Response } from 'express';
import helmet from 'helmet';

import FMPCloud from './fmpcloud';

const fmpcloud = new FMPCloud();
const app = express();
const appPort = 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use('/static', express.static(path.join(__dirname, '../../build/static')));

app.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../../build/index.html'));
});

app.get(
  '/api/vibe_check/:symbol/:years_ago',
  async (req: Request, res: Response) => {
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
  }
);

app.get('*', (_req: Request, res: Response) => {
  res.status(404).send({ response: null, status: 404 });
});

app.listen(appPort, () => {
  console.log(`App listening at : http://localhost:${appPort}`);
});
