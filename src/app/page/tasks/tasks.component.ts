import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
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
    public dialog: MatDialog,
    private toastr: ToastrService
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
        this.toastr.success('Task added/updated', 'Task', {
          positionClass: 'toast-top-center' 
        });
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
        this.toastr.success('Task deleted', 'Task', {
          positionClass: 'toast-top-center' 
        });
      }
    });
  }

  reload() {
    this.refreshEvent.emit();
  }
}
