export interface Board {
  id: number;
  title: string;
  createdAt: string;
}

export interface CreateBoard {
  title: string;
}

export enum TicketPhase {
  CREATED,
  IN_PROGRESS,
  UNDER_REVIEW,
  CLOSED,
}

export interface Ticket {
  id: number;
  title: string;
  description: string;
  phase: TicketPhase;
  boardId: number;
  createdAt: string;
}
