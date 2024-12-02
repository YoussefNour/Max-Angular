import { Route } from '@angular/router';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksComponent } from './tasks.component';

export const routes: Route[] = [
  { path: '', redirectTo: 'tasks', pathMatch: 'prefix' },
  { path: 'tasks', component: TasksComponent },
  { path: 'tasks/new', component: NewTaskComponent },
];
