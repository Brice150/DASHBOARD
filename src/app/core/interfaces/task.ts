import { TaskState } from '../enums/task-state.enum';

export interface MainTask {
  name: string;
  state: TaskState;
  startDate?: Date;
  endDate?: Date;
  tasks: Task[];
}

export interface Task {
  name: string;
  state: TaskState;
  startDate?: Date;
  endDate?: Date;
}
