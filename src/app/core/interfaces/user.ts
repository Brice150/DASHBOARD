import { MapMarker } from '@angular/google-maps';
import { FinanceInfos } from './financeInfos';
import { WeatherInfos } from './weatherInfos';

export interface User {
  appVersion: number;
  prefersDarkMode: boolean;
  perfersFinanceHidden: boolean;
  financeInfos: FinanceInfos;
  weatherInfos: WeatherInfos;
  tasks: Task[];
  trips: MapMarker[];
}

export interface Task {
  name: string;
  id: number;
  subtasks?: Task[];
}
