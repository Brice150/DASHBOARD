import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../../../core/interfaces/user';
import { cloneDeep } from 'lodash';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-finance-update-dialog',
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
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = cloneDeep(this.data.user);
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
    this.dialogRef.close(null);
  }

  validate(): void {
    if (
      this.totalIncome !== undefined &&
      this.totalSavings !== undefined &&
      this.totalStockExchange !== undefined &&
      this.totalRealEstate !== undefined &&
      this.totalIncome >= 0 &&
      this.totalSavings >= 0 &&
      this.totalStockExchange >= 0 &&
      this.totalRealEstate >= 0
    ) {
      this.user.financeInfos.spendingsInfos.totalAmount = this.totalIncome;
      this.user.financeInfos.savingsInfos.totalAmount = this.totalSavings;
      this.user.financeInfos.stockExchangeInfos.totalAmount =
        this.totalStockExchange;
      this.user.financeInfos.realEstateInfos.totalAmount = this.totalRealEstate;
      this.dialogRef.close(this.user);
    } else {
      this.toastr.error(
        'At least one number is missing or is negative',
        'Finance',
        {
          positionClass: 'toast-top-center',
          toastClass: 'ngx-toastr custom',
        }
      );
    }
  }
}
