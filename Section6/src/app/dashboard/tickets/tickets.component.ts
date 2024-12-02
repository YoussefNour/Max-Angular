import { Ticket } from './ticket.model';
import { Component } from '@angular/core';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { TicketComponent } from './ticket/ticket.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NewTicketComponent, TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
})
export class TicketsComponent {
  tickets: Ticket[] = [];

  onAddTicket(event: { title: string; requestText: string }) {
    let newTicket: Ticket = {
      id: `T${Math.random() * 1000}`,
      title: event.title,
      requestText: event.requestText,
      status: 'open',
    };
    this.tickets.push(newTicket);
  }

  onCloseTicket(id: string) {
    let ticket = this.tickets.find((ticket) => ticket.id === id);
    ticket!.status = 'closed';
  }
}
