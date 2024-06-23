import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { WeatherInfos } from '../interfaces/weatherInfos';
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
} from '../interfaces/financeInfos';
import { defaultCities } from '../../shared/data/defaultCities';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User = {} as User;
  private appVersion: number = 2.1;

  setDefaultUser(): void {
    this.user.appVersion = this.appVersion;
    this.user.prefersDarkMode = false;
    this.user.perfersFinanceHidden = false;
    this.user.tasks = [];
    this.user.trips = [];
    this.user.weatherInfos = {} as WeatherInfos;
    this.user.weatherInfos.cities = defaultCities;
    this.user.weatherInfos.localWeathers = [];
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
    this.user.financeInfos.realEstateInfos.results = {} as Results;
    this.user.financeInfos.realEstateInfos.results.totalCost = 0;
    this.user.financeInfos.realEstateInfos.results.totalRents = 0;
    this.user.financeInfos.realEstateInfos.results.totalCharges = 0;
    this.user.financeInfos.realEstateInfos.results.grossYield = 0;
    this.user.financeInfos.realEstateInfos.results.netYield = 0;
    this.user.financeInfos.realEstateInfos.results.cashFlow = 0;
    this.user.financeInfos.realEstateInfos.purchase = {} as Purchase;
    this.user.financeInfos.realEstateInfos.purchase.price = 0;
    this.user.financeInfos.realEstateInfos.purchase.notaryFees = 0;
    this.user.financeInfos.realEstateInfos.renovation = {} as Renovation;
    this.user.financeInfos.realEstateInfos.renovation.price = 0;
    this.user.financeInfos.realEstateInfos.renovation.furnitureBudget = 0;
    this.user.financeInfos.realEstateInfos.financing = {} as Financing;
    this.user.financeInfos.realEstateInfos.financing.downPayment = 0;
    this.user.financeInfos.realEstateInfos.financing.loanRate = 0;
    this.user.financeInfos.realEstateInfos.financing.insuranceRate = 0;
    this.user.financeInfos.realEstateInfos.financing.duration = 0;
    this.user.financeInfos.realEstateInfos.financing.totalBorrowed = 0;
    this.user.financeInfos.realEstateInfos.financing.monthlyPayments = 0;
    this.user.financeInfos.realEstateInfos.annualExpenses =
      {} as AnnualExpenses;
    this.user.financeInfos.realEstateInfos.annualExpenses.propertyTax = 0;
    this.user.financeInfos.realEstateInfos.annualExpenses.pnoInsurance = 0;
    this.user.financeInfos.realEstateInfos.annualExpenses.coownershipCharges = 0;
    this.user.financeInfos.realEstateInfos.annualExpenses.otherCharges = 0;
    this.user.financeInfos.realEstateInfos.rent = {} as Rent;
    this.user.financeInfos.realEstateInfos.rent.lotsNumber = 0;
    this.user.financeInfos.realEstateInfos.rent.rentPerLot = 0;
  }

  getUser(): User {
    const storedUser = this.getStoredUser();
    if (
      !storedUser ||
      (storedUser && storedUser.appVersion !== this.appVersion)
    ) {
      this.setDefaultUser();
      this.saveUser(this.user);
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

  saveUser(user: User): void {
    this.user = user;
    localStorage.setItem('userDashboard', JSON.stringify(this.user));
  }
}
