import { Ticket } from '@/types';
import { Link } from '@tanstack/react-router';
import TicketStatus from './TicketStatus';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';

interface TicketProps {
  ticket: Ticket;
}

export default function TicketCard({ ticket }: TicketProps) {
  return (
    <Card className="dark:bg-slate-700">
      <CardHeader>
        <h3 className="text-lg">{ticket.name}</h3>
      </CardHeader>
      <CardContent>
        <p className="">{ticket.description}</p>
        <TicketStatus ticketStatus={ticket.phase} />
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link
            to="/tickets/$ticketId"
            params={{ ticketId: String(ticket.id) }}
            className="p-4 rounded-lg shadow-md"
          >
            See ticket
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
