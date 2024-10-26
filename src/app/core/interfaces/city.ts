import { Weather } from './weather';

export interface City {
  cityGeolocation: CityGeolocation;
  isHome: boolean;
  weather?: Weather;
}

export interface CityGeolocation {
  city: string;
  latitude: string;
  longitude: string;
}
