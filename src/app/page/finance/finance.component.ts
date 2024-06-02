import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { User } from '../../core/interfaces/user';
import { FinanceDialogComponent } from '../../shared/components/dialogs/finance/finance-dialog.component';
import { StrategyDialogComponent } from '../../shared/components/dialogs/strategy/strategy-dialog.component';
import { YearPipe } from '../../shared/pipes/year.pipe';

@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [CommonModule, YearPipe],
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css'],
})
export class FinanceComponent implements OnInit {
  imagePath: string = environment.imagePath;
  @Input() user!: User;

  constructor(public dialog: MatDialog, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.calculateAmounts();
  }

  calculateAmounts(): void {
    if (
      this.user.financeInfos.stockExchangeInfos &&
      this.user.financeInfos.stockExchangeInfos.yearly
    ) {
      this.user.financeInfos.stockExchangeInfos.yearly.invested[0] =
        this.user.financeInfos.stockExchangeInfos.stockMoneyInput.initialAmount;
      this.user.financeInfos.stockExchangeInfos.yearly.interests[0] = 0;
      this.user.financeInfos.stockExchangeInfos.yearly.total[0] =
        this.user.financeInfos.stockExchangeInfos.stockMoneyInput.initialAmount;

      for (
        let index = 1;
        index < this.user.financeInfos.stockExchangeInfos.yearly.date.length;
        index++
      ) {
        let invested: number =
          this.user.financeInfos.stockExchangeInfos.yearly.invested[index - 1];
        let interests: number =
          this.user.financeInfos.stockExchangeInfos.yearly.interests[index - 1];

        invested +=
          this.user.financeInfos.stockExchangeInfos.stockMoneyInput
            .amountPerMonth * 12;
        interests +=
          (invested + interests) *
          (this.user.financeInfos.stockExchangeInfos.stockMoneyInput
            .percentage /
            100);

        this.user.financeInfos.stockExchangeInfos.yearly.invested[index] =
          invested;
        this.user.financeInfos.stockExchangeInfos.yearly.interests[index] =
          interests;
        this.user.financeInfos.stockExchangeInfos.yearly.total[index] =
          invested + interests;
      }
    }
  }

  openFinanceDialog(): void {
    const dialogData = {
      financeInfo: this.user.financeInfos,
    };

    this.dialog.open(FinanceDialogComponent, {
      data: dialogData,
    });
  }

  openStrategyDialog(): void {
    const dialogData = {
      user: this.user,
    };

    const dialogRef = this.dialog.open(StrategyDialogComponent, {
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.calculateAmounts();
        this.toastr.success('Strategy updated', 'Finance', {
          positionClass: 'toast-top-center',
        });
      }
    });
  }
}
