import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Chart from 'chart.js/auto';
import { FinanceInfos } from 'src/app/core/interface/financeInfos';

@Component({
  selector: 'app-finance-dialog',
  templateUrl: './finance-dialog.component.html',
  styleUrls: ['./finance-dialog.component.css']
})
export class FinanceDialogComponent implements OnInit {
  financeInfo!: FinanceInfos;
  index!: number;

  constructor(
    public dialogRef: MatDialogRef<FinanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.financeInfo = this.data.financeInfo;
    this.index = this.data.index;

    const graph = document.getElementById('financeGraph') as HTMLCanvasElement | null;
    if (graph) {
      const financeGraph = new Chart(graph, {
        type: 'bar',
        data: {
          labels: ['1 Year', '2 Year', '3 Year'],
          datasets: [
            {
              label: 'Invested',
              data: [1, 2, 3]
            },
            {
              label: 'Interests',
              data: [0.5, 3, 5]
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