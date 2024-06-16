import { FinanceInfos } from './financeInfos';
import { Task } from './task';
import { WeatherInfos } from './weatherInfos';

export interface User {
  appVersion: number;
  prefersDarkMode: boolean;
  perfersFinanceHidden: boolean;
  financeInfos: FinanceInfos;
  weatherInfos: WeatherInfos;
  tasks: Task[];
}
