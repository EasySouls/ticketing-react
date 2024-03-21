import { Ticket } from '@/types';
import { Link } from '@tanstack/react-router';
import TicketStatus from './TicketStatus';

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
      <h3>{ticket.name}</h3>
      <hr className="h-[2px] bg-black" />
      <p className="my-1">{ticket.description}</p>
      <TicketStatus ticketStatus={ticket.phase} />
    </Link>
  );
}
