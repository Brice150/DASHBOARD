import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { CityGeolocation } from '../interfaces/city';
import { Weather } from '../interfaces/weather';

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

  public getWeatherInfo(cities: CityGeolocation[]): Observable<Weather[]> {
    const weatherApis: string[] = [];
    cities.forEach((city: CityGeolocation) => {
      weatherApis.push(
        this.weatherApiUrl +
          this.latitudeApiParams +
          city.latitude.replace(',', '.') +
          this.longitudeApiParams +
          city.longitude.replace(',', '.') +
          this.otherApiParams
      );
    });

    // Crée un tableau d'observables HTTP dynamiquement
    const weatherRequests = weatherApis.map((apiUrl) =>
      this.http.get<Weather>(apiUrl)
    );

    return forkJoin(weatherRequests);
  }
}
