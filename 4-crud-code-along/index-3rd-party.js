// Create a program that checks to see if the current year is leap year using the Moment module.
import moment from 'moment';

let isCurrentYearLeap = moment().format();

if (isCurrentYearLeap) {
  console.log('Current year is a leap year');
} else {
  console.log('Current year is not a leap year');
}