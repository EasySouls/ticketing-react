import { useState } from 'react';
import { Board } from './types';
import { Button } from './components/ui/button';
import {
  useDeleteBoardMutation,
  useUpdateBoardTitleMutation,
} from './lib/hooks/boardMutationHooks';
import { Link } from '@tanstack/react-router';

interface BoardItemProps {
  board: Board;
}

const BoardItem = ({ board }: BoardItemProps) => {
  const deleteBoardMutation = useDeleteBoardMutation(board.id);
  const updateBoardTitleMutation = useUpdateBoardTitleMutation(board.id);

  const [isEditing, setIsEditing] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');

  const { id, title, createdAt } = board;

  async function handleClick() {
    if (isEditing) {
      updateBoardTitleMutation.mutate(newBoardTitle);
    }

    setIsEditing((prev) => !prev);
  }

  return (
    <Link
      to={`/boards/$boardId`}
      params={{ boardId: String(board.id) }}
      className="border border-black rounded-md p-2"
    >
      <p>Id: {id}</p>
      {isEditing ? (
        <input
          defaultValue={title}
          onChange={(e) => setNewBoardTitle(e.target.value)}
          className="p-2"
        />
      ) : (
        <p>Title: {title}</p>
      )}
      <p>Created: {new Date(createdAt).toLocaleString()}</p>
      <div className="flex mt-3 justify-between">
        <Button
          className="bg-blue-500 p-2 rounded-md text-white hover:bg-blue-400 transition-colors duration-300"
          onClick={handleClick}
        >
          {isEditing ? 'Mentés' : 'Szerkesztés'}
        </Button>
        {isEditing ? (
          <Button
            className="bg-slate-500 p-2 rounded-md text-white hover:bg-slate-400 transition-colors duration-300"
            onClick={() => setIsEditing(false)}
          >
            Vissza
          </Button>
        ) : (
          <Button
            className="bg-red-500 p-2 rounded-md text-white hover:bg-red-400 transition-colors duration-300"
            onClick={() => deleteBoardMutation.mutate()}
          >
            Törlés
          </Button>
        )}
      </div>
    </Link>
  );
};

export default BoardItem;
