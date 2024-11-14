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
import { TripState } from '../enums/trip-state.enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User = {} as User;

  private setDefaultUser(): void {
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
    if (!storedUser) {
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

  importUser(user: User): void {
    this.user = user;
    //TODO : controler si c'est bien un type user
    this.saveUser();
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
    this.sortUserTrips(countries);
    this.user.countries = countries;
    this.saveUser();
  }

  private sortUserTrips(countries: Country[]): void {
    countries.sort((a, b) => {
      const [visitedA, visitedB] = [a, b].map(
        (country) =>
          country.trips?.filter((trip) => trip.state === TripState.VISITED)
            .length || 0
      );
      const [toVisitA, toVisitB] = [a, b].map(
        (country) =>
          country.trips?.filter((trip) => trip.state === TripState.TO_VISIT)
            .length || 0
      );

      if (visitedB !== visitedA) return visitedB - visitedA;
      if (toVisitB !== toVisitA) return toVisitB - toVisitA;

      return 0;
    });

    countries.forEach((country) => {
      if (country.trips) {
        country.trips.sort((a, b) => {
          const stateDiff = a.state === TripState.VISITED ? -1 : 1;
          return stateDiff || a.city.localeCompare(b.city);
        });
      }
    });
  }
}
