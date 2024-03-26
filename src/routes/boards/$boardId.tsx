import CreateTicketDialog from '@/components/CreateTicketDialog';
import TicketCard from '@/components/TicketCard';
import { boardQueryOptions } from '@/lib/hooks/boardQueryHooks';
import { ticketQueryOptions } from '@/lib/hooks/ticketQueryHooks';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/boards/$boardId')({
  component: BoardDetailsPage,
});

function BoardDetailsPage() {
  const { boardId } = Route.useParams();
  const { data: board, error: boardError } = useQuery(
    boardQueryOptions(Number(boardId)),
  );
  const ticketQuery = useQuery(ticketQueryOptions(Number(boardId)));

  if (!board) {
    return <div>Loading...</div>;
  }

  if (boardError) {
    return <div>Error: {boardError.message}</div>;
  }

  return (
    <main className="flex flex-col gap-4  min-h-screen p-4">
      <h1 className="mt-4">{board?.title}</h1>
      <div className="">
        <div>
          <h2>{board.title}</h2>
          <p>{new Date(board.createdAt).toDateString()}</p>
        </div>

        <h2 className="mb-4">Tickets</h2>

        {/* Create New Ticket Dialog */}
        <CreateTicketDialog boardId={board.id} />

        <div className="mt-4 grid grid-cols-3 gap-4">
          {ticketQuery.isError && (
            <div>Error loading tickets: {ticketQuery.error?.message}</div>
          )}
          {ticketQuery.data &&
            ticketQuery.data.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
        </div>
      </div>
    </main>
  );
}
