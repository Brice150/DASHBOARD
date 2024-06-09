import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../../../core/interfaces/user';
import { ActivePage } from '../../../../../core/enums/active-page.enum';
import { MoneyInput } from '../../../../../core/interfaces/financeInfos';
import { cloneDeep } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-finance-income-savings-update-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ColorPickerModule],
  templateUrl: './finance-income-savings-update-dialog.component.html',
  styleUrls: ['./finance-income-savings-update-dialog.component.css'],
})
export class FinanceIncomeSavingsUpdateDialogComponent implements OnInit {
  user!: User;
  financeArray: MoneyInput[] = [];
  activePage!: ActivePage;
  ActivePage = ActivePage;

  constructor(
    public dialogRef: MatDialogRef<FinanceIncomeSavingsUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { user: User; activePage: ActivePage },
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = this.data.user;
    this.activePage = this.data.activePage;
    if (this.activePage === ActivePage.INCOME) {
      this.financeArray = cloneDeep(
        this.user.financeInfos.spendingsInfos.spendings
      );
    } else if (this.activePage === ActivePage.SAVINGS) {
      this.financeArray = cloneDeep(
        this.user.financeInfos.savingsInfos.savings
      );
    }
  }

  close(): void {
    this.dialogRef.close(false);
  }

  validate(): void {
    if (
      !this.financeArray.some(
        (moneyInput: MoneyInput) =>
          (!moneyInput.title ||
            moneyInput.title === '' ||
            !moneyInput.amount ||
            moneyInput.amount === 0) &&
          moneyInput.title !== 'Residue'
      )
    ) {
      if (this.activePage === ActivePage.INCOME) {
        this.user.financeInfos.spendingsInfos.spendings = this.financeArray;
      } else if (this.activePage === ActivePage.SAVINGS) {
        this.user.financeInfos.savingsInfos.savings = this.financeArray;
      }
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

  add(): void {
    if (this.activePage === ActivePage.INCOME) {
      this.financeArray.push({
        title: 'New expense',
        amount: 0,
        color: '#FF0000',
      });
    } else if (this.activePage === ActivePage.SAVINGS) {
      this.financeArray.push({
        title: 'New saving',
        amount: 0,
        color: '#FF0000',
      });
    }
  }

  delete(index: number): void {
    this.financeArray.splice(index, 1);
  }
}
