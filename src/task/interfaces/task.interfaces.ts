export enum TaskStatus {
  incomplete,
  progress,
  complete,
}

export enum TaskCategory {
  work,
  personal,
  shopping,
}

export enum TaskPriority {
  high,
  medium,
  low,
}

export type StatusType = 'complete' | 'incomplete' | 'progress';
export type CategoryType = 'work' | 'personal' | 'shopping';
export type PriorityTpe = 'low' | 'medium' | 'high';
export type QueryKeys = 'status' | 'category' | 'priority';
export interface IQueryList {
  status: StatusType;
  category: CategoryType;
  priority: PriorityTpe;
}

export interface TaskMailPayload {
  username: string;
  email: string;
  task_name: string;
  due_date: Date;
}
