import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/interface/user';

@Component({
  selector: 'app-strategy-dialog',
  templateUrl: './strategy-dialog.component.html',
  styleUrls: ['./strategy-dialog.component.css']
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
   
  ngOnInit() {
    this.user = this.data.user;
    this.initialAmount = this.user.financeInfos.moneyInput.initialAmount;
    this.amountPerMonth = this.user.financeInfos.moneyInput.amountPerMonth;
    this.percentage = this.user.financeInfos.moneyInput.percentage;
  }  

  close() {
    this.dialogRef.close(false);
  }

  validate() {
    if (this.initialAmount && this.amountPerMonth && this.percentage) {
      this.user.financeInfos.moneyInput.initialAmount = this.initialAmount;
      this.user.financeInfos.moneyInput.amountPerMonth = this.amountPerMonth;
      this.user.financeInfos.moneyInput.percentage = this.percentage;
      localStorage.setItem('userDashboard', JSON.stringify(this.user));
      this.dialogRef.close(true);
    } else {
      this.toastr.error('All elements are required', 'Finance', {
        positionClass: 'toast-top-center' 
      });
    }
  }
}