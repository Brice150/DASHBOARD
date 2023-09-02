import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WeatherInfos } from "../interfaces/weatherInfos";
import { CityGeolocation } from "../interfaces/cityGeolocation";

@Injectable({providedIn: 'root'})
export class WeatherService {
    weatherApiUrl: string = "https://api.open-meteo.com/v1/meteofrance";
    latitudeApiParams: string = "?latitude=";
    longitudeApiParams: string = "&longitude=";
    otherApiParams: string = "&hourly=temperature_2m,precipitation,windspeed_10m" +
    "&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max" +
    "&current_weather=true&timezone=auto";

    constructor(private http: HttpClient) {}

    public getWeatherInfo(city: CityGeolocation): Observable<WeatherInfos> {
        const cityGeolocationApiParams: string = this.latitudeApiParams + city.latitude.replace(',', '.')
        + this.longitudeApiParams + city.longitude.replace(',', '.');
        const api: string = this.weatherApiUrl + cityGeolocationApiParams + this.otherApiParams;
        return this.http.get<WeatherInfos>(api);
    }
}