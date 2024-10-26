import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MainTask, Task } from '../../core/interfaces/task';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TaskState, StateColor } from '../../core/enums/task-state.enum';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatChipsModule,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit, OnChanges {
  @Input() task: Task | MainTask = {} as MainTask;
  @Input() canBeModified: boolean = false;
  @Input() animateProgressBar: boolean = false;
  modifyMode: boolean = false;
  states = Object.values(TaskState);
  isMainTask: boolean = false;
  progress: number = 0;
  @Output() deleteTaskEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() saveTasksEvent: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    this.isMainTask = (this.task as MainTask).tasks !== undefined;
    if (this.isMainTask && (this.task as MainTask).tasks.length !== 0) {
      this.calculateMainProgress();
    } else {
      this.calculateProgress();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.isMainTask &&
      this.canBeModified &&
      changes['animateProgressBar'] &&
      !changes['animateProgressBar'].firstChange &&
      changes['animateProgressBar'].currentValue
    ) {
      this.ngOnInit();
    }
  }

  calculateProgress(): void {
    if (this.task.state === TaskState.DONE) {
      this.progress = 100;
    } else if (this.task.state === TaskState.IN_PROGRESS) {
      this.progress = 50;
    } else {
      this.progress = 0;
    }
  }

  calculateMainProgress(): void {
    const doneTasksNumber: number = (this.task as MainTask).tasks.filter(
      (task: Task) => task.state === TaskState.DONE
    ).length;
    this.progress =
      (doneTasksNumber / (this.task as MainTask).tasks.length) * 100;
  }

  getColor(state: TaskState): string {
    return StateColor.get(state) || '#000000';
  }

  deleteTask(): void {
    this.deleteTaskEvent.emit();
  }

  toggleModifyMode(): void {
    if (this.modifyMode) {
      this.saveTasksEvent.emit();
    }
    this.modifyMode = !this.modifyMode;
  }
}
