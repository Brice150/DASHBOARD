import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import {
  AnnualExpenses,
  FinanceInfos,
  Financing,
  Purchase,
  RealEstate,
  Renovation,
  Rent,
  Results,
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
import { UserService } from '../core/services/user.service';

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
  user: User = {} as User;
  indexSelected: number = 0;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  onCitySelected(index: number): void {
    this.router.navigate(['/weather/' + index]);
  }

  onFinanceTypeSelected(type: string): void {
    if (type === ActivePage.INCOME || type === ActivePage.SAVINGS) {
      this.router.navigate(['/finance/' + type], {
        state: { user: this.user },
      });
    } else if (type === ActivePage.STOCKEXCHANGE) {
      this.router.navigate(['/stock-exchange']);
    } else {
      this.router.navigate(['/real-estate']);
    }
  }

  onHideFinance(): void {
    let storedUser: string | null = localStorage.getItem('userDashboard');
    if (storedUser !== null) {
      this.user = JSON.parse(storedUser);
    }
  }
}
