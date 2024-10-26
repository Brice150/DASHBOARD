export enum TaskState {
  IN_PROGRESS = 'In progress',
  TODO = 'Todo',
  DONE = 'Done',
  BLOCKED = 'Blocked',
}

export const StateColor = new Map<TaskState, string>([
  [TaskState.IN_PROGRESS, '#ffe700'],
  [TaskState.TODO, '#006aff'],
  [TaskState.DONE, '#45d606'],
  [TaskState.BLOCKED, 'red'],
]);
