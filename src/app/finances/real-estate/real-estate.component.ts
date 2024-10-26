import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../core/interfaces/user';
import { UserService } from '../../core/services/user.service';
import { HeaderComponent } from '../../header/header.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-real-estate',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './real-estate.component.html',
  styleUrl: './real-estate.component.css',
})
export class RealEstateComponent implements OnInit {
  user: User = {} as User;

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
    this.userService.saveUserRealEstate(this.user.realEstate);
  }

  calculateTotalCost(): void {
    this.user.realEstate.results.totalCost =
      this.user.realEstate.purchase.price +
      this.user.realEstate.purchase.notaryFees +
      this.user.realEstate.renovation.price +
      this.user.realEstate.renovation.furnitureBudget;
  }

  calculateTotalRent(): void {
    this.user.realEstate.results.totalRents =
      this.user.realEstate.rent.lotsNumber *
      this.user.realEstate.rent.rentPerLot;
  }

  calculateFinancing(): void {
    this.user.realEstate.financing.totalBorrowed =
      this.user.realEstate.results.totalCost -
      this.user.realEstate.financing.downPayment;
    this.calculateMonthlyPayments();
  }

  calculateMonthlyPayments(): void {
    if (this.user.realEstate.financing.duration !== 0) {
      const cost = this.user.realEstate.financing.totalBorrowed;
      const annualLoanRate = this.user.realEstate.financing.loanRate;
      const annualInsuranceRate = this.user.realEstate.financing.insuranceRate;
      const years = this.user.realEstate.financing.duration;

      const monthlyLoanRate = annualLoanRate / 12 / 100;
      const monthlyInsuranceRate = annualInsuranceRate / 12 / 100;
      const n = years * 12;

      const monthlyPaymentWithoutInsurance =
        (cost * monthlyLoanRate) / (1 - Math.pow(1 + monthlyLoanRate, -n));
      const monthlyInsurancePayment = cost * monthlyInsuranceRate;
      const totalMonthlyPayment =
        monthlyPaymentWithoutInsurance + monthlyInsurancePayment;

      this.user.realEstate.financing.monthlyPayments = parseFloat(
        totalMonthlyPayment.toFixed(2)
      );
    } else {
      this.user.realEstate.financing.monthlyPayments = 0;
    }
  }

  calculateTotalCharges(): void {
    this.user.realEstate.results.totalCharges =
      (this.user.realEstate.annualExpenses.propertyTax +
        this.user.realEstate.annualExpenses.pnoInsurance +
        this.user.realEstate.annualExpenses.coownershipCharges +
        this.user.realEstate.annualExpenses.otherCharges) /
      12;
  }

  calculateGrossYield(): void {
    if (this.user.realEstate.results.totalCost !== 0) {
      this.user.realEstate.results.grossYield =
        (this.user.realEstate.results.totalRents * 12) /
        this.user.realEstate.results.totalCost;
    } else {
      this.user.realEstate.results.grossYield = 0;
    }
  }

  calculateNetYield(): void {
    if (this.user.realEstate.results.totalCost !== 0) {
      this.user.realEstate.results.netYield =
        ((this.user.realEstate.results.totalRents -
          this.user.realEstate.results.totalCharges) *
          12) /
        this.user.realEstate.results.totalCost;
    } else {
      this.user.realEstate.results.netYield = 0;
    }
  }

  calculateCashFlow(): void {
    this.user.realEstate.results.cashFlow =
      this.user.realEstate.results.totalRents -
      this.user.realEstate.results.totalCharges -
      this.user.realEstate.financing.monthlyPayments;
  }
}
