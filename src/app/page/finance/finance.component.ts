import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FinanceInfos, MoneyInput } from 'src/app/core/interface/financeInfos';
import { FinanceDialogComponent } from 'src/app/shared/components/dialogs/finance-dialog/finance-dialog.component';
import { StrategyDialogComponent } from 'src/app/shared/components/dialogs/strategy-dialog/strategy-dialog.component';
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
    private http: HttpClient,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    const moneyInput: MoneyInput = {'amountPerMonth': 100, 'initialAmount': 1000};

    this.financeInfos = {
      'ETF': 'S&P500',
      'date': ['Today', '1 Year', '10 Year', '25 Years'],
      'totalAmount': [moneyInput.initialAmount],
      'moneyInput': moneyInput
    }

    this.calculateAmounts();
  }

  calculateAmounts() {
    const percentage: number = 1.08;
    for (let index = 1; index < 4; index++) {
      let totalAmount = this.financeInfos.totalAmount[index - 1];
      const startYear = this.getNumberOfYears(index - 1) + 1;

      for (let year = startYear; year <= this.getNumberOfYears(index); year++) {
        totalAmount += this.financeInfos.moneyInput.amountPerMonth * 12;
        totalAmount *= percentage;
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
    this.dialog.open(StrategyDialogComponent);
  }
}
