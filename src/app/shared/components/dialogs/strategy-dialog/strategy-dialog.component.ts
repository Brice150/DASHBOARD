import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-strategy-dialog',
  templateUrl: './strategy-dialog.component.html',
  styleUrls: ['./strategy-dialog.component.css']
})
export class StrategyDialogComponent{

  constructor(
    public dialogRef: MatDialogRef<StrategyDialogComponent>
    ) {}

  cancel(): void {
    this.dialogRef.close(false);
  }
}