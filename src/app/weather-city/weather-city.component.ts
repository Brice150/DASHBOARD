import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { User } from '../core/interfaces/user';
import { Hourly } from '../core/interfaces/weatherInfos';
import { HeaderComponent } from '../header/header.component';
import { DayOfWeekPipe } from '../shared/pipes/dayOfWeek.pipe';
import { WeatherImagePipe } from '../shared/pipes/weatherImage.pipe';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-weather-city',
  standalone: true,
  imports: [CommonModule, DayOfWeekPipe, WeatherImagePipe, HeaderComponent],
  templateUrl: './weather-city.component.html',
  styleUrl: './weather-city.component.css',
})
export class WeatherCityComponent implements OnInit {
  user: User = {} as User;
  index: number = 0;
  dayWeatherInfo: Hourly = {} as Hourly;
  dayOfWeekPipe: DayOfWeekPipe = new DayOfWeekPipe();
  datePipe: DatePipe = new DatePipe('en-FR');

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.user = this.userService.getUser();
      this.index = params['index'];
      this.getDayWeatherInfo();
      this.displayGraph();
    });
  }

  getDayWeatherInfo(): void {
    this.dayWeatherInfo.time = [];
    this.dayWeatherInfo.precipitation = [];
    this.dayWeatherInfo.temperature_2m = [];
    this.dayWeatherInfo.windspeed_10m = [];
    for (
      let index = 0;
      index <
      this.user.weatherInfos.localWeathers[this.index].hourly.time.length;
      index++
    ) {
      if (
        this.dayOfWeekPipe.transform(
          this.user.weatherInfos.localWeathers[this.index].hourly.time[index]
        ) ===
        this.dayOfWeekPipe.transform(
          this.user.weatherInfos.localWeathers[this.index].daily.time[
            this.index
          ]
        )
      ) {
        const hour: string =
          this.datePipe.transform(
            new Date(
              this.user.weatherInfos.localWeathers[this.index].hourly.time[
                index
              ]
            ),
            'HH'
          ) + 'h';
        this.dayWeatherInfo.time.push(hour);
        this.dayWeatherInfo.precipitation.push(
          this.user.weatherInfos.localWeathers[this.index].hourly.precipitation[
            index
          ]
        );
        this.dayWeatherInfo.temperature_2m.push(
          this.user.weatherInfos.localWeathers[this.index].hourly
            .temperature_2m[index]
        );
        this.dayWeatherInfo.windspeed_10m.push(
          this.user.weatherInfos.localWeathers[this.index].hourly.windspeed_10m[
            index
          ]
        );
      }
    }
  }

  displayGraph(): void {
    const graph = document.getElementById(
      'weatherGraph'
    ) as HTMLCanvasElement | null;
    if (graph) {
      const weatherGraph = new Chart(graph, {
        type: 'line',
        data: {
          labels: this.dayWeatherInfo.time,
          datasets: [
            {
              label: 'Precipitation',
              data: this.dayWeatherInfo.precipitation,
            },
            {
              label: 'Temperature',
              data: this.dayWeatherInfo.temperature_2m,
            },
            {
              label: 'Windspeed',
              data: this.dayWeatherInfo.windspeed_10m,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                font: {
                  size: 16,
                },
              },
            },
          },
          color: '#006aff',
        },
      });
    }
  }
}
