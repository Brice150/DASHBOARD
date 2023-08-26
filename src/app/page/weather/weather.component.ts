import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WeatherInfos } from 'src/app/core/interface/weatherInfos';
import { CityDialogComponent } from 'src/app/shared/components/dialogs/city/city-dialog.component';
import { WeatherDialogComponent } from 'src/app/shared/components/dialogs/weather/weather-dialog.component';
import { DayOfWeekPipe } from 'src/app/shared/pipes/dayOfWeek.pipe';
import { WeatherImagePipe } from 'src/app/shared/pipes/weatherImage.pipe';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherApiUrl: string = "https://api.open-meteo.com/v1/meteofrance" +
  "?latitude=48.112&longitude=-1.6743" +
  "&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&current_weather=true&timezone=auto";
  weatherInfo!: WeatherInfos;
  dayOfWeekPipe: DayOfWeekPipe = new DayOfWeekPipe();
  weatherImagePipe: WeatherImagePipe = new WeatherImagePipe();

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
    ) {}

  ngOnInit() {
    this.getWeatherInfos();
  }

  getWeatherInfos() {
    this.http.get<WeatherInfos>(this.weatherApiUrl).subscribe((response: WeatherInfos) => {
      this.weatherInfo = response;
      const transformedTime: string[] = [];
      const transformedImage: string[] = [];
  
      for (let index = 0; index < 4; index++) {
        transformedTime.push(this.dayOfWeekPipe.transform(response.daily.time[index]));
        transformedImage.push(this.weatherImagePipe.transform(response.daily.weathercode[index]));
      }
  
      this.weatherInfo.daily.time = transformedTime;
      this.weatherInfo.daily.image = transformedImage;
    });
  }

  openWeatherDialog(index: number) {
    const dialogData = {
      weatherInfo: this.weatherInfo,
      index: index
    };

    this.dialog.open(WeatherDialogComponent, {
      data: dialogData
    });
  }

  openCityDialog() {
    const dialogRef = this.dialog.open(CityDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.changeCity();
      }
    });
  }

  changeCity() {
    //TODO
  }
}
