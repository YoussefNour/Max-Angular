import { Injectable } from '@angular/core';
import { Task } from '../task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks: Task[] = [];
  constructor() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }

  getUserTasks(userId: string): Task[] {
    return this.tasks.filter((task) => task.userId === userId);
  }

  addTask(task: Task): void {
    this.tasks.unshift(task);
    this.saveTasks();
  }

  removeTask(taskId: string): void {
    let index = this.tasks.findIndex((task) => task.id === taskId);
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
