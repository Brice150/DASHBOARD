import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WeatherInfos } from 'src/app/core/interface/weatherInfos';

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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getWeatherInfos();
  }

  getWeatherInfos() {
    this.http.get<WeatherInfos>(this.weatherApiUrl).subscribe((response: WeatherInfos) => {
      this.weatherInfo = response;
      for (let index = 0; index < 4; index++) {
        console.log(new Date(response.daily.time[index]).getDay());        
      }
    });
  }
}
