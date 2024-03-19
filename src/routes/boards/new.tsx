import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateBoardMutation } from '@/lib/hooks/boardMutationHooks';
import { createFileRoute } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/boards/new')({
  component: NewBoardPage,
});

function NewBoardPage() {
  const createBoardMutation = useCreateBoardMutation();
  const navigate = useNavigate();

  return (
    <main className="flex flex-col gap-4 items-center min-h-screen bg-slate-100">
      <h1 className="mt-4">Create New Board</h1>
      <form
        className="flex flex-col gap-2 p-4"
        onSubmit={(event) => {
          event.preventDefault();
          createBoardMutation.mutate(
            {
              title: new FormData(event.currentTarget).get('title') as string,
            },
            {
              // TODO - Navigate to the newly created board
              onSuccess: () => navigate({ to: '/boards' }),
            },
          );
        }}
      >
        <Input type="text" name="title" />
        <Button type="submit">Create</Button>
      </form>
    </main>
  );
}