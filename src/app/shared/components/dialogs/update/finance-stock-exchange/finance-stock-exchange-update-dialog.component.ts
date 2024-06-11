import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ColorPickerModule } from 'ngx-color-picker';
import { ToastrService } from 'ngx-toastr';
import { ActivePage } from '../../../../../core/enums/active-page.enum';
import { User } from '../../../../../core/interfaces/user';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-finance-income-savings-update-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ColorPickerModule],
  templateUrl: './finance-stock-exchange-update-dialog.component.html',
  styleUrls: ['./finance-stock-exchange-update-dialog.component.css'],
})
export class FinanceStockExchangeUpdateDialogComponent implements OnInit {
  user!: User;
  totalAmount!: number;
  amountPerMonth!: number;
  percentage!: number;

  constructor(
    public dialogRef: MatDialogRef<FinanceStockExchangeUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { user: User; activePage: ActivePage },
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = this.data.user;
    this.totalAmount = cloneDeep(
      this.user.financeInfos.stockExchangeInfos.totalAmount
    );
    this.amountPerMonth = cloneDeep(
      this.user.financeInfos.stockExchangeInfos.amountPerMonth
    );
    this.percentage = cloneDeep(
      this.user.financeInfos.stockExchangeInfos.percentage
    );
  }

  close(): void {
    this.dialogRef.close(false);
  }

  validate(): void {
    if (
      this.totalAmount !== undefined &&
      this.amountPerMonth !== undefined &&
      this.percentage !== undefined &&
      this.totalAmount >= 0 &&
      this.amountPerMonth >= 0 &&
      this.percentage >= 0
    ) {
      this.user.financeInfos.stockExchangeInfos.totalAmount = this.totalAmount;
      this.user.financeInfos.stockExchangeInfos.amountPerMonth =
        this.amountPerMonth;
      this.user.financeInfos.stockExchangeInfos.percentage = this.percentage;
      localStorage.setItem('userDashboard', JSON.stringify(this.user));
      this.dialogRef.close(true);
    } else {
      this.toastr.error(
        'At least one element is missing or is equal to 0',
        'Finance',
        {
          positionClass: 'toast-top-center',
          toastClass: 'ngx-toastr custom',
        }
      );
    }
  }
}
