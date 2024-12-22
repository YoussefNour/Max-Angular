import { TestBed } from '@angular/core/testing';

import { User, UserService } from './user.service';
import { UtilsService } from '../shared/utils.service';

describe('UserService', () => {
  let userService: UserService;
  let utilsService: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService, UtilsService],
    });
    userService = TestBed.inject(UserService);
    utilsService = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should add user', () => {
    let user: User = {
      id: '1',
      name: 'Youssef',
      age: 26,
    };
    userService.addUser(user);
    expect(userService.users).toEqual([
      {
        id: '1',
        name: 'Youssef',
        age: 26,
      },
    ]);
  });

  it('should get usernames', () => {
    jest.spyOn(utilsService, 'pluck');
    userService.users = [{ id: '2', name: 'Youssef', age: 26 }];
    userService.getUserNames();
    expect(utilsService.pluck).toHaveBeenCalledWith(userService.users, 'name');
  });
});
