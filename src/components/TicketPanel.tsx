import { Ticket } from '@/types';
import { Link } from '@tanstack/react-router';

interface TicketProps {
  ticket: Ticket;
}

export default function TicketPanel({ ticket }: TicketProps) {
  return (
    <Link
      to="/tickets/$ticketId"
      params={{ ticketId: String(ticket.id) }}
      className="p-4 bg-white rounded-lg shadow-md"
    >
      <h2>{ticket.title}</h2>
      <p>{ticket.phase}</p>
      <p>{ticket.description}</p>
    </Link>
  );
}
