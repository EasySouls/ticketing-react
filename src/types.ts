export interface Board {
  id: number;
  title: string;
  createdAt: string;
}

export interface CreateBoard {
  title: string;
}

export enum TicketPhase {
  CREATED = 'CREATED',
  IN_PROGRESS = 'IN_PROGRESS',
  UNDER_REVIEW = 'UNDER_REVIEW',
  CLOSED = 'CLOSED',
}

export interface Ticket {
  id: number;
  name: string;
  description: string;
  phase: TicketPhase;
  boardId: number;
  createdAt: string;
}

export interface CreateTicket {
  name: string;
  description: string;
}
