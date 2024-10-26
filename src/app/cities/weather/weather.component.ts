import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { User } from '../../core/interfaces/user';
import { UserService } from '../../core/services/user.service';
import { City, CityGeolocation } from '../../core/interfaces/city';
import { WeatherImagePipe } from '../../shared/pipes/weather-image.pipe';
import { DayOfWeekPipe } from '../../shared/pipes/day-of-week.pipe';
import { Hourly, Weather } from '../../core/interfaces/weather';
import Chart from 'chart.js/auto';
import { WeatherService } from '../../core/services/weather.service';
import { Subject, takeUntil } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { citiesGeolocation } from '../../shared/data/citiesGeolocation';
import { ToastrService } from 'ngx-toastr';
import { CityComponent } from '../city/city.component';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    WeatherImagePipe,
    DayOfWeekPipe,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CityComponent,
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent implements OnInit {
  user: User = {} as User;
  city: City = {} as City;
  dayWeatherInfo: Hourly = {} as Hourly;
  index: number = 0;
  dayOfWeekPipe: DayOfWeekPipe = new DayOfWeekPipe();
  datePipe: DatePipe = new DatePipe('en-FR');
  lineGraph?: Chart<'line', number[], string>;
  destroyed$: Subject<void> = new Subject<void>();

  constructor(
    private userService: UserService,
    private weatherService: WeatherService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.city = this.user.cities.filter((city) => city.isHome)[0];
    this.getWeather(this.city, false);
  }

  getWeather(city: City, update: boolean): void {
    this.weatherService
      .getWeatherInfo([city.cityGeolocation])
      .pipe(takeUntil(this.destroyed$))
      .subscribe((weathers: Weather[]) => {
        city.weather = weathers[0];
        this.getDayWeatherInfo();
        if (update) {
          this.updateWeatherGraph();
        } else {
          this.displayWeatherGraph();
        }
      });
  }

  changeMode(): void {
    this.user = this.userService.getUser();
    this.updateWeatherGraph();
  }

  getDayWeatherInfo(): void {
    this.dayWeatherInfo.time = [];
    this.dayWeatherInfo.precipitation = [];
    this.dayWeatherInfo.temperature_2m = [];
    this.dayWeatherInfo.windspeed_10m = [];
    for (
      let index = 0;
      index < this.city.weather!.hourly.time.length;
      index++
    ) {
      if (
        this.dayOfWeekPipe.transform(this.city.weather!.hourly.time[index]) ===
        this.dayOfWeekPipe.transform(this.city.weather!.daily.time[this.index])
      ) {
        const hour: string =
          this.datePipe.transform(
            new Date(this.city.weather!.hourly.time[index]),
            'HH'
          ) + 'h';
        this.dayWeatherInfo.time.push(hour);
        this.dayWeatherInfo.precipitation.push(
          this.city.weather!.hourly.precipitation[index]
        );
        this.dayWeatherInfo.temperature_2m.push(
          this.city.weather!.hourly.temperature_2m[index]
        );
        this.dayWeatherInfo.windspeed_10m.push(
          this.city.weather!.hourly.windspeed_10m[index]
        );
      }
    }
  }

  displayWeatherGraph(): void {
    const textColorSecondary = this.user.prefersDarkMode ? 'white' : 'black';

    const graph = document.getElementById(
      'lineGraph'
    ) as HTMLCanvasElement | null;
    if (graph) {
      this.lineGraph = new Chart(graph, {
        type: 'line',
        data: {
          labels: this.dayWeatherInfo.time,
          datasets: [
            {
              label: 'Precipitation',
              data: this.dayWeatherInfo.precipitation.map(
                (precipitation) => precipitation * 10
              ),
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
                  weight: 800,
                },
                color: textColorSecondary,
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Hours',
                font: {
                  size: 18,
                  weight: 800,
                },
                color: '#006aff',
              },
              ticks: {
                color: textColorSecondary,
              },
              grid: {
                color: 'transparent',
              },
              border: {
                color: textColorSecondary,
              },
            },
            y: {
              title: {
                display: true,
                text: 'Value (°C - km/h - mm x 10)',
                font: {
                  size: 18,
                  weight: 800,
                },
                color: '#006aff',
              },
              ticks: {
                color: textColorSecondary,
              },
              grid: {
                color: textColorSecondary,
              },
              border: {
                color: textColorSecondary,
              },
            },
          },
        },
      });
    }
  }

  updateWeatherGraph(): void {
    if (this.lineGraph) {
      const textColorSecondary = this.user.prefersDarkMode ? 'white' : 'black';
      this.lineGraph.data.labels = this.dayWeatherInfo.time;
      this.lineGraph.data.datasets = [
        {
          label: 'Precipitation',
          data: this.dayWeatherInfo.precipitation.map(
            (precipitation) => precipitation * 10
          ),
        },
        {
          label: 'Temperature',
          data: this.dayWeatherInfo.temperature_2m,
        },
        {
          label: 'Windspeed',
          data: this.dayWeatherInfo.windspeed_10m,
        },
      ];
      this.lineGraph.options.plugins!.legend!.labels!.color =
        textColorSecondary;
      this.lineGraph.options.scales!['x']!.ticks!.color = textColorSecondary;
      this.lineGraph.options.scales!['x']!.border!.color = textColorSecondary;
      this.lineGraph.options.scales!['y']!.ticks!.color = textColorSecondary;
      this.lineGraph.options.scales!['y']!.grid!.color = textColorSecondary;
      this.lineGraph.options.scales!['y']!.border!.color = textColorSecondary;
      this.lineGraph.update();
    }
  }

  validate(): void {
    if (
      this.city.cityGeolocation.city &&
      this.city.cityGeolocation.city !== ''
    ) {
      const inputCity = this.city.cityGeolocation.city.toLowerCase().trim();

      const city: CityGeolocation | undefined = citiesGeolocation.find(
        (city: CityGeolocation) => city.city.toLowerCase().trim() === inputCity
      );

      if (city) {
        this.city.cityGeolocation = { ...city };
        this.getWeather(this.city, true);
      } else {
        this.toastr.error('City is invalid', 'City', {
          positionClass: 'toast-top-center',
          toastClass: 'ngx-toastr custom',
        });
      }
    } else {
      this.toastr.error('City is empty', 'City', {
        positionClass: 'toast-top-center',
        toastClass: 'ngx-toastr custom',
      });
    }
  }

  selectDate(index: number): void {
    this.index = index;
    this.getDayWeatherInfo();
    this.updateWeatherGraph();
  }
}
