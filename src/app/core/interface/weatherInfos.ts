export interface WeatherInfos {
    daily: Daily;
}

export interface Daily {
    image: string[];
    weathercode: number[];
    precipitation_sum: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    windspeed_10m_max: number[];
    time: string[];
}