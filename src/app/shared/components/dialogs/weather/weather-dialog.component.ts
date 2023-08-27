import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  }

  close() {
    this.dialogRef.close(false);
  }
}