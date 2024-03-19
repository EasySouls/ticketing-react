import { useFetchBoardByIdQuery } from '@/lib/hooks/boardQueryHooks';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/boards/$boardId')({
  component: BoardDetailsPage,
});

function BoardDetailsPage() {
  const { boardId } = Route.useParams();
  const { data: board } = useFetchBoardByIdQuery(Number(boardId));

  return (
    <main className="flex flex-col gap-4 items-center justify-center min-h-screen bg-slate-100">
      <h1 className="mt-4">Board Details</h1>
      <div className="p-4">
        {board && (
          <div>
            <h2>{board.title}</h2>
            <p>{new Date(board.createdAt).toDateString()}</p>
          </div>
        )}
      </div>
    </main>
  );
}
