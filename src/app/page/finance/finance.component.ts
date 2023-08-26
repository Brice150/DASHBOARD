import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FinanceInfos, MoneyInput } from 'src/app/core/interface/financeInfos';
import { FinanceDialogComponent } from 'src/app/shared/components/dialogs/finance/finance-dialog.component';
import { StrategyDialogComponent } from 'src/app/shared/components/dialogs/strategy/strategy-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {
  imagePath: string = environment.imagePath;
  financeInfos!: FinanceInfos;

  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    const moneyInput: MoneyInput = {
      'amountPerMonth': 100, 
      'initialAmount': 1000,
      'percentage': 1.08
    };

    this.financeInfos = {
      'date': ['Today', '1 Year', '10 Year', '25 Years'],
      'totalAmount': [moneyInput.initialAmount],
      'moneyInput': moneyInput
    }

    this.calculateAmounts();
  }

  calculateAmounts() {
    for (let index = 1; index < 4; index++) {
      let totalAmount = this.financeInfos.totalAmount[index - 1];
      const startYear = this.getNumberOfYears(index - 1) + 1;

      for (let year = startYear; year <= this.getNumberOfYears(index); year++) {
        totalAmount += this.financeInfos.moneyInput.amountPerMonth * 12;
        totalAmount *= this.financeInfos.moneyInput.percentage;
      }

      this.financeInfos.totalAmount[index] = totalAmount;
    }
  }

  getNumberOfYears(index: number): number {
    switch (index) {
      case 0:
        return 0;
      case 1:
        return 1;
      case 2:
        return 10;
      default:
        return 25;
    }
  }

  openFinanceDialog(index: number) {
    const dialogData = {
      financeInfo: this.financeInfos,
      index: index
    };

    this.dialog.open(FinanceDialogComponent, {
      data: dialogData
    });
  }
  
  openStrategyDialog() {
    const dialogRef = this.dialog.open(StrategyDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.changeStrategy();
      }
    });
  }

  changeStrategy() {
    //TODO
  }
}
