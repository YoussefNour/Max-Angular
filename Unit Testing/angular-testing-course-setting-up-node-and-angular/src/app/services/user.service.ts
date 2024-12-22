import { inject, Injectable } from '@angular/core';
import { UtilsService } from '../shared/utils.service';

export interface User {
  id: string;
  name: string;
  age: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  utils = inject(UtilsService);
  users: User[] = [];

  addUser(user: User): void {
    this.users = [...this.users, user];
  }

  removeUser(userId: string): void {
    const updatedUsers = this.users.filter((user) => user.id != userId);
    this.users = updatedUsers;
  }

  getUserNames(): string[] {
    return this.utils.pluck(this.users, 'name');
  }
}
