import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/core/interfaces/task';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-tasks-dialog',
  templateUrl: './tasks-dialog.component.html',
  styleUrls: ['./tasks-dialog.component.css'],
})
export class TasksDialogComponent implements OnInit {
  user!: User;
  title!: string;
  description!: string;
  modifyMode: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<TasksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.modifyMode = this.data.index || this.data.index === 0;
    this.user = this.data.user;

    if (this.modifyMode) {
      this.title = this.user.tasks[this.data.index].title;
      this.description = this.user.tasks[this.data.index].description;
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  validate() {
    if (this.title) {
      if (this.modifyMode) {
        this.user.tasks[this.data.index].title = this.title;
        this.user.tasks[this.data.index].description = this.description;
      } else {
        const newTask: Task = {
          title: this.title,
          description: this.description,
          date: new Date(),
        };
        this.user.tasks.push(newTask);
      }

      localStorage.setItem('userDashboard', JSON.stringify(this.user));
      this.dialogRef.close(true);
    } else {
      this.toastr.error('Title is empty', 'Task', {
        positionClass: 'toast-top-center',
      });
    }
  }
}
