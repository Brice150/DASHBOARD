import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Chart } from 'chart.js/auto';
import { WeatherInfos } from 'src/app/core/interface/weatherInfos';

@Component({
  selector: 'app-weather-dialog',
  templateUrl: './weather-dialog.component.html',
  styleUrls: ['./weather-dialog.component.css']
})
export class WeatherDialogComponent implements OnInit {
  weatherInfo!: WeatherInfos;
  index!: number;

  constructor(
    public dialogRef: MatDialogRef<WeatherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {    
    this.weatherInfo = this.data.weatherInfo;
    this.index = this.data.index;

    const graph = document.getElementById('weatherGraph') as HTMLCanvasElement | null;
    if (graph) {
      const weatherGraph = new Chart(graph, {
        type: 'line',
        data: {
          labels: ['11h', '12h', '13h'],
          datasets: [
            {
              label: 'Precipitation',
              data: [1, 0, 0]
            },
            {
              label: 'Temperature',
              data: [12, 19, 3]
            },
            {
              label: 'Windspeed',
              data: [10, 15.5, 2]
            },
          ]
        }
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }
}