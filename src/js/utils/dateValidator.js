import { isValid, parse, format } from 'date-fns';

class DateValidator {
  static validateDate(dateString, format = 'yyyy-MM-dd') {
    const parsedDate = parse(dateString, format, new Date());
    if (isValid(parsedDate)) {
      const date = this.formatedDate(dateString);
      return date;
    } else {
      return 'UnValid';
    }
  }

  static formatedDate(dateString) {
    return format(dateString, 'eee d MMM');
  }
}

export { DateValidator };
