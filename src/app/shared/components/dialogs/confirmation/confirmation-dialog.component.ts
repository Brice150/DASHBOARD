import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../../core/interfaces/user';
import { CommonModule } from '@angular/common';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent implements OnInit {
  user!: User;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User; index: number }
  ) {}

  ngOnInit(): void {
    this.user = cloneDeep(this.data.user);
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  delete(): void {
    this.user.tasks.splice(this.data.index, 1);
    this.dialogRef.close(this.user);
  }
}
