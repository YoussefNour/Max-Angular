import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { TodosService } from '../../services/todos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('Header Component', () => {
  let header: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let todoService: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent, HttpClientTestingModule],
    }).compileComponents();

    todoService = TestBed.inject(TodosService);

    fixture = TestBed.createComponent(HeaderComponent);
    header = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create our component', () => {
    expect(header).toBeTruthy();
  });

  it('should add a todo', () => {
    jest.spyOn(todoService, 'addTodo').mockImplementation(() => {});
    const input = fixture.debugElement.query(
      By.css('[data-testid="newTodoInput"]')
    );
    input.nativeElement.value = 'foo';
    input.nativeElement.dispatchEvent(
      new KeyboardEvent('keyup', { key: 'Enter' })
    );
    expect(todoService.addTodo).toHaveBeenCalledWith('foo');
  });
});
