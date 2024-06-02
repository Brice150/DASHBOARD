import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../core/interfaces/user';
import { WeatherService } from '../../core/services/weather.service';
import { CityDialogComponent } from '../../shared/components/dialogs/city/city-dialog.component';
import { DayOfWeekPipe } from '../../shared/pipes/dayOfWeek.pipe';
import { WeatherImagePipe } from '../../shared/pipes/weatherImage.pipe';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, DayOfWeekPipe, WeatherImagePipe],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  @Input() user!: User;
  dayOfWeekPipe: DayOfWeekPipe = new DayOfWeekPipe();
  weatherImagePipe: WeatherImagePipe = new WeatherImagePipe();

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.getWeatherInfos();
  }

  getWeatherInfos(): void {
    this.weatherService
      .getWeatherInfo(this.user)
      .subscribe(
        ([
          firstWeatherInfo,
          secondWeatherInfo,
          thirdWeatherInfo,
          lastWeatherInfo,
        ]) => {
          this.user.weatherInfos.localWeathers = [];
          this.user.weatherInfos.localWeathers[0] = firstWeatherInfo;
          this.user.weatherInfos.localWeathers[1] = secondWeatherInfo;
          this.user.weatherInfos.localWeathers[2] = thirdWeatherInfo;
          this.user.weatherInfos.localWeathers[3] = lastWeatherInfo;
          localStorage.setItem('userDashboard', JSON.stringify(this.user));
        }
      );
  }

  openCityDialog(): void {
    const dialogData = {
      user: this.user,
    };

    const dialogRef = this.dialog.open(CityDialogComponent, {
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getWeatherInfos();
        this.toastr.success('City updated', 'Weather', {
          positionClass: 'toast-top-center',
        });
      }
    });
  }
}
