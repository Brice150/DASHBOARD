import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { TaskState } from '../core/enums/task-state.enum';
import { MainTask } from '../core/interfaces/task';
import { User } from '../core/interfaces/user';
import { UserService } from '../core/services/user.service';
import { HeaderComponent } from '../header/header.component';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TaskComponent, MatExpansionModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  user: User = {} as User;
  animateProgressBarArray: boolean[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.animateProgressBarArray = new Array(this.user.mainTasks.length).fill(
      true
    );
  }

  saveTasks(indexMainTask?: number): void {
    this.userService.saveUserMainTasks(this.user.mainTasks);
    if (indexMainTask !== undefined) {
      this.triggerAnimation(indexMainTask);
    }
  }

  countDoneTasksNumber(mainTasks: MainTask[]): number {
    let count: number = 0;

    for (const mainTask of mainTasks) {
      if (mainTask.state === TaskState.DONE) {
        count++;
      }
      for (const task of mainTask.tasks) {
        if (task.state === TaskState.DONE) {
          count++;
        }
      }
    }

    return count;
  }

  addMainTask(): void {
    this.user.mainTasks.push({
      name: 'Main Task',
      state: TaskState.TODO,
      tasks: [],
    });
    this.animateProgressBarArray.push(true);
    this.saveTasks(this.animateProgressBarArray.length - 1);
  }

  addTask(indexMainTask: number): void {
    this.user.mainTasks[indexMainTask].tasks.push({
      name: 'Task',
      state: TaskState.TODO,
    });
    this.saveTasks(indexMainTask);
  }

  deleteMainTask(indexMainTask: number): void {
    this.user.mainTasks.splice(indexMainTask, 1);
    this.saveTasks();
  }

  deleteTask(indexMainTask: number, indexTask: number): void {
    this.user.mainTasks[indexMainTask].tasks.splice(indexTask, 1);
    this.saveTasks(indexMainTask);
  }

  triggerAnimation(indexMainTask: number): void {
    this.animateProgressBarArray[indexMainTask] = false;
    setTimeout(() => {
      this.animateProgressBarArray[indexMainTask] = true;
    }, 50);
  }
}
