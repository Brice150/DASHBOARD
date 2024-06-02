import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../core/interfaces/user';
import { DayOfWeekPipe } from '../../shared/pipes/dayOfWeek.pipe';
import { WeatherImagePipe } from '../../shared/pipes/weatherImage.pipe';
import { WeatherInfos } from '../../core/interfaces/weatherInfos';
import { WeatherService } from '../../core/services/weather.service';
import { citiesGeolocation } from '../../shared/data/citiesGeolocation';
import { CityGeolocation } from '../../core/interfaces/cityGeolocation';
import { WeatherDialogComponent } from '../../shared/components/dialogs/weather/weather-dialog.component';
import { CityDialogComponent } from '../../shared/components/dialogs/city/city-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, DayOfWeekPipe],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit, OnChanges {
  @Input() user!: User;
  @Input() defaultCityName!: string;
  @Output() refreshEvent: EventEmitter<void> = new EventEmitter<void>();
  weatherInfo!: WeatherInfos;
  dayOfWeekPipe: DayOfWeekPipe = new DayOfWeekPipe();
  weatherImagePipe: WeatherImagePipe = new WeatherImagePipe();

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.getWeatherInfos();
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  getWeatherInfos() {
    let city: CityGeolocation | undefined = citiesGeolocation.find(
      (cityGeolocation) => {
        return (
          cityGeolocation.city.toLowerCase().trim() ===
          this.user.city.toLowerCase().trim()
        );
      }
    );
    if (!city) {
      city = citiesGeolocation.find((cityGeolocation) => {
        return (
          cityGeolocation.city.toLowerCase().trim() ===
          this.defaultCityName.toLowerCase().trim()
        );
      });
    }
    this.weatherService
      .getWeatherInfo(city!)
      .subscribe((response: WeatherInfos) => {
        this.weatherInfo = response;
        const transformedImage: string[] = [];

        for (let index = 0; index < 4; index++) {
          transformedImage.push(
            this.weatherImagePipe.transform(response.daily.weathercode[index])
          );
        }
        this.weatherInfo.daily.image = transformedImage;
      });
  }

  openWeatherDialog(index: number) {
    const dialogData = {
      weatherInfo: this.weatherInfo,
      index: index,
    };

    this.dialog.open(WeatherDialogComponent, {
      data: dialogData,
    });
  }

  openCityDialog() {
    const dialogData = {
      user: this.user,
    };

    const dialogRef = this.dialog.open(CityDialogComponent, {
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reload();
        this.toastr.success('City updated', 'Weather', {
          positionClass: 'toast-top-center',
        });
      }
    });
  }

  reload() {
    this.refreshEvent.emit();
  }
}
