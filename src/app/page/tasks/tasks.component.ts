import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TasksDialogComponent } from 'src/app/shared/components/dialogs/tasks-dialog/tasks-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  constructor(
    public dialog: MatDialog
  ) {}

  openTasksDialog() {
    this.dialog.open(TasksDialogComponent);
  }
}
