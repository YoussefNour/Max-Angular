import { Component, input, output, signal } from '@angular/core';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  data = input.required<Ticket>();
  collapsed = signal(false);
  closeTicket = output<void>();

  onToggleDetails() {
    // this.collapsed.set(!this.collapsed());
    this.collapsed.update((wasVisible) => !wasVisible);
  }

  onCloseTicket() {
    this.closeTicket.emit();
  }
}
