import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { User } from '../interfaces/user';
import { CityGeolocation, LocalWeather } from '../interfaces/weatherInfos';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  weatherApiUrl: string = 'https://api.open-meteo.com/v1/meteofrance';
  latitudeApiParams: string = '?latitude=';
  longitudeApiParams: string = '&longitude=';
  otherApiParams: string =
    '&hourly=temperature_2m,precipitation,windspeed_10m' +
    '&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max' +
    '&current_weather=true&timezone=auto';

  constructor(private http: HttpClient) {}

  public getWeatherInfo(
    user: User
  ): Observable<[LocalWeather, LocalWeather, LocalWeather, LocalWeather]> {
    const weatherApis: string[] = [];
    user.weatherInfos.cities.forEach((city: CityGeolocation) => {
      weatherApis.push(
        this.weatherApiUrl +
          this.latitudeApiParams +
          city.latitude.replace(',', '.') +
          this.longitudeApiParams +
          city.longitude.replace(',', '.') +
          this.otherApiParams
      );
    });

    return zip(
      this.http.get<LocalWeather>(weatherApis[0]),
      this.http.get<LocalWeather>(weatherApis[1]),
      this.http.get<LocalWeather>(weatherApis[2]),
      this.http.get<LocalWeather>(weatherApis[3])
    );
  }
}
