import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/core/interface/task';
import { User } from 'src/app/core/interface/user';
import { ConfirmationDialogComponent } from 'src/app/shared/components/dialogs/confirmation/confirmation-dialog.component';
import { TasksDialogComponent } from 'src/app/shared/components/dialogs/tasks/tasks-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  @Input() user!: User;
  @Output() refreshEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public dialog: MatDialog
  ) {}

  openTasksDialog(index?: number) {
    const dialogData = {
      user: this.user,
      index: index
    };

    const dialogRef = this.dialog.open(TasksDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reload();
      }
    });
  }

  openConfirmationDialog(index: number) {
    const dialogData = {
      user: this.user,
      index: index
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reload();
      }
    });
  }

  reload() {
    this.refreshEvent.emit();
  }
}
