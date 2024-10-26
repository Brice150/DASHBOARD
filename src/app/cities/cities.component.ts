import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { DayOfWeek } from '../core/enums/day.enum copy';
import { City } from '../core/interfaces/city';
import { User } from '../core/interfaces/user';
import { Weather } from '../core/interfaces/weather';
import { UserService } from '../core/services/user.service';
import { WeatherService } from '../core/services/weather.service';
import { HeaderComponent } from '../header/header.component';
import { DayOfWeekPipe } from '../shared/pipes/day-of-week.pipe';
import { CityComponent } from './city/city.component';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CityComponent, RouterModule],
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.css',
})
export class CitiesComponent implements OnInit {
  user: User = {} as User;
  dayOfWeekPipe: DayOfWeekPipe = new DayOfWeekPipe();
  destroyed$: Subject<void> = new Subject<void>();

  constructor(
    private weatherService: WeatherService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.getAllWeathers();
  }

  getAllWeathers(): void {
    if (
      this.user.cities.some(
        (city) =>
          !city.weather ||
          this.dayOfWeekPipe.transform(city.weather.daily.time[0]) !==
            DayOfWeek.TODAY
      )
    ) {
      this.weatherService
        .getWeatherInfo(this.user.cities.map((city) => city.cityGeolocation))
        .pipe(takeUntil(this.destroyed$))
        .subscribe((weathers: Weather[]) => {
          if (weathers.length === this.user.cities.length) {
            for (let i = 0; i < weathers.length; i++) {
              this.user.cities[i].weather = weathers[i];
            }
            this.userService.saveUserCities(this.user.cities);
          }
        });
    }
  }

  getWeather(city: City): void {
    this.weatherService
      .getWeatherInfo([city.cityGeolocation])
      .pipe(takeUntil(this.destroyed$))
      .subscribe((weathers: Weather[]) => {
        city.weather = weathers[0];
        this.userService.saveUserCities(this.user.cities);
      });
  }

  saveCities(index: number): void {
    if (this.user.cities[index].isHome) {
      this.user.cities.forEach((city) => (city.isHome = false));
      this.user.cities[index].isHome = true;
    } else if (this.user.cities.every((city) => !city.isHome)) {
      this.user.cities[0].isHome = true;
    }

    this.getWeather(this.user.cities[index]);
  }

  addCity(): void {
    const newCity: City = {
      cityGeolocation: {
        city: 'Paris',
        latitude: '48.8567',
        longitude: '2.3522',
      },
      isHome: false,
    };

    this.user.cities.push(newCity);
    this.getWeather(newCity);
  }

  deleteCity(index: number): void {
    if (this.user.cities.length === 1) {
      this.toastr.error('One city minimum', 'City', {
        positionClass: 'toast-top-center',
        toastClass: 'ngx-toastr custom',
      });
    } else {
      this.user.cities.splice(index, 1);
      this.saveCities(0);
    }
  }
}
