import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../core/interfaces/user';
import { Chart } from 'chart.js';
import { MoneyInput } from '../../../core/interfaces/financeInfos';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ActivePage } from '../../../core/enums/active-page.enum';
import { FinanceIncomeSavingsUpdateDialogComponent } from '../../../shared/components/dialogs/update/finance-income-savings/finance-income-savings-update-dialog.component';

@Component({
  selector: 'app-finance-income-savings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finance-income-savings.component.html',
  styleUrl: './finance-income-savings.component.css',
})
export class FinanceIncomeSavingsComponent implements OnInit {
  @Input() user!: User;
  @Input() activePage!: ActivePage;
  doughnutGraph?: Chart<'doughnut', number[], string>;
  ActivePage = ActivePage;

  constructor(public dialog: MatDialog, private toastr: ToastrService) {}

  ngOnInit(): void {
    if (this.activePage === ActivePage.INCOME) {
      this.displayIncomeGraph();
    } else if (this.activePage === ActivePage.SAVINGS) {
      this.displaySavingsGraph();
    }
  }

  displayIncomeGraph(): void {
    this.updateResidue(
      this.user.financeInfos.spendingsInfos.spendings,
      this.user.financeInfos.spendingsInfos.totalAmount
    );
    const graph = document.getElementById(
      'doughnutGraph'
    ) as HTMLCanvasElement | null;
    if (graph) {
      this.doughnutGraph = new Chart(graph, {
        type: 'doughnut',
        data: {
          labels: this.user.financeInfos.spendingsInfos.spendings.map(
            (moneyInput: MoneyInput) => moneyInput.title
          ),
          datasets: [
            {
              label: 'Expenses',
              data: this.user.financeInfos.spendingsInfos.spendings.map(
                (moneyInput: MoneyInput) => moneyInput.amount
              ),
              backgroundColor:
                this.user.financeInfos.spendingsInfos.spendings.map(
                  (moneyInput: MoneyInput) => moneyInput.color
                ),
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
          color: '#006aff',
        },
      });
    }
  }

  displaySavingsGraph(): void {
    this.updateResidue(
      this.user.financeInfos.savingsInfos.savings,
      this.user.financeInfos.savingsInfos.totalAmount
    );
    const graph = document.getElementById(
      'doughnutGraph'
    ) as HTMLCanvasElement | null;
    if (graph) {
      this.doughnutGraph = new Chart(graph, {
        type: 'doughnut',
        data: {
          labels: this.user.financeInfos.savingsInfos.savings.map(
            (moneyInput: MoneyInput) => moneyInput.title
          ),
          datasets: [
            {
              label: 'Expenses',
              data: this.user.financeInfos.savingsInfos.savings.map(
                (moneyInput: MoneyInput) => moneyInput.amount
              ),
              backgroundColor: this.user.financeInfos.savingsInfos.savings.map(
                (moneyInput: MoneyInput) => moneyInput.color
              ),
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
          color: '#006aff',
        },
      });
    }
  }

  updateResidue(moneyInputs: MoneyInput[], totalAmount: number): void {
    let newTotal: number = 0;
    moneyInputs.forEach((moneyInput: MoneyInput) => {
      if (moneyInput.title !== 'Residue') {
        newTotal = newTotal + moneyInput.amount;
      }
    });

    if (newTotal > totalAmount) {
      if (this.activePage === ActivePage.INCOME) {
        this.user.financeInfos.spendingsInfos.totalAmount = newTotal;
      } else if (this.activePage === ActivePage.SAVINGS) {
        this.user.financeInfos.savingsInfos.totalAmount = newTotal;
      }
      totalAmount = newTotal;
      localStorage.setItem('userDashboard', JSON.stringify(this.user));
    }

    let residue: number = totalAmount;
    moneyInputs.forEach((moneyInput: MoneyInput) => {
      if (moneyInput.title !== 'Residue') {
        residue = residue - moneyInput.amount;
      }
    });
    if (
      moneyInputs.length === 0 ||
      !moneyInputs.some(
        (moneyInput: MoneyInput) => moneyInput.title === 'Residue'
      )
    ) {
      moneyInputs.push({
        title: 'Residue',
        amount: residue,
        color: '#818100',
      });
    } else {
      const residueIndex: number = moneyInputs.findIndex(
        (moneyInput: MoneyInput) => moneyInput.title === 'Residue'
      );
      if (residueIndex !== -1) {
        moneyInputs[residueIndex].amount = residue;
      }
    }
  }

  updateIncomeGraph(): void {
    if (this.doughnutGraph) {
      this.updateResidue(
        this.user.financeInfos.spendingsInfos.spendings,
        this.user.financeInfos.spendingsInfos.totalAmount
      );
      this.doughnutGraph.data.labels =
        this.user.financeInfos.spendingsInfos.spendings.map(
          (moneyInput: MoneyInput) => moneyInput.title
        );
      this.doughnutGraph.data.datasets[0].data =
        this.user.financeInfos.spendingsInfos.spendings.map(
          (moneyInput: MoneyInput) => moneyInput.amount
        );
      this.doughnutGraph.data.datasets[0].backgroundColor =
        this.user.financeInfos.spendingsInfos.spendings.map(
          (moneyInput: MoneyInput) => moneyInput.color
        );
      this.doughnutGraph.update();
    }
  }

  updateSavingsGraph(): void {
    if (this.doughnutGraph) {
      this.updateResidue(
        this.user.financeInfos.savingsInfos.savings,
        this.user.financeInfos.savingsInfos.totalAmount
      );
      this.doughnutGraph.data.labels =
        this.user.financeInfos.savingsInfos.savings.map(
          (moneyInput: MoneyInput) => moneyInput.title
        );
      this.doughnutGraph.data.datasets[0].data =
        this.user.financeInfos.savingsInfos.savings.map(
          (moneyInput: MoneyInput) => moneyInput.amount
        );
      this.doughnutGraph.data.datasets[0].backgroundColor =
        this.user.financeInfos.savingsInfos.savings.map(
          (moneyInput: MoneyInput) => moneyInput.color
        );
      this.doughnutGraph.update();
    }
  }

  openUpdateDialog(): void {
    const dialogData = {
      user: this.user,
      activePage: this.activePage,
    };

    const dialogRef = this.dialog.open(
      FinanceIncomeSavingsUpdateDialogComponent,
      {
        data: dialogData,
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.activePage === ActivePage.INCOME) {
          this.updateIncomeGraph();
          this.toastr.success('Expenses updated', 'Finance', {
            positionClass: 'toast-top-center',
            toastClass: 'ngx-toastr custom',
          });
        } else if (this.activePage === ActivePage.SAVINGS) {
          this.updateSavingsGraph();
          this.toastr.success('Savings updated', 'Finance', {
            positionClass: 'toast-top-center',
            toastClass: 'ngx-toastr custom',
          });
        }
      }
    });
  }
}
