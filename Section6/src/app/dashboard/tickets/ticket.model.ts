export interface Ticket {
  id: string;
  title: string;
  requestText: string;
  status: 'open' | 'closed';
}
