import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CityGeolocation } from 'src/app/core/interface/cityGeolocation';
import { User } from 'src/app/core/interface/user';
import { WeatherInfos } from 'src/app/core/interface/weatherInfos';
import { CityDialogComponent } from 'src/app/shared/components/dialogs/city/city-dialog.component';
import { WeatherDialogComponent } from 'src/app/shared/components/dialogs/weather/weather-dialog.component';
import { citiesGeolocation } from 'src/app/shared/data/citiesGeolocation';
import { DayOfWeekPipe } from 'src/app/shared/pipes/dayOfWeek.pipe';
import { WeatherImagePipe } from 'src/app/shared/pipes/weatherImage.pipe';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnChanges {
  @Input() user!: User;
  @Output() refreshEvent: EventEmitter<void> = new EventEmitter<void>();
  weatherApiUrl: string = "https://api.open-meteo.com/v1/meteofrance";
  latitudeApiParams: string = "?latitude=";
  longitudeApiParams: string = "&longitude=";
  cityGeolocationApiParams!: string;
  otherApiParams: string = "&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&current_weather=true&timezone=auto";
  weatherInfo!: WeatherInfos;
  dayOfWeekPipe: DayOfWeekPipe = new DayOfWeekPipe();
  weatherImagePipe: WeatherImagePipe = new WeatherImagePipe();

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private toastr: ToastrService
    ) {}

  ngOnInit() {
    this.getWeatherInfos();
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  getWeatherInfos() {
    const city: CityGeolocation | undefined = citiesGeolocation.find((cityGeolocation) => {
      return cityGeolocation.city.toLowerCase().trim() === this.user.city.toLowerCase().trim()
    });
    if (city) {
      this.cityGeolocationApiParams = 
      this.latitudeApiParams + city.latitude.replace(',', '.')
      + this.longitudeApiParams + city.longitude.replace(',', '.');
    } else {
      this.cityGeolocationApiParams = "?latitude=48.8567&longitude=2.3522";
    } 
    const api: string = this.weatherApiUrl + this.cityGeolocationApiParams + this.otherApiParams;
    this.http.get<WeatherInfos>(api).subscribe((response: WeatherInfos) => {
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
    const dialogData = {
      user: this.user
    };

    const dialogRef = this.dialog.open(CityDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reload();
        this.toastr.success('City updated', 'Weather', {
          positionClass: 'toast-top-center' 
        });
      }
    });
  }

  reload() {
    this.refreshEvent.emit();
  }
}
