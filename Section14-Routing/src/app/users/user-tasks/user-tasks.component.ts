import { Component, computed, inject, input } from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  userid = input.required<string>();
  usersService = inject(UsersService);
  message = input.required<string>();
  // when using resolver
  userName = input.required<string>();

  // userName = computed(() => {
  //   return this.usersService.users.find((user) => user.id === this.userid())
  //     ?.name;
  // });
}

export const resolveUserNameFunction: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routeState: RouterStateSnapshot
) => {
  const userService = inject(UsersService);
  const userName =
    userService.users.find(
      (user) => user.id === activatedRoute.paramMap.get('userid')
    )?.name || '';
  return userName;
};

export const resolveTitleFunction: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routeState: RouterStateSnapshot
) => {
  return resolveUserNameFunction(activatedRoute, routeState) + "'s tasks";
};
