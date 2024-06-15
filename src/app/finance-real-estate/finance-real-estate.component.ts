import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../core/interfaces/user';
import { HeaderComponent } from '../header/header.component';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-finance-real-estate',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './finance-real-estate.component.html',
  styleUrl: './finance-real-estate.component.css',
})
export class FinanceRealEstateComponent implements OnInit {
  user!: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.calculateAmounts();
  }

  calculateAmounts(): void {
    this.calculateTotalCost();
    this.calculateTotalRent();
    this.calculateFinancing();
    this.calculateTotalCharges();
    this.calculateGrossYield();
    this.calculateNetYield();
    this.calculateCashFlow();
    this.userService.saveUser(this.user);
  }

  calculateTotalCost(): void {
    this.user.financeInfos.realEstateInfos.results.totalCost =
      this.user.financeInfos.realEstateInfos.purchase.price +
      this.user.financeInfos.realEstateInfos.purchase.notaryFees +
      this.user.financeInfos.realEstateInfos.renovation.price +
      this.user.financeInfos.realEstateInfos.renovation.furnitureBudget;
  }

  calculateTotalRent(): void {
    this.user.financeInfos.realEstateInfos.results.totalRents =
      this.user.financeInfos.realEstateInfos.rent.lotsNumber *
      this.user.financeInfos.realEstateInfos.rent.rentPerLot;
  }

  calculateFinancing(): void {
    this.user.financeInfos.realEstateInfos.financing.totalBorrowed =
      this.user.financeInfos.realEstateInfos.results.totalCost -
      this.user.financeInfos.realEstateInfos.financing.downPayment;
    this.calculateMonthlyPayments();
  }

  calculateMonthlyPayments(): void {
    if (this.user.financeInfos.realEstateInfos.financing.duration !== 0) {
      const cost =
        this.user.financeInfos.realEstateInfos.financing.totalBorrowed;
      const annualLoanRate =
        this.user.financeInfos.realEstateInfos.financing.loanRate;
      const annualInsuranceRate =
        this.user.financeInfos.realEstateInfos.financing.insuranceRate;
      const years = this.user.financeInfos.realEstateInfos.financing.duration;

      const monthlyLoanRate = annualLoanRate / 12 / 100;
      const monthlyInsuranceRate = annualInsuranceRate / 12 / 100;
      const n = years * 12;

      const monthlyPaymentWithoutInsurance =
        (cost * monthlyLoanRate) / (1 - Math.pow(1 + monthlyLoanRate, -n));
      const monthlyInsurancePayment = cost * monthlyInsuranceRate;
      const totalMonthlyPayment =
        monthlyPaymentWithoutInsurance + monthlyInsurancePayment;

      this.user.financeInfos.realEstateInfos.financing.monthlyPayments =
        totalMonthlyPayment;
    } else {
      this.user.financeInfos.realEstateInfos.financing.monthlyPayments = 0;
    }
  }

  calculateTotalCharges(): void {
    this.user.financeInfos.realEstateInfos.results.totalCharges =
      (this.user.financeInfos.realEstateInfos.annualExpenses.propertyTax +
        this.user.financeInfos.realEstateInfos.annualExpenses.pnoInsurance +
        this.user.financeInfos.realEstateInfos.annualExpenses
          .coownershipCharges +
        this.user.financeInfos.realEstateInfos.annualExpenses.otherCharges) /
      12;
  }

  calculateGrossYield(): void {
    if (this.user.financeInfos.realEstateInfos.results.totalCost !== 0) {
      this.user.financeInfos.realEstateInfos.results.grossYield =
        (this.user.financeInfos.realEstateInfos.results.totalRents * 12) /
        this.user.financeInfos.realEstateInfos.results.totalCost;
    } else {
      this.user.financeInfos.realEstateInfos.results.grossYield = 0;
    }
  }

  calculateNetYield(): void {
    if (this.user.financeInfos.realEstateInfos.results.totalCost !== 0) {
      this.user.financeInfos.realEstateInfos.results.netYield =
        ((this.user.financeInfos.realEstateInfos.results.totalRents -
          this.user.financeInfos.realEstateInfos.results.totalCharges) *
          12) /
        this.user.financeInfos.realEstateInfos.results.totalCost;
    } else {
      this.user.financeInfos.realEstateInfos.results.netYield = 0;
    }
  }

  calculateCashFlow(): void {
    this.user.financeInfos.realEstateInfos.results.cashFlow =
      this.user.financeInfos.realEstateInfos.results.totalRents -
      this.user.financeInfos.realEstateInfos.results.totalCharges -
      this.user.financeInfos.realEstateInfos.financing.monthlyPayments;
  }
}
