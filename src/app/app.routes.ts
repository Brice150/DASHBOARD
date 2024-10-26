import { Routes } from '@angular/router';
import { CitiesComponent } from './cities/cities.component';
import { FinancesComponent } from './finances/finances.component';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { StockExchangeComponent } from './finances/stock-exchange/stock-exchange.component';
import { RealEstateComponent } from './finances/real-estate/real-estate.component';
import { ExpensesComponent } from './finances/expenses/expenses.component';
import { WeatherComponent } from './cities/weather/weather.component';
import { TripsComponent } from './cities/trips/trips.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cities', component: CitiesComponent },
  { path: 'cities/weather', component: WeatherComponent },
  { path: 'cities/trips', component: TripsComponent },
  { path: 'finances', component: FinancesComponent },
  { path: 'finances/expenses', component: ExpensesComponent },
  { path: 'finances/stock-exchange', component: StockExchangeComponent },
  { path: 'finances/real-estate', component: RealEstateComponent },
  { path: 'tasks', component: TasksComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
