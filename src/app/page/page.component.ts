import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../core/interfaces/user';
import { FinanceComponent } from './finance/finance.component';
import { TasksComponent } from './tasks/tasks.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherInfos } from '../core/interfaces/weatherInfos';
import {
  FinanceInfos,
  RealEstate,
  Savings,
  Spendings,
  StockExchange,
} from '../core/interfaces/financeInfos';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    WeatherComponent,
    FinanceComponent,
    TasksComponent,
    MatSlideToggleModule,
    FormsModule,
  ],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  user: User = {} as User;

  ngOnInit(): void {
    let storedUser: string | null = localStorage.getItem('userDashboard');
    if (storedUser !== null) {
      this.user = JSON.parse(storedUser);
    } else {
      this.setDefaultUser();
    }
    this.handleMode();
  }

  setDefaultUser(): void {
    this.user.prefersDarkMode = false;
    this.user.perfersFinanceHidden = false;
    this.user.tasks = [];
    this.user.weatherInfos = {} as WeatherInfos;
    this.user.financeInfos = {} as FinanceInfos;
    this.user.financeInfos.spendingsInfos = {} as Spendings;
    this.user.financeInfos.spendingsInfos.totalAmount = 0;
    this.user.financeInfos.savingsInfos = {} as Savings;
    this.user.financeInfos.savingsInfos.totalAmount = 0;
    this.user.financeInfos.stockExchangeInfos = {} as StockExchange;
    this.user.financeInfos.stockExchangeInfos.totalAmount = 0;
    this.user.financeInfos.realEstateInfos = {} as RealEstate;
    this.user.financeInfos.realEstateInfos.totalAmount = 0;
  }

  handleMode(): void {
    if (this.user.prefersDarkMode) {
      document.body.classList.add('dark-theme-variables');
    } else {
      document.body.classList.remove('dark-theme-variables');
    }
    this.user.prefersDarkMode = document.body.classList.contains(
      'dark-theme-variables'
    );
    localStorage.setItem('userDashboard', JSON.stringify(this.user));
  }

  changeMode(): void {
    document.body.classList.toggle('dark-theme-variables');
    this.user.prefersDarkMode = document.body.classList.contains(
      'dark-theme-variables'
    );
    localStorage.setItem('userDashboard', JSON.stringify(this.user));
  }

  hideFinance(): void {
    this.user.perfersFinanceHidden = !this.user.perfersFinanceHidden;
    localStorage.setItem('userDashboard', JSON.stringify(this.user));
  }
}
