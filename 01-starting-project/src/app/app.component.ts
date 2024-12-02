import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { DUMMY_USERS } from './dummy-users';
import { User } from './user/user.model';
import { TasksComponent } from './tasks/tasks.component';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { CardComponent } from './shared/card/card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    UserComponent,
    TasksComponent,
    AddTaskComponent,
    CardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  users = DUMMY_USERS;
  selectedUserId?: string;

  get selectedUser(): User {
    return this.users.find((u) => u.id === this.selectedUserId)!;
  }

  onSelectUser(id: string) {
    this.selectedUserId = id;
  }
}
