import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

// @Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = signal<Task[]>([]);
  private loggingService = inject(LoggingService);
  allTasks = this.tasks.asReadonly();

  addTask(taskData: { title: string; description: string }) {
    let newTask: Task = {
      id: (Math.random() * 1000).toFixed(0).toString(),
      ...taskData,
      status: 'OPEN',
    };
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
    this.loggingService.log('Added a new Task ' + taskData.title);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) => {
      return oldTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );
    });
    this.loggingService.log('Changed Task Status to ' + newStatus);
  }
}
