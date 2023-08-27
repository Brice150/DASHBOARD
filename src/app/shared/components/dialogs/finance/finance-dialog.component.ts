import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  }

  close() {
    this.dialogRef.close(false);
  }
}