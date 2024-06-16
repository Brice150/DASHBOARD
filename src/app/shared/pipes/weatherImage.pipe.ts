import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'weatherImage',
  standalone: true,
})
export class WeatherImagePipe implements PipeTransform {
  imagePath: string = environment.imagePath;

  transform(weathercode: number): string {
    if (!weathercode) {
      return `url(${this.imagePath}weather/sun.png)`;
    } else if (weathercode < 20) {
      return `url(${this.imagePath}weather/sun.png)`;
    } else if (weathercode > 40 && weathercode < 60) {
      return `url(${this.imagePath}weather/cloud.png)`;
    } else if (weathercode > 60 && weathercode < 80) {
      return `url(${this.imagePath}weather/rain.png)`;
    }
    return `url(${this.imagePath}weather/thunder.png)`;
  }
}
