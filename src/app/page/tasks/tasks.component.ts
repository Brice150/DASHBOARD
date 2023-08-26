import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/core/interface/task';
import { ConfirmationDialogComponent } from 'src/app/shared/components/dialogs/confirmation/confirmation-dialog.component';
import { TasksDialogComponent } from 'src/app/shared/components/dialogs/tasks/tasks-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{
  tasks: Task[] = [];

  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    for (let index = 0; index < 4; index++) {
      const task: Task = {
        'title': 'title' + index,
        'description': 'description' + index,
        'date': new Date()
      }
      this.tasks.push(task);
    }
  }

  openTasksDialog(task?: Task) {
    const dialogData = {
      task: task
    };

    const dialogRef = this.dialog.open(TasksDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addTask();
      }
    });
  }

  addTask() {
    //TODO
  }

  openConfirmationDialog(task: Task) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask(task);
      }
    });
  }

  deleteTask(task: Task) {
    //TODO
  }
}
