import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { TodosService } from '../../services/todos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoInterface } from '../../types/todo.interface';
import { By } from '@angular/platform-browser';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-todos-todo',
  standalone: true,
  template: '',
})
class MockTodoComponent {
  // must add all component inputs and outputs
  @Input({ required: true }) todo!: TodoInterface;
  @Input({ required: true }) isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();
}

describe('main component', () => {
  let componentFixture: ComponentFixture<MainComponent>;
  let component: MainComponent;
  let todoService: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MainComponent, HttpClientTestingModule],
    })
      .overrideComponent(MainComponent, {
        remove: { imports: [TodoComponent] },
        add: { imports: [MockTodoComponent] },
      })
      .compileComponents();

    todoService = TestBed.inject(TodosService);

    componentFixture = TestBed.createComponent(MainComponent);
    component = componentFixture.componentInstance;
    componentFixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should be hidden on no todos', () => {
    let mainComp = componentFixture.debugElement.query(
      By.css("[data-testid='main']")
    );

    expect(mainComp.classes['hidden']).toBe(true);
  });

  it('should show todos', () => {
    let mainComp = componentFixture.debugElement.query(
      By.css("[data-testid='main']")
    );
    let todoList: TodoInterface[] = [
      {
        id: '123',
        isCompleted: false,
        text: 'make tea',
      },
    ];
    todoService.todosSig.set(todoList);
    componentFixture.detectChanges();

    let todos = componentFixture.debugElement.queryAll(
      By.css('[data-testid="todo"]')
    );

    expect(mainComp.classes['hidden']).not.toBe(true);

    expect(todos[0].componentInstance.todo).toEqual(todoList[0]);
  });
});
