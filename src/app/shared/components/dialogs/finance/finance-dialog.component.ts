import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Chart from 'chart.js/auto';
import { FinanceInfos } from 'src/app/core/interfaces/financeInfos';

@Component({
  selector: 'app-finance-dialog',
  templateUrl: './finance-dialog.component.html',
  styleUrls: ['./finance-dialog.component.css']
})
export class FinanceDialogComponent implements OnInit {
  financeInfo!: FinanceInfos;

  constructor(
    public dialogRef: MatDialogRef<FinanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.financeInfo = this.data.financeInfo;
    this.displayGraph();
  }

  displayGraph() {
    const graph = document.getElementById('financeGraph') as HTMLCanvasElement | null;
    if (graph) {
      const financeGraph = new Chart(graph, {
        type: 'bar',
        data: {
          labels: this.financeInfo.yearly.date,
          datasets: [
            {
              label: 'Invested',
              data: this.financeInfo.yearly.invested
            },
            {
              label: 'Interests',
              data: this.financeInfo.yearly.interests
            }
          ]
        },
        options: {
          scales: {
            x: {
              stacked: true
            },
            y: {
              stacked: true
            }
          }
        }
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }
}