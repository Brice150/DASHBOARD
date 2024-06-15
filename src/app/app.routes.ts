import { Routes } from '@angular/router';
import { PageComponent } from './page/page.component';
import { WeatherCityComponent } from './page/weather/weather-city/weather-city.component';
import { FinanceRealEstateComponent } from './page/finance/finance-real-estate/finance-real-estate.component';
import { FinanceStockExchangeComponent } from './page/finance/finance-stock-exchange/finance-stock-exchange.component';
import { FinanceIncomeSavingsComponent } from './page/finance/finance-income-savings/finance-income-savings.component';

export const routes: Routes = [
  { path: '', component: PageComponent },
  { path: 'income', component: FinanceIncomeSavingsComponent },
  { path: 'savings', component: FinanceIncomeSavingsComponent },
  { path: 'stock-exchange', component: FinanceStockExchangeComponent },
  { path: 'real-estate', component: FinanceRealEstateComponent },
  { path: 'weather/:city', component: WeatherCityComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
