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
    <main className="flex flex-col gap-4 items-center min-h-screen">
      <h1 className="mt-8 text-3xl">Create New Board</h1>
      <form
        className="flex flex-col gap-4 mt-4"
        onSubmit={(event) => {
          event.preventDefault();
          createBoardMutation.mutate(
            {
              title: new FormData(event.currentTarget).get('title') as string,
            },
            {
              onSuccess: (variables) =>
                navigate({
                  to: `/boards/$boardId`,
                  params: { boardId: variables.id },
                }),
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
