import { Pipe, PipeTransform } from '@angular/core';
import { DayOfWeek } from '../../core/enums/day.enum copy';

@Pipe({
  name: 'dayOfWeek',
  standalone: true,
})
export class DayOfWeekPipe implements PipeTransform {
  transform(date: string): string {
    if (!date) {
      return 'Error';
    }
    const number: number = new Date(date).getDay();
    if (number === new Date().getDay()) {
      return DayOfWeek.TODAY;
    }
    switch (number) {
      case 1: {
        return DayOfWeek.MONDAY;
      }
      case 2: {
        return DayOfWeek.TUESDAY;
      }
      case 3: {
        return DayOfWeek.WEDNESDAY;
      }
      case 4: {
        return DayOfWeek.THURSDAY;
      }
      case 5: {
        return DayOfWeek.FRIDAY;
      }
      case 6: {
        return DayOfWeek.SATURDAY;
      }
      default: {
        return DayOfWeek.SUNDAY;
      }
    }
  }
}
