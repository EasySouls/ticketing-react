import { createLazyFileRoute } from '@tanstack/react-router';
import BoardItem from '../../BoardItem';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Board } from '../../types';
import { useQuery } from '@tanstack/react-query';

export const Route = createLazyFileRoute('/boards/')({
  component: BoardsPage,
});

function BoardsPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _boards = useQuery({ queryKey: ['boards'], queryFn: getBoards });

  const [boardTitle, setBoardTitle] = useState('');
  const [boards, setBoards] = useState<Board[]>();
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    if (boardTitle === '') return;
    setIsLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/boards`, {
        title: boardTitle,
      });
      console.log('Result status: ' + res.status);
      console.log('Result data: ' + JSON.stringify(res.data));

      getBoards();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  async function getBoards() {
    setIsLoading(true);

    try {
      const res = await axios.get<Board[]>(
        `${import.meta.env.VITE_API_URL}/boards`,
      );
      setBoards(res.data);
    } catch (e) {
      console.log('Error fetching boards: ' + e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <main className="flex flex-col gap-4 items-center justify-center min-h-screen bg-slate-100">
      <div className="flex flex-col gap-2">
        <input
          className="border rounded-md p-2"
          placeholder="Board title"
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
        />
        <button
          className="p-2 bg-blue-500 rounded-lg text-white hover:bg-blue-400"
          onClick={() => handleClick()}
        >
          Create Board
        </button>
        {isLoading && <p>Loading...</p>}
      </div>
      <div className="">
        <select className="p-2 border rounded-md">
          {boards?.map((board) => {
            return (
              <option key={board.id} value={board.id} className="p-2">
                {board.title}
              </option>
            );
          })}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2 p-4">
        {boards &&
          boards?.reverse().map((board) => {
            return (
              <BoardItem key={board.id} board={board} onSave={getBoards} />
            );
          })}
      </div>
    </main>
  );
}
