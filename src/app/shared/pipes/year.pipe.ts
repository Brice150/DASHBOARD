import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'year',
  standalone: true,
})
export class YearPipe implements PipeTransform {
  transform(date: string): string {
    if (date === '0') {
      return 'Today';
    }
    return date + ' Year';
  }
}
