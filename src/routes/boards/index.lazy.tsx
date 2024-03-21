import { createLazyFileRoute, Link } from '@tanstack/react-router';
import BoardItem from '../../components/BoardItem';
import { useFetchBoardsQuery } from '@/lib/hooks/boardQueryHooks';
import { Button } from '@/components/ui/button';

export const Route = createLazyFileRoute('/boards/')({
  component: BoardsPage,
});

function BoardsPage() {
  const { data: boards, error, isPending } = useFetchBoardsQuery();

  return (
    <main className="flex flex-col gap-4 items-center justify-center min-h-screen bg-slate-100">
      <h1 className="mt-4">Boards</h1>
      <Button asChild className="text-white">
        <Link to="/boards/new">Create New</Link>
      </Button>
      <div className="grid grid-cols-2 gap-2 p-4">
        {isPending && <p>Loading</p>}

        {error && (
          <p>Error happened while retrieving boards. Try reloading th page</p>
        )}

        {/* TODO - Add loading skeletons */}
        {boards &&
          boards.map((board) => {
            return <BoardItem key={board.id} board={board} />;
          })}
      </div>
    </main>
  );
}
