import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Task, User } from '../../core/interfaces/user';
import { ConfirmationDialogComponent } from '../../shared/components/dialogs/confirmation/confirmation-dialog.component';
import { TasksDialogComponent } from '../../shared/components/dialogs/tasks/tasks-dialog.component';
import { UserService } from '../../core/services/user.service';
import { filter } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule],
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

  openTasksDialog(taskName: string, index: number): void {
    const dialogData = {
      taskName: taskName,
    };

    const dialogRef = this.dialog.open(TasksDialogComponent, {
      data: dialogData,
    });

    dialogRef
      .afterClosed()
      .pipe(filter((taskName: string) => !!taskName))
      .subscribe((taskName: string) => {
        this.user.tasks[index].name = taskName;
        this.userService.saveUser(this.user);
        this.user = this.userService.getUser();
        this.toastr.success('Task updated', 'Task', {
          positionClass: 'toast-top-center',
          toastClass: 'ngx-toastr custom',
        });
      });
  }

  addTask(): void {
    const task: Task = { name: 'New Task', subtasks: [] };
    this.user.tasks.push(task);
    this.userService.saveUser(this.user);
    this.user = this.userService.getUser();
    this.toastr.success('Task added', 'Task', {
      positionClass: 'toast-top-center',
      toastClass: 'ngx-toastr custom',
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
      .pipe(filter((res: boolean) => !!res))
      .subscribe(() => {
        this.user.tasks.splice(index, 1);
        this.userService.saveUser(this.user);
        this.user = this.userService.getUser();
        this.toastr.success('Task deleted', 'Task', {
          positionClass: 'toast-top-center',
          toastClass: 'ngx-toastr custom',
        });
      });
  }
}
