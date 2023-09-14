import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayOfWeek',
})
export class DayOfWeekPipe implements PipeTransform {
  transform(date: string): string {
    if (!date) {
      return 'Error';
    }
    const number: number = new Date(date).getDay();
    if (number === new Date().getDay()) {
      return 'Today';
    }
    switch (number) {
      case 1: {
        return 'Monday';
      }
      case 2: {
        return 'Tuesday';
      }
      case 3: {
        return 'Wednesday';
      }
      case 4: {
        return 'Thursday';
      }
      case 5: {
        return 'Friday';
      }
      case 6: {
        return 'Saturday';
      }
      default: {
        return 'Sunday';
      }
    }
  }
}
