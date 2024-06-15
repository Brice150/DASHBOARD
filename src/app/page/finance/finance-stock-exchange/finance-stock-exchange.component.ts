import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../core/interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FinanceStockExchangeUpdateDialogComponent } from '../../../shared/components/dialogs/update/finance-stock-exchange/finance-stock-exchange-update-dialog.component';
import { Chart } from 'chart.js';
import { Yearly } from '../../../core/interfaces/financeInfos';

@Component({
  selector: 'app-finance-stock-exchange',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finance-stock-exchange.component.html',
  styleUrl: './finance-stock-exchange.component.css',
})
export class FinanceStockExchangeComponent implements OnInit {
  @Input() user!: User;
  barGraph?: Chart<'bar', number[], string>;

  constructor(public dialog: MatDialog, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.calculateAmounts();
    this.displayStockExchangeGraph();
  }

  displayStockExchangeGraph(): void {
    const graph = document.getElementById(
      'barGraph'
    ) as HTMLCanvasElement | null;
    if (graph) {
      this.barGraph = new Chart(graph, {
        type: 'bar',
        data: {
          labels: this.user.financeInfos.stockExchangeInfos.yearly.date,
          datasets: [
            {
              label: 'Invested',
              data: this.user.financeInfos.stockExchangeInfos.yearly.invested,
              backgroundColor: '#0009d7',
            },
            {
              label: 'Interests',
              data: this.user.financeInfos.stockExchangeInfos.yearly.interests,
              backgroundColor: '#cf0000',
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                font: {
                  size: 16,
                },
              },
            },
          },
          color: '#006aff',
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        },
      });
    }
  }

  updateStockExchangeGraph(): void {
    if (this.barGraph) {
      this.barGraph.data.labels =
        this.user.financeInfos.stockExchangeInfos.yearly.date;
      this.barGraph.data.datasets = [
        {
          label: 'Invested',
          data: this.user.financeInfos.stockExchangeInfos.yearly.invested,
          backgroundColor: '#0009d7',
        },
        {
          label: 'Interests',
          data: this.user.financeInfos.stockExchangeInfos.yearly.interests,
          backgroundColor: '#cf0000',
        },
      ];
      this.barGraph.update();
    }
  }

  calculateAmounts(): void {
    if (
      !this.user.financeInfos.stockExchangeInfos.yearly.date ||
      this.user.financeInfos.stockExchangeInfos.yearly.date.length === 0
    ) {
      this.initiateDates();
    }
    this.user.financeInfos.stockExchangeInfos.yearly.invested[0] =
      this.user.financeInfos.stockExchangeInfos.totalAmount;
    this.user.financeInfos.stockExchangeInfos.yearly.interests[0] = 0;
    this.user.financeInfos.stockExchangeInfos.yearly.total[0] =
      this.user.financeInfos.stockExchangeInfos.totalAmount;

    for (
      let index = 1;
      index < this.user.financeInfos.stockExchangeInfos.yearly.date.length;
      index++
    ) {
      let invested: number =
        this.user.financeInfos.stockExchangeInfos.yearly.invested[index - 1];
      let interests: number =
        this.user.financeInfos.stockExchangeInfos.yearly.interests[index - 1];

      invested += this.user.financeInfos.stockExchangeInfos.amountPerMonth * 12;
      interests +=
        (invested + interests) *
        (this.user.financeInfos.stockExchangeInfos.percentage / 100);

      this.user.financeInfos.stockExchangeInfos.yearly.invested[index] =
        invested;
      this.user.financeInfos.stockExchangeInfos.yearly.interests[index] =
        interests;
      this.user.financeInfos.stockExchangeInfos.yearly.total[index] =
        invested + interests;
    }
  }

  initiateDates(): void {
    const yearly: Yearly = {
      date: Array.from({ length: 41 }, (_, i) => i.toString()),
      invested: [this.user.financeInfos.stockExchangeInfos.totalAmount],
      interests: [0],
      total: [this.user.financeInfos.stockExchangeInfos.totalAmount],
    };

    this.user.financeInfos.stockExchangeInfos.yearly = yearly;
    localStorage.setItem('userDashboard', JSON.stringify(this.user));
  }

  openUpdateDialog(): void {
    const dialogData = {
      user: this.user,
    };

    const dialogRef = this.dialog.open(
      FinanceStockExchangeUpdateDialogComponent,
      {
        data: dialogData,
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.calculateAmounts();
        this.updateStockExchangeGraph();
        this.toastr.success('Stock exchange updated', 'Finance', {
          positionClass: 'toast-top-center',
          toastClass: 'ngx-toastr custom',
        });
      }
    });
  }
}
