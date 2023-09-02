import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/interface/user';
import { FinanceDialogComponent } from 'src/app/shared/components/dialogs/finance/finance-dialog.component';
import { StrategyDialogComponent } from 'src/app/shared/components/dialogs/strategy/strategy-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit, OnChanges {
  imagePath: string = environment.imagePath;
  indexToDisplay: number[] = [0, 1, 10, 25];
  @Input() user!: User;
  @Output() refreshEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.calculateAmounts();
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  calculateAmounts() {
    this.user.financeInfos.yearly.invested[0] = this.user.financeInfos.moneyInput.initialAmount;
    this.user.financeInfos.yearly.interests[0] = 0;
    this.user.financeInfos.yearly.total[0] = this.user.financeInfos.moneyInput.initialAmount;
    
    for (let index = 1; index < this.user.financeInfos.yearly.date.length; index++) {
      let invested: number = this.user.financeInfos.yearly.invested[index - 1];
      let interests: number = this.user.financeInfos.yearly.interests[index - 1];
  
      invested += this.user.financeInfos.moneyInput.amountPerMonth * 12;
      interests += (invested + interests) * (this.user.financeInfos.moneyInput.percentage / 100);
  
      this.user.financeInfos.yearly.invested[index] = invested;
      this.user.financeInfos.yearly.interests[index] = interests;
      this.user.financeInfos.yearly.total[index] = invested + interests;
    }
  }

  openFinanceDialog() {
    const dialogData = {
      financeInfo: this.user.financeInfos
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
        this.toastr.success('Strategy updated', 'Finance', {
          positionClass: 'toast-top-center' 
        });
      }
    });
  }

  reload() {
    this.refreshEvent.emit();
  }
}
