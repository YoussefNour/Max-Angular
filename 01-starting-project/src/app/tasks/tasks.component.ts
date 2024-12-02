import { Component, inject, Input } from '@angular/core';
import { User } from '../user/user.model';
import { TaskComponent } from './task/task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TasksService } from './task/tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, AddTaskComponent],
  providers: [TasksService],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  addTaskAction = false;
  private _taskService = inject(TasksService);
  @Input({ required: true }) user!: User;

  get selectedUserTasks() {
    return this._taskService.getUserTasks(this.user.id);
  }

  toggleAddTask() {
    this.addTaskAction = !this.addTaskAction;
  }
}
