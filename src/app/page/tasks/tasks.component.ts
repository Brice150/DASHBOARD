import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../core/interfaces/user';
import { ConfirmationDialogComponent } from '../../shared/components/dialogs/confirmation/confirmation-dialog.component';
import { TasksDialogComponent } from '../../shared/components/dialogs/tasks/tasks-dialog.component';
import { UserService } from '../../core/services/user.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  @Input() user!: User;

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  openTasksDialog(index?: number): void {
    const dialogData = {
      user: this.user,
      index: index,
    };

    const dialogRef = this.dialog.open(TasksDialogComponent, {
      data: dialogData,
    });

    dialogRef
      .afterClosed()
      .pipe(filter((user: User) => !!user))
      .subscribe((user: User) => {
        this.userService.saveUser(user);
        this.user = this.userService.getUser();
        this.toastr.success('Task added/updated', 'Task', {
          positionClass: 'toast-top-center',
          toastClass: 'ngx-toastr custom',
        });
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

    dialogRef
      .afterClosed()
      .pipe(filter((user: User) => !!user))
      .subscribe((user: User) => {
        this.userService.saveUser(user);
        this.user = this.userService.getUser();
        this.toastr.success('Task deleted', 'Task', {
          positionClass: 'toast-top-center',
          toastClass: 'ngx-toastr custom',
        });
      });
  }
}
