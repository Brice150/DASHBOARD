import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../core/interfaces/user';
import { TasksDialogComponent } from '../../shared/components/dialogs/tasks/tasks-dialog.component';
import { ConfirmationDialogComponent } from '../../shared/components/dialogs/confirmation/confirmation-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  @Input() user!: User;

  constructor(public dialog: MatDialog, private toastr: ToastrService) {}

  openTasksDialog(index?: number): void {
    const dialogData = {
      user: this.user,
      index: index,
    };

    const dialogRef = this.dialog.open(TasksDialogComponent, {
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.toastr.success('Task added/updated', 'Task', {
          positionClass: 'toast-top-center',
        });
      }
    });
  }

  openConfirmationDialog(index: number): void {
    const dialogData = {
      user: this.user,
      index: index,
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.toastr.success('Task deleted', 'Task', {
          positionClass: 'toast-top-center',
        });
      }
    });
  }
}
