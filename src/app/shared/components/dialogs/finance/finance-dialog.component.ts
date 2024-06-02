import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FinanceInfos } from '../../../../core/interfaces/financeInfos';
import { Chart } from 'chart.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finance-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finance-dialog.component.html',
  styleUrls: ['./finance-dialog.component.css'],
})
export class FinanceDialogComponent implements OnInit {
  financeInfo!: FinanceInfos;

  constructor(
    public dialogRef: MatDialogRef<FinanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.financeInfo = this.data.financeInfo;
    this.displayGraph();
  }

  displayGraph(): void {
    const graph = document.getElementById(
      'financeGraph'
    ) as HTMLCanvasElement | null;
    if (graph) {
      const financeGraph = new Chart(graph, {
        type: 'bar',
        data: {
          labels: this.financeInfo.stockExchangeInfos.yearly.date,
          datasets: [
            {
              label: 'Invested',
              data: this.financeInfo.stockExchangeInfos.yearly.invested,
            },
            {
              label: 'Interests',
              data: this.financeInfo.stockExchangeInfos.yearly.interests,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
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

  close(): void {
    this.dialogRef.close(false);
  }
}
