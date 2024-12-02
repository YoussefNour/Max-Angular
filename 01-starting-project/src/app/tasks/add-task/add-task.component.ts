import {
  Component,
  EventEmitter,
  inject,
  Input,
  output,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../task.model';
import { TasksService } from '../task/tasks.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  private _taskService = inject(TasksService);
  @Input({ required: true }) userId!: string;
  @Output() closeAddTask = new EventEmitter();
  title = '';
  summary = '';
  dueDate = '';

  onSubmit() {
    this._taskService.addTask({
      id: 'u' + Math.random() * 1000,
      userId: this.userId,
      title: this.title,
      summary: this.summary,
      dueDate: this.dueDate,
    });
    this.closeAddTask.emit();
  }

  onClose() {
    this.closeAddTask.emit();
  }
}
