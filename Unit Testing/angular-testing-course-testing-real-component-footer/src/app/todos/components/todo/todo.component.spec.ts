import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { TodosService } from '../../services/todos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';

describe('Todo Component', () => {
  let componentFixture: ComponentFixture<TodoComponent>;
  let todoComponent: TodoComponent;
  let todoService: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoComponent, HttpClientTestingModule],
    }).compileComponents();

    todoService = TestBed.inject(TodosService);
    componentFixture = TestBed.createComponent(TodoComponent);
    todoComponent = componentFixture.componentInstance;
    todoComponent.todo = { id: '1231', text: 'foo', isCompleted: false };
    todoComponent.isEditing = false;
    componentFixture.detectChanges();
  });

  it('should create component', () => {
    expect(todoComponent).toBeTruthy();
  });

  it('should show component successfully', () => {
    let label = componentFixture.debugElement.query(
      By.css('[data-testid="label"]')
    );
    let todo = componentFixture.debugElement.query(
      By.css('[data-testid="todo"]')
    );
    let edit = componentFixture.debugElement.query(
      By.css('[data-testid="edit"]')
    );
    expect(todo.classes['completed']).toBeUndefined();
    expect(label.nativeElement.textContent).toEqual('foo');
    expect(edit).toBeFalsy();
  });

  it('should toggle todo completed', () => {
    jest.spyOn(todoService, 'toggleTodo').mockImplementation(() => {});
    let completedCheckBox = componentFixture.debugElement.query(
      By.css('[data-testid="toggle"]')
    );

    let todoListItem: ElementRef<HTMLDListElement> =
      componentFixture.debugElement.query(By.css('[data-testid="todo"]'));

    completedCheckBox.nativeElement.click();
    componentFixture.detectChanges();
    expect(todoService.toggleTodo).toHaveBeenCalledWith('1231');
  });
});
