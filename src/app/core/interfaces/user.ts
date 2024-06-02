import { FinanceInfos } from './financeInfos';
import { Task } from './task';
import { WeatherInfos } from './weatherInfos';

export interface User {
  prefersDarkMode: boolean;
  hidesFinanceInfos: boolean;
  financeInfos: FinanceInfos;
  weatherInfos: WeatherInfos;
  tasks: Task[];
}
