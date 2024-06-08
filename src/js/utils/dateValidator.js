import { isValid, parse, format, isBefore, isEqual } from 'date-fns';

class DateValidator {
  static validateDate(dateString, format = 'yyyy-MM-dd') {
    const parsedDate = parse(dateString, format, new Date());

    if (!isValid(parsedDate)) {
      return 'InvalidFormat';
    }

    const formattedDate = this.formattedDate(parsedDate);
    return formattedDate;
  }

  static formattedDate(date) {
    return format(date, 'eee d MMM');
  }

  static isDueDateValid(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Clear the time part to compare only the date
    return isEqual(date, today) || isBefore(today, date);
  }
}

export { DateValidator };
