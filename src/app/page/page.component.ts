import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import {
  FinanceInfos,
  RealEstate,
  Savings,
  Spendings,
  StockExchange,
  Yearly,
} from '../core/interfaces/financeInfos';
import { User } from '../core/interfaces/user';
import { WeatherInfos } from '../core/interfaces/weatherInfos';
import { HeaderComponent } from '../header/header.component';
import { FinanceComponent } from './finance/finance.component';
import { TasksComponent } from './tasks/tasks.component';
import { WeatherComponent } from './weather/weather.component';
import { ActivePage } from '../core/enums/active-page.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    WeatherComponent,
    FinanceComponent,
    TasksComponent,
    MatSlideToggleModule,
    HeaderComponent,
  ],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  appVersion: number = 2.0;
  user: User = {} as User;
  indexSelected: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    let storedUser: string | null = localStorage.getItem('userDashboard');
    if (storedUser !== null) {
      const user: User = JSON.parse(storedUser);
      if (user.appVersion === this.appVersion) {
        this.user = user;
      } else {
        this.setDefaultUser();
      }
    } else {
      this.setDefaultUser();
    }
  }

  setDefaultUser(): void {
    this.user.appVersion = this.appVersion;
    this.user.prefersDarkMode = false;
    this.user.perfersFinanceHidden = false;
    this.user.tasks = [];
    this.user.weatherInfos = {} as WeatherInfos;
    this.user.financeInfos = {} as FinanceInfos;
    this.user.financeInfos.spendingsInfos = {} as Spendings;
    this.user.financeInfos.spendingsInfos.totalAmount = 0;
    this.user.financeInfos.spendingsInfos.spendings = [];
    this.user.financeInfos.savingsInfos = {} as Savings;
    this.user.financeInfos.savingsInfos.totalAmount = 0;
    this.user.financeInfos.savingsInfos.savings = [];
    this.user.financeInfos.stockExchangeInfos = {} as StockExchange;
    this.user.financeInfos.stockExchangeInfos.totalAmount = 0;
    this.user.financeInfos.stockExchangeInfos.amountPerMonth = 0;
    this.user.financeInfos.stockExchangeInfos.percentage = 0;
    this.user.financeInfos.stockExchangeInfos.yearly = {} as Yearly;
    this.user.financeInfos.realEstateInfos = {} as RealEstate;
    this.user.financeInfos.realEstateInfos.totalAmount = 0;
  }

  onCitySelected(index: number): void {
    this.router.navigate(['/weather/' + index], { state: { user: this.user } });
  }

  onFinanceTypeSelected(type: string): void {
    if (type === ActivePage.INCOME || type === ActivePage.SAVINGS) {
      this.router.navigate(['/finance/' + type], {
        state: { user: this.user },
      });
    } else if (type === ActivePage.STOCKEXCHANGE) {
      this.router.navigate(['/stock-exchange'], { state: { user: this.user } });
    } else {
      this.router.navigate(['/real-estate'], { state: { user: this.user } });
    }
  }

  onHideFinance(): void {
    let storedUser: string | null = localStorage.getItem('userDashboard');
    if (storedUser !== null) {
      this.user = JSON.parse(storedUser);
    }
  }
}
