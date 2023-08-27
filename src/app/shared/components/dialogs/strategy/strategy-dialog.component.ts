import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/core/interface/user';

@Component({
  selector: 'app-strategy-dialog',
  templateUrl: './strategy-dialog.component.html',
  styleUrls: ['./strategy-dialog.component.css']
})
export class StrategyDialogComponent implements OnInit {
  user!: User;

  constructor(
    public dialogRef: MatDialogRef<StrategyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
   
  ngOnInit() {
    this.user = this.data.user;
  }  

  close() {
    this.dialogRef.close(false);
  }

  validate() {
    localStorage.setItem('userDashboard', JSON.stringify(this.user));
    this.dialogRef.close(true);
  }
}