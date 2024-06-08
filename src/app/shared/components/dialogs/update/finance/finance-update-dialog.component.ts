import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../../../core/interfaces/user';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-strategy-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './finance-update-dialog.component.html',
  styleUrls: ['./finance-update-dialog.component.css'],
})
export class FinanceUpdateDialogComponent implements OnInit {
  user!: User;
  totalIncome!: number;
  totalSavings!: number;
  totalStockExchange!: number;
  totalRealEstate!: number;

  constructor(
    public dialogRef: MatDialogRef<FinanceUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {}

  ngOnInit(): void {
    this.user = this.data.user;
    this.totalIncome = cloneDeep(
      this.user.financeInfos.spendingsInfos.totalAmount
    );
    this.totalSavings = cloneDeep(
      this.user.financeInfos.savingsInfos.totalAmount
    );
    this.totalStockExchange = cloneDeep(
      this.user.financeInfos.stockExchangeInfos.totalAmount
    );
    this.totalRealEstate = cloneDeep(
      this.user.financeInfos.realEstateInfos.totalAmount
    );
  }

  close(): void {
    this.dialogRef.close(false);
  }

  validate(): void {
    this.user.financeInfos.spendingsInfos.totalAmount = this.totalIncome;
    this.user.financeInfos.savingsInfos.totalAmount = this.totalSavings;
    this.user.financeInfos.stockExchangeInfos.totalAmount =
      this.totalStockExchange;
    this.user.financeInfos.realEstateInfos.totalAmount = this.totalRealEstate;
    localStorage.setItem('userDashboard', JSON.stringify(this.user));
    this.dialogRef.close(true);
  }
}
