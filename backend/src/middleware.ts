import { Request, Response } from 'express';
import { TimePeriod } from './types';
import { NewHTTPError } from './errors';

/**
 * Validates time period. If invalid, we send a response with appropriate error.
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
 export function ValidateTimePeriod(
  req: Request,
  res: Response
): void {
  const { time_period = '1hour' } = req.query;
  const h = 404; // http status : TODO : prob needs to be changed to like 5xx ?
  if (!Object.keys(TimePeriod).includes(time_period.toString())) {
    const s = Object.keys(TimePeriod).join(', ');
    const m = `invalid time period :: got : '${time_period}' : expected one of : '${s}'`;
    const e = NewHTTPError(h, m);
    res.status(h).send(e);
  }
}

/**
 * We validate the request contains a "to" and "from" query param. If it does not, we
 * send a response with the appropriate error.
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.NextFunction} next
 * @returns {void}
 */
export function ValidateToAndFromQueryParams(
  req: Request,
  res: Response
): void {
  const { to, from } = req.query;
  if (!to || !from) {
    // Sort out which param is missing for our error message.
    let missingParam = '"from"';
    if (from && !to) {
      missingParam = '"to"';
    } 
    const err = NewHTTPError(404, `missing query param : ${missingParam}`);
    res.status(404).send(err);
  }
}
