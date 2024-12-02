import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveTitleFunction,
  resolveUserNameFunction,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routes as TasksRoutes } from './tasks/tasks.routes';

const dummyCanMatch: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  return false;
};

export const routes: Route[] = [
  { path: '', component: NoTaskComponent },
  {
    path: 'users/:userid',
    component: UserTasksComponent,
    children: TasksRoutes,
    canMatch: [dummyCanMatch],
    data: {
      message: 'hello',
    },
    resolve: {
      userName: resolveUserNameFunction,
    },
    title: resolveTitleFunction,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
