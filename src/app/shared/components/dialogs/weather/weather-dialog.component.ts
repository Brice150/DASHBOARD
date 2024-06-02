import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Chart } from 'chart.js/auto';
import { DayOfWeekPipe } from '../../../pipes/dayOfWeek.pipe';
import { Hourly, WeatherInfos } from '../../../../core/interfaces/weatherInfos';

@Component({
  selector: 'app-weather-dialog',
  standalone: true,
  imports: [CommonModule, DayOfWeekPipe],
  templateUrl: './weather-dialog.component.html',
  styleUrls: ['./weather-dialog.component.css'],
})
export class WeatherDialogComponent implements OnInit {
  weatherInfo!: WeatherInfos;
  index!: number;
  dayWeatherInfo: Hourly = {} as Hourly;
  dayOfWeekPipe: DayOfWeekPipe = new DayOfWeekPipe();
  datePipe: DatePipe = new DatePipe('en-FR');

  constructor(
    public dialogRef: MatDialogRef<WeatherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.weatherInfo = this.data.weatherInfo;
    this.index = this.data.index;
    this.getDayWeatherInfo();
    this.displayGraph();
  }

  getDayWeatherInfo() {
    this.dayWeatherInfo.time = [];
    this.dayWeatherInfo.precipitation = [];
    this.dayWeatherInfo.temperature_2m = [];
    this.dayWeatherInfo.windspeed_10m = [];
    for (let index = 0; index < this.weatherInfo.hourly.time.length; index++) {
      if (
        this.dayOfWeekPipe.transform(this.weatherInfo.hourly.time[index]) ===
        this.dayOfWeekPipe.transform(this.weatherInfo.daily.time[this.index])
      ) {
        const hour: string =
          this.datePipe.transform(
            new Date(this.weatherInfo.hourly.time[index]),
            'HH'
          ) + 'h';
        this.dayWeatherInfo.time.push(hour);
        this.dayWeatherInfo.precipitation.push(
          this.weatherInfo.hourly.precipitation[index]
        );
        this.dayWeatherInfo.temperature_2m.push(
          this.weatherInfo.hourly.temperature_2m[index]
        );
        this.dayWeatherInfo.windspeed_10m.push(
          this.weatherInfo.hourly.windspeed_10m[index]
        );
      }
    }
  }

  displayGraph() {
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
        },
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }
}
