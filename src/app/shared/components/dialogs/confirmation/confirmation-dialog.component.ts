import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent implements OnInit {
  user!: User;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.user = this.data.user;
  }

  cancel() {
    this.dialogRef.close(false);
  }

  delete() {
    this.user.tasks.splice(this.data.index, 1);
    localStorage.setItem('userDashboard', JSON.stringify(this.user));
    this.dialogRef.close(true);
  }
}
