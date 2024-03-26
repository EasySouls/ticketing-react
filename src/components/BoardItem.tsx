import { useOpenTicketsCountQuery } from '../lib/hooks/ticketQueryHooks';
import { Board } from '../types';
import { Link } from '@tanstack/react-router';

interface BoardItemProps {
  board: Board;
}

const BoardItem = ({ board }: BoardItemProps) => {
  const { title, createdAt } = board;

  const { data: openTicketsCount } = useOpenTicketsCountQuery(board.id);

  return (
    <Link
      to={`/boards/$boardId`}
      params={{ boardId: String(board.id) }}
      className="border border-black rounded-md p-2 dark:bg-slate-800"
    >
      <h3 className="text-lg">{title}</h3>
      <p>Open tickets: {openTicketsCount}</p>
      <p>
        Created:{' '}
        <span className="text-slate-500">
          {new Date(createdAt).toLocaleString()}
        </span>
      </p>
    </Link>
  );
};

export default BoardItem;
