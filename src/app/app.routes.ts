import { Routes } from '@angular/router';
import { FinanceIncomeSavingsComponent } from './finance-income-savings/finance-income-savings.component';
import { PageComponent } from './page/page.component';
import { WeatherCityComponent } from './weather-city/weather-city.component';
import { FinanceStockExchangeComponent } from './finance-stock-exchange/finance-stock-exchange.component';
import { FinanceRealEstateComponent } from './finance-real-estate/finance-real-estate.component';

export const routes: Routes = [
  { path: '', component: PageComponent },
  { path: 'finance/:type', component: FinanceIncomeSavingsComponent },
  { path: 'stock-exchange', component: FinanceStockExchangeComponent },
  { path: 'real-estate', component: FinanceRealEstateComponent },
  { path: 'weather/:index', component: WeatherCityComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
