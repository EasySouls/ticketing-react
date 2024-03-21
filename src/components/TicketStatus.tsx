import { TicketPhase } from '@/types';

export default function TicketStatus({
  ticketStatus: ticketPhase,
}: {
  ticketStatus: TicketPhase;
}) {
  return (
    <div
      className={`px-2 py-1 text-white rounded-md ${
        ticketPhase === TicketPhase.CREATED
          ? 'bg-blue-500'
          : ticketPhase === TicketPhase.IN_PROGRESS
            ? 'bg-yellow-500'
            : ticketPhase === TicketPhase.UNDER_REVIEW
              ? 'bg-green-500'
              : ticketPhase === TicketPhase.CLOSED
                ? 'bg-gray-500'
                : ''
      }`}
    >
      {ticketPhase}
    </div>
  );
}
