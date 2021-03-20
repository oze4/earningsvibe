"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateAfterDate = exports.getRelativeDate = exports.now = exports.oneYearAgo = void 0;
function oneYearAgo() {
    return new Date(new Date().setFullYear(new Date().getFullYear() - 1));
}
exports.oneYearAgo = oneYearAgo;
;
function now() {
    return new Date(Date.now());
}
exports.now = now;
;
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
function getRelativeDate(beforeOrAfter, numberOfDays, relativeDate) {
    // If the consumer did not supply a `relativeDate` param, use current Date
    if (!relativeDate) {
        relativeDate = new Date(Date.now());
    }
    // If numberOfDays param not supplied, defalt to 1
    if (!numberOfDays) {
        numberOfDays = 1;
    }
    var d = new Date(relativeDate);
    if (beforeOrAfter === BeforeOrAfter.after) {
        return new Date(d.setDate(d.getDate() + numberOfDays));
    }
    if (beforeOrAfter === BeforeOrAfter.before) {
        return new Date(d.setDate(d.getDate() - numberOfDays));
    }
    return null;
}
exports.getRelativeDate = getRelativeDate;
;
function getDateAfterDate(date, daysAfter) {
    var d = new Date(date);
    return new Date(d.setDate(d.getDate() + daysAfter));
}
exports.getDateAfterDate = getDateAfterDate;
;
