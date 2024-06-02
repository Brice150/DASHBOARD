import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../../core/interfaces/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-strategy-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './strategy-dialog.component.html',
  styleUrls: ['./strategy-dialog.component.css'],
})
export class StrategyDialogComponent implements OnInit {
  user!: User;
  initialAmount!: number;
  amountPerMonth!: number;
  percentage!: number;

  constructor(
    public dialogRef: MatDialogRef<StrategyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = this.data.user;
    this.initialAmount =
      this.user.financeInfos.stockExchangeInfos.stockMoneyInput.initialAmount;
    this.amountPerMonth =
      this.user.financeInfos.stockExchangeInfos.stockMoneyInput.amountPerMonth;
    this.percentage =
      this.user.financeInfos.stockExchangeInfos.stockMoneyInput.percentage;
  }

  close(): void {
    this.dialogRef.close(false);
  }

  validate(): void {
    if (this.initialAmount && this.amountPerMonth && this.percentage) {
      this.user.financeInfos.stockExchangeInfos.stockMoneyInput.initialAmount =
        this.initialAmount;
      this.user.financeInfos.stockExchangeInfos.stockMoneyInput.amountPerMonth =
        this.amountPerMonth;
      this.user.financeInfos.stockExchangeInfos.stockMoneyInput.percentage =
        this.percentage;
      localStorage.setItem('userDashboard', JSON.stringify(this.user));
      this.dialogRef.close(true);
    } else {
      this.toastr.error('All elements are required', 'Finance', {
        positionClass: 'toast-top-center',
      });
    }
  }
}
