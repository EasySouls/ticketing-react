import { CreateTicket, TicketPhase } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

async function createTicket(boardId: number, ticket: CreateTicket) {
  const newTicket = {
    name: ticket.name,
    description: ticket.description,
    phase: TicketPhase.CREATED,
    boardId: boardId,
  };
  const res = await axios.post(`/tickets`, newTicket);
  console.log(res.data);
  return res.data;
}

export const useCreateTicketMutation = (boardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['tickets', boardId],
    mutationFn: ({ ticket }: { ticket: CreateTicket }) =>
      createTicket(boardId, ticket),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets', boardId] });
    },
  });
};
