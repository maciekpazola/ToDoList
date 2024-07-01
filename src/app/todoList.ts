import { Task } from "./task";

export interface TodoList {
    title: string;
    tasks: Task[];
    index: number;
  }