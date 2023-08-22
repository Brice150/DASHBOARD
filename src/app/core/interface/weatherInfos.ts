export interface WeatherInfos {
    current_weather: CurrentWeather;
    daily: Daily;
}

export interface CurrentWeather {
    weathercode: number;
    temperature: number;
    windspeed: number;
}

export interface Daily {
    weathercode: number[];
    precipitation_sum: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    windspeed_10m_max: number[];
    time: string[];
}