import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'weatherImage',
})
export class WeatherImagePipe implements PipeTransform {
  imagePath: string = environment.imagePath;

  transform(weathercode: number): string {
    if (!weathercode) {
      return `url(${this.imagePath}weather/sun.png)`;
    } else if (weathercode < 20) {
      return `url(${this.imagePath}weather/sun.png)`;
    } else if (weathercode > 20 && weathercode < 52) {
      return `url(${this.imagePath}weather/cloud.png)`;
    } else if (weathercode > 52 && weathercode < 70) {
      return `url(${this.imagePath}weather/rain.png)`;
    }
    return `url(${this.imagePath}weather/thunder.png)`;
  }
}
