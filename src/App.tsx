import axios from "axios";
import { useEffect, useState } from "react";
import { Board } from "./types";
import BoardItem from "./BoardItem";

const BASE_URL = 'https://api.ticketing.kir-dev.hu'

function App() {
  const [count, setCount] = useState(0);
  const [boardTitle, setBoardTitle] = useState("");
  const [boards, setBoards] = useState<Board[]>();
  const [isLoading, setIsLoading] = useState(false);

  const onIncrement = () => {
    setCount((prev) => prev + 1);
  }

  async function handleClick() {
    if (boardTitle === '') return;
    setIsLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/boards`, 
        { "title": boardTitle });
        console.log("Result status: " + res.status)
        console.log("Result data: " + JSON.stringify(res.data))

      getBoards()
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false);
    }
  }

  async function getBoards() {
    setIsLoading(true);

    try {
      const res = await axios.get<Board[]>(`${BASE_URL}/boards`);
      setBoards(res.data);
    } catch (e) {
      console.log('Error fetching boards: ' + e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getBoards();
  }, [])

  return (
    <main className="flex flex-col gap-4 items-center justify-center min-h-screen bg-slate-100">
      <div className="bg-white p-10 rounded-md shadow-lg flex flex-col items-center gap-5">
        <h1 className="font-bold">React Gyakorlat</h1>
        <button
          className="bg-blue-500 text-white font-bold p-5 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
          onClick={onIncrement}
        >
          {count}++
        </button>
      </div>
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
              <option 
                key={board.id} 
                value={board.id}
                className="p-2"
              >
                {board.title}
              </option>
            )
          })}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2 p-4">
        { boards && boards?.reverse().map((board) => {
          return (
            <BoardItem 
              key={board.id}
              board={board} 
              onSave={getBoards}
            />
          )
        })}
      </div>
    </main>
  );
}

export default App;
