import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tasks-dialog',
  templateUrl: './tasks-dialog.component.html',
  styleUrls: ['./tasks-dialog.component.css']
})
export class TasksDialogComponent{

  constructor(
    public dialogRef: MatDialogRef<TasksDialogComponent>
    ) {}

  cancel(): void {
    this.dialogRef.close(false);
  }
}