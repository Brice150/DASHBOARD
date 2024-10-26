import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CityComponent } from '../../cities/city/city.component';
import { DayOfWeek } from '../../core/enums/day.enum copy';
import { City } from '../../core/interfaces/city';
import { User } from '../../core/interfaces/user';
import { Weather } from '../../core/interfaces/weather';
import { UserService } from '../../core/services/user.service';
import { WeatherService } from '../../core/services/weather.service';
import { DayOfWeekPipe } from '../../shared/pipes/day-of-week.pipe';

@Component({
  selector: 'app-home-cities',
  standalone: true,
  imports: [CommonModule, RouterModule, CityComponent, DayOfWeekPipe],
  templateUrl: './home-cities.component.html',
  styleUrl: './home-cities.component.css',
})
export class HomeCitiesComponent implements OnInit {
  @Input() user: User = {} as User;
  city: City = {} as City;
  dayOfWeekPipe: DayOfWeekPipe = new DayOfWeekPipe();
  destroyed$: Subject<void> = new Subject<void>();

  constructor(
    private weatherService: WeatherService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather(): void {
    const homeCity: City | undefined = this.user.cities.find(
      (city) => city.isHome
    );
    if (homeCity) {
      this.city = homeCity;
      if (
        !this.city.weather ||
        this.dayOfWeekPipe.transform(this.city.weather.daily.time[0]) !==
          DayOfWeek.TODAY
      ) {
        this.weatherService
          .getWeatherInfo([homeCity.cityGeolocation])
          .pipe(takeUntil(this.destroyed$))
          .subscribe((weathers: Weather[]) => {
            this.user.cities.filter(
              (city) =>
                city.cityGeolocation.city === homeCity.cityGeolocation.city
            )[0].weather = weathers[0];
            this.userService.saveUserCities(this.user.cities);
            this.city.weather = weathers[0];
          });
      }
    }
  }
}
