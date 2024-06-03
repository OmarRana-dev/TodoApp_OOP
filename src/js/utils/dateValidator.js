import { isValid, parse } from 'date-fns';

class DateValidator {
  static validateDate(dateString, format = 'MM-dd-yyyy') {
    const parsedDate = parse(dateString, format, new Date());
    console.log(parsedDate);
    console.log(isValid(parsedDate));
    return isValid(parsedDate);
  }
}

console.log(DateValidator.validateDate(''));

export { DateValidator };
