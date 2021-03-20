export function oneYearAgo() {
  return new Date(new Date().setFullYear(new Date().getFullYear() - 1));
};

export function now() {
  return new Date(Date.now());
};

/**
 * Let's say you have a date, July 2, 1992 for example, and you wanted to find
 * out what the date 3 days ago is, relative to July 2, 1992.
 *
 * Example using the above scenario:
 *   `const relativeDate = getDateRelativeToDate("before", 3, new Date("7/2/1992"));`
 *
 * @param {String} beforeOrAfter ("after"|"before")
 * @param {Number} numberOfDays number of days before or after the 'date' param
 * @param {Date} date the 'RelativeToDate' in 'getDateRelativeToDate'
 *
 * @return  * If "before" or "after" is not used as the value of the `beforeOrAfter`
 * param, we return `null`, otherwise we return a Date object
 */
export function getRelativeDate(beforeOrAfter: BeforeOrAfter, numberOfDays: number, relativeDate: Date) {
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
};

export function getDateAfterDate(date: Date, daysAfter: number) {
  const d = new Date(date);
  return new Date(d.setDate(d.getDate() + daysAfter));
};
