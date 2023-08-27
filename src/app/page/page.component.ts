import { Component, OnInit } from '@angular/core';
import { User } from '../core/interface/user';
import { FinanceInfos, MoneyInput } from '../core/interface/financeInfos';
import { Task } from '../core/interface/task';
@Component({
  selector: 'app-root',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit{
  user: User = {} as User;

  ngOnInit() {
    let storedUser: string | null = localStorage.getItem('userDashboard');
    if (storedUser !== null) {
      this.user = JSON.parse(storedUser);
    } else {
      this.generateDefaultUser();
      localStorage.setItem('userDashboard', JSON.stringify(this.user));
    }
    this.handleMode();
  }

  generateDefaultUser() {
    const moneyInput: MoneyInput = {
      'amountPerMonth': 100, 
      'initialAmount': 1000,
      'percentage': 1.08
    };

    const financeInfos: FinanceInfos = {
      date: ['Today', '1 Year', '10 Year', '25 Years'],
      totalAmount: [moneyInput.initialAmount],
      moneyInput: moneyInput
    };

    this.user = {
      prefersDarkMode: false,
      city: 'Paris',
      financeInfos: financeInfos,
      tasks: []
    };
  }

  handleMode() {
    if (this.user.prefersDarkMode) {
      document.body.classList.add('dark-theme-variables');
    } else {
      document.body.classList.remove('dark-theme-variables');
    }
    this.user.prefersDarkMode = document.body.classList.contains('dark-theme-variables');
    localStorage.setItem('userDashboard', JSON.stringify(this.user));
  }

  changeMode() {
    document.body.classList.toggle('dark-theme-variables');
    this.user.prefersDarkMode = document.body.classList.contains('dark-theme-variables');
    localStorage.setItem('userDashboard', JSON.stringify(this.user));
  }
}
