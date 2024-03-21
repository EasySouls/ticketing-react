import { useCreateTicketMutation } from '@/lib/hooks/ticketMutationHooks';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from './ui/dialog';
import { useState } from 'react';

export default function CreateTicketDialog({ boardId }: { boardId: number }) {
  const createTicketMutation = useCreateTicketMutation(boardId);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Ticket</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Create Ticket</DialogHeader>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Ticket Name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </div>
        <DialogFooter>
          {/* TODO - Add feedback, like a toast message */}
          <Button
            value="primary"
            onClick={() => {
              console.log('Creating ticket');
              createTicketMutation.mutate({
                ticket: {
                  name: name,
                  description: description,
                },
              });
            }}
          >
            Create
          </Button>
          <DialogClose asChild>
            <Button variant="destructive">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
