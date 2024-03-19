import { useState } from 'react';
import { Board } from './types';
import axios from 'axios';
import { API_URL } from '@/util/envs.ts';
import { Button } from './components/ui/button';

interface BoardItemProps {
  board: Board;
}

const BoardItem = ({ board }: BoardItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');

  const { id, title, createdAt } = board;

  async function handleClick() {
    if (isEditing) {
      await axios.patch(`${API_URL}/boards/${id}`, { title: newBoardTitle });
    }

    setIsEditing((prev) => !prev);
  }

  async function onDelete() {
    await axios.delete(`${API_URL}/boards/${id}`);
  }

  return (
    <div className="border border-black rounded-md p-2">
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
            onClick={onDelete}
          >
            Törlés
          </Button>
        )}
      </div>
    </div>
  );
};

export default BoardItem;
