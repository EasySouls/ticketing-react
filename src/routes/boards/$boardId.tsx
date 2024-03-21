import { useFetchBoardByIdQuery } from '@/lib/hooks/boardQueryHooks';
import { useTicketsByBoardIdQuery } from '@/lib/hooks/ticketQueryHooks';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/boards/$boardId')({
  component: BoardDetailsPage,
});

function BoardDetailsPage() {
  const { boardId } = Route.useParams();
  const { data: board, error: boardError } = useFetchBoardByIdQuery(
    Number(boardId),
  );
  const ticketQuery = useTicketsByBoardIdQuery(boardId);

  if (!board) {
    return <div>Loading...</div>;
  }

  if (boardError) {
    return <div>Error: {boardError.message}</div>;
  }

  return (
    <main className="flex flex-col gap-4  min-h-screen bg-slate-100 p-4">
      <h1 className="mt-4">{board?.title}</h1>
      <div className="">
        <div>
          <h2>{board.title}</h2>
          <p>{new Date(board.createdAt).toDateString()}</p>
        </div>

        <h2>Tickets</h2>
        <div className="grid grid-cols-3 gap-4">
          {ticketQuery.data?.map((ticket) => (
            <div key={ticket.id} className="p-4 bg-white rounded-lg shadow-md">
              <h3>{ticket.title}</h3>
              <p>{ticket.phase}</p>
              <p>{ticket.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
