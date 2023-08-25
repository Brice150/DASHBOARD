import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-city-dialog',
  templateUrl: './city-dialog.component.html',
  styleUrls: ['./city-dialog.component.css']
})
export class CityDialogComponent{

  constructor(
    public dialogRef: MatDialogRef<CityDialogComponent>
    ) {}

  cancel(): void {
    this.dialogRef.close(false);
  }
}