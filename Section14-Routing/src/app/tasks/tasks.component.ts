import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  userid = input.required();
  order = input<'asc' | 'desc'>('asc');
  tasksService = inject(TasksService);
  userTasks = computed(() =>
    this.tasksService
      .allTasks()
      .filter((task) => task.userId === this.userid())
      .sort((a, b) => {
        if (this.order() === 'asc') {
          return a.id < b.id ? -1 : 1;
        } else {
          return a.id > b.id ? -1 : 1;
        }
      })
  );
}