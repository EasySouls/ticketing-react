import { CreateTicket, TicketPhase } from '@/types';
import { useMutation } from '@tanstack/react-query';
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
  return useMutation({
    mutationKey: ['tickets', boardId],
    mutationFn: ({ ticket }: { ticket: CreateTicket }) =>
      createTicket(boardId, ticket),
  });
};
