import { NewHTTPError } from '../utils/errors';
import { Response, Request } from 'express';

export { NewHTTPError } from './errors';
export { default as FMPCloud } from './fmpcloud';

/**
 * Let's say you have a date, July 2, 1992 for example, and you wanted to find
 * out what the date 3 days ago is, relative to July 2, 1992.
 *
 * Example using the above scenario:
 *   `getRelativeDate(BeforeOrAfter.before, 3, new Date("7/2/1992"));`
 *
 * @param {String} beforeOrAfter ("after"|"before")
 * @param {Number} numberOfDays number of days before or after the 'date' param
 * @param {Date} date the 'RelativeToDate' in 'getDateRelativeToDate'
 * @returns {Date || null}
 */
export function getRelativeDate(
  beforeOrAfter: BeforeOrAfter,
  numberOfDays: number,
  relativeDate: Date
) {
  // If the consumer did not supply a `relativeDate` param, use current Date
  if (!relativeDate) {
    relativeDate = new Date(Date.now());
  }
  // If numberOfDays param not supplied, defalt to 1
  if (!numberOfDays) {
    numberOfDays = 1;
  }

  const d = new Date(relativeDate);
  if (beforeOrAfter === BeforeOrAfter.after) {
    return new Date(d.setDate(d.getDate() + numberOfDays));
  }
  if (beforeOrAfter === BeforeOrAfter.before) {
    return new Date(d.setDate(d.getDate() - numberOfDays));
  }
  return null;
}

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
  console.log({ requestQuery: req.query })
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