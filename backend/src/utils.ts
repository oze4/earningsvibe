import { Response, Request } from 'express';
import { NewHTTPError } from './errors';
import { BeforeOrAfter, TimePeriod } from './types';

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
 * @returns {Date}
 */
export function getRelativeDate(
  beforeOrAfter: BeforeOrAfter,
  numberOfDays: number,
  relativeDate: Date
) {
  // If the consumer did not supply a `relativeDate` param, use current Date
  if (!relativeDate) {
    throw new Error('[getRelativeDate] : relativeDate not provided')
  }
  // If numberOfDays param not supplied, defalt to 1
  if (!numberOfDays) {
    numberOfDays = 1;
  }

  const d = new Date(relativeDate);
  const dd = new Date(relativeDate)
  if (beforeOrAfter === BeforeOrAfter.after) {
    const a = new Date(d.setDate(d.getDate() + numberOfDays));
    console.log(`[getRelativeDate] : original date (${new Date(dd)}) + ${numberOfDays} = afterDate : ${a}`)
    return a;
  } else if (beforeOrAfter === BeforeOrAfter.before) {
    const b = new Date(d.setDate(d.getDate() - numberOfDays));
    console.log(`[getRelativeDate] : original date (${new Date(dd)}) + ${numberOfDays} = beforeDate : ${b}`);
    return b;
  }
  throw new Error('beforeOrAfter not equal to "before" or "after"');
}
