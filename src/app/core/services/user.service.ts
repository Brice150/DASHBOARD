import { Injectable } from '@angular/core';
import {
  defaultCities,
  defaultCountries,
  defaultExpenses,
  defaultFinances,
  defaultRealEstate,
  defaultStockExchange,
  defaultTasks,
} from '../../shared/data/defaultData';
import { City } from '../interfaces/city';
import { Finance, RealEstate, StockExchange } from '../interfaces/finance';
import { MainTask } from '../interfaces/task';
import { User } from '../interfaces/user';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User = {} as User;
  private appVersion: number = 3.0;

  private setDefaultUser(): void {
    this.user.appVersion = this.appVersion;
    this.user.prefersDarkMode = false;
    this.user.mainTasks = defaultTasks;
    this.user.cities = defaultCities;
    this.user.countries = defaultCountries;
    this.user.finances = defaultFinances;
    this.user.expenses = defaultExpenses;
    this.user.stockExchange = defaultStockExchange;
    this.user.realEstate = defaultRealEstate;
  }

  getUser(): User {
    const storedUser = this.getStoredUser();
    if (
      !storedUser ||
      (storedUser && storedUser.appVersion !== this.appVersion)
    ) {
      this.setDefaultUser();
      this.saveUser();
    } else {
      this.user = storedUser;
    }
    return this.user;
  }

  private getStoredUser(): User | null {
    let storedUser: string | null = localStorage.getItem('userDashboard');
    if (storedUser !== null) {
      return JSON.parse(storedUser);
    } else {
      return null;
    }
  }

  private saveUser(): void {
    localStorage.setItem('userDashboard', JSON.stringify(this.user));
  }

  saveUserDarkMode(prefersDarkMode: boolean): void {
    this.user = this.getUser();
    this.user.prefersDarkMode = prefersDarkMode;
    this.saveUser();
  }

  saveUserCities(cities: City[]): void {
    this.user = this.getUser();
    this.user.cities = cities;
    this.saveUser();
  }

  saveUserFinances(finances: Finance[]): void {
    this.user = this.getUser();
    this.user.finances = finances;
    this.saveUser();
  }

  saveUserRealEstate(realEstate: RealEstate): void {
    this.user = this.getUser();
    this.user.realEstate = realEstate;
    this.saveUser();
  }

  saveUserStockExchange(stockExchange: StockExchange): void {
    this.user = this.getUser();
    this.user.stockExchange = stockExchange;
    this.saveUser();
  }

  saveUserExpenses(expenses: Finance[]): void {
    this.user = this.getUser();
    this.user.expenses = expenses;
    this.saveUser();
  }

  saveUserMainTasks(mainTasks: MainTask[]): void {
    this.user = this.getUser();
    this.user.mainTasks = mainTasks;
    this.saveUser();
  }

  saveUserTrips(countries: Country[]): void {
    this.user = this.getUser();
    this.user.countries = countries;
    this.saveUser();
  }
}
