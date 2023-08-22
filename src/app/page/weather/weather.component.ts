import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WeatherInfos } from 'src/app/core/interface/weatherInfos';
import { DayOfWeekPipe } from 'src/app/shared/pipes/dayOfWeek.pipe';
import { WeatherIconPipe } from 'src/app/shared/pipes/weatherIcon.pipe';

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
  weatherIcon: WeatherIconPipe = new WeatherIconPipe();

  constructor(
    private http: HttpClient
    ) {}

  ngOnInit() {
    this.getWeatherInfos();
  }

  getWeatherInfos() {
    this.http.get<WeatherInfos>(this.weatherApiUrl).subscribe((response: WeatherInfos) => {
      this.weatherInfo = response;
      const transformedTime = [];
      const transformedIcons = [];
  
      for (let index = 0; index < 4; index++) {
        transformedTime.push(this.dayOfWeekPipe.transform(response.daily.time[index]));
        transformedIcons.push(this.weatherIcon.transform(response.daily.weathercode[index]));   
      }
  
      this.weatherInfo.daily.time = transformedTime;
      this.weatherInfo.daily.icon = transformedIcons;
    });
  }
}