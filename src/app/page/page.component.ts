import { Component, OnInit } from '@angular/core';
import { User } from '../core/interfaces/user';
import { FinanceInfos, MoneyInput, Yearly } from '../core/interfaces/financeInfos';
@Component({
  selector: 'app-root',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit{
  user: User = {} as User;
  defaultCityName: string = "Paris";

  constructor() {}

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
      amountPerMonth: 100, 
      initialAmount: 1000,
      percentage: 8
    };

    const yearly: Yearly = {
      date: [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', 
        '9', '10', '11', '12', '13', '14', '15', '16', '17', 
        '18', '19', '20', '21', '22', '23', '24', '25'
      ],
      invested: [moneyInput.initialAmount],
      interests: [0],
      total: [moneyInput.initialAmount]
    }

    const financeInfos: FinanceInfos = {
      moneyInput: moneyInput,
      yearly: yearly
    };

    this.user = {
      prefersDarkMode: false,
      city: this.defaultCityName,
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

  reload() {
    this.ngOnInit();
  }
}
