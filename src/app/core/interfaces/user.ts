import { City } from './city';
import { Country } from './country';
import { Finance, RealEstate, StockExchange } from './finance';
import { MainTask } from './task';

export interface User {
  appVersion: number;
  prefersDarkMode: boolean;
  cities: City[];
  countries: Country[];
  mainTasks: MainTask[];
  finances: Finance[];
  expenses: Finance[];
  stockExchange: StockExchange;
  realEstate: RealEstate;
}
