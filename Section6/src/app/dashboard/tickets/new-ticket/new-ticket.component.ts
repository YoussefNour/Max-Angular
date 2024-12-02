import {
  Component,
  ElementRef,
  EventEmitter,
  output,
  Output,
  viewChild,
  ViewChild,
} from '@angular/core';
import { ControlComponent } from '../../../shared/control/control.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormsModule } from '@angular/forms';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ControlComponent, ButtonComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent {
  // @ViewChild('form') private form?: ElementRef<HTMLFormElement>;
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');
  // @Output('addTicket') add = new EventEmitter();
  add = output<{ title: string; requestText: string }>();

  submit(title: string, requestInfo: string) {
    console.log(title, requestInfo);
    this.form().nativeElement.reset();
    this.add.emit({ title: title, requestText: requestInfo });
  }
}
