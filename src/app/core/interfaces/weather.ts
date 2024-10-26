export interface Weather {
  daily: Daily;
  hourly: Hourly;
}

export interface Daily {
  weathercode: number[];
  precipitation_sum: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  windspeed_10m_max: number[];
  time: string[];
}

export interface Hourly {
  precipitation: number[];
  temperature_2m: number[];
  windspeed_10m: number[];
  time: string[];
}
