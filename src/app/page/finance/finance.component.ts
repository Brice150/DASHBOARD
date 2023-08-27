import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/core/interface/user';
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
  @Input() user!: User;
  @Output() refreshEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.calculateAmounts();
  }

  calculateAmounts() {
    for (let index = 1; index < 4; index++) {
      let totalAmount = this.user.financeInfos.totalAmount[index - 1];
      const startYear = this.getNumberOfYears(index - 1) + 1;

      for (let year = startYear; year <= this.getNumberOfYears(index); year++) {
        totalAmount += this.user.financeInfos.moneyInput.amountPerMonth * 12;
        totalAmount *= this.user.financeInfos.moneyInput.percentage;
      }

      this.user.financeInfos.totalAmount[index] = totalAmount;
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
      financeInfo: this.user.financeInfos,
      index: index
    };

    this.dialog.open(FinanceDialogComponent, {
      data: dialogData
    });
  }
  
  openStrategyDialog() {
    const dialogData = {
      user: this.user
    };

    const dialogRef = this.dialog.open(StrategyDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reload();
      }
    });
  }

  reload() {
    this.refreshEvent.emit();
  }
}
