import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FinanceInfos } from 'src/app/core/interface/financeInfos';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-finance-dialog',
  templateUrl: './finance-dialog.component.html',
  styleUrls: ['./finance-dialog.component.css']
})
export class FinanceDialogComponent implements OnInit{
  imagePath: string = environment.imagePath;
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

  cancel(): void {
    this.dialogRef.close(false);
  }
}