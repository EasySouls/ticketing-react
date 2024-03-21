import { useTicketByIdQuery } from '@/lib/hooks/ticketQueryHooks';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/tickets/$ticketId')({
  component: TicketDetailsPage,
});

function TicketDetailsPage() {
  const { ticketId } = Route.useParams();
  const { data: ticket, error: ticketError } = useTicketByIdQuery(
    Number(ticketId),
  );

  if (ticketError) {
    return <div>Error: {ticketError.message}</div>;
  }

  return (
    <main className="flex flex-col gap-4  min-h-screen bg-slate-100 p-4">
      <h1 className="mt-4">{ticket?.title}</h1>
      <div className="p-4">
        {ticket && (
          <div>
            <h2>{ticket.title}</h2>
            <p>{ticket.description}</p>
            <p>{ticket.phase}</p>
          </div>
        )}
      </div>
    </main>
  );
}
