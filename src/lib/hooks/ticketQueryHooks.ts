import { Ticket, TicketPhase } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

async function getTicketById(ticketId: number): Promise<Ticket> {
  const res = await axios.get(`/tickets/${ticketId}`);
  return res.data;
}

export const useTicketByIdQuery = (ticketId: number) => {
  return useQuery({
    queryKey: ['tickets', ticketId],
    queryFn: () => getTicketById(ticketId),
  });
};

async function getTicketsByBoardId(boardId: number): Promise<Ticket[]> {
  const res = await axios.get<Ticket[]>('/tickets');
  const tickets = res.data;
  return tickets.filter((ticket) => ticket.boardId === Number(boardId));
}

export const useTicketsByBoardIdQuery = (boardId: number) => {
  return useQuery({
    queryKey: ['tickets', boardId],
    queryFn: () => getTicketsByBoardId(Number(boardId)),
  });
};

async function getTicketsCountByPhase(
  boardId: number,
  ticketPhase: TicketPhase,
): Promise<number> {
  const res = await axios.get<Ticket[]>('/tickets');
  const tickets = res.data;
  return tickets.filter(
    (ticket) =>
      ticket.boardId === Number(boardId) && ticket.phase == ticketPhase,
  ).length;
}

export const useTicketsCountByPhaseQuery = (
  boardId: number,
  ticketPhase: TicketPhase,
) => {
  return useQuery({
    queryKey: ['tickets', boardId, { phase: ticketPhase }],
    queryFn: () => getTicketsCountByPhase(Number(boardId), ticketPhase),
  });
};

async function getOpenTicketsCount(boardId: number): Promise<number> {
  const res = await axios.get<Ticket[]>('/tickets');
  const tickets = res.data;
  return tickets.filter(
    (ticket) =>
      ticket.boardId === Number(boardId) &&
      (ticket.phase == TicketPhase.CREATED ||
        ticket.phase == TicketPhase.IN_PROGRESS),
  ).length;
}

export const useOpenTicketsCountQuery = (boardId: number) => {
  return useQuery({
    queryKey: ['tickets', boardId],
    queryFn: () => getOpenTicketsCount(boardId),
  });
};
