import { useState } from "react";
import { Board } from "./types";
import axios from "axios";

const BASE_URL = 'https://api.ticketing.kir-dev.hu'


interface BoardItemProps {
    board: Board;
    onSave: () => void;
}

const BoardItem = ({ board, onSave }: BoardItemProps) => {
    const [ isEditing, setIsEditing ] = useState(false);
    const [ newBoardTitle, setNewBoardTitle ] = useState("");

    const { id, title, createdAt } = board;

    async function handleClick() {
        if (isEditing) {
            await axios.patch(`${BASE_URL}/boards/${id}`,
                 { title: newBoardTitle })
            onSave()
        } 

        setIsEditing(prev => !prev);
    }

    async function onDelete() {
        await axios.delete(`${BASE_URL}/boards/${id}`);
        onSave()
    }

    return (
        <div className="border border-black rounded-md p-2">
            <p>Id: {id}</p>
            {isEditing 
                ? <input 
                    defaultValue={title} 
                    onChange={e => setNewBoardTitle(e.target.value)} 
                    className="p-2"
                />
                : <p>Title: {title}</p>
            }
            <p>Created: {new Date(createdAt).toLocaleString()}</p>
            <div className="flex mt-3 justify-between">
                <button 
                    className="bg-blue-500 p-2 rounded-md text-white hover:bg-blue-400 transition-colors duration-300"
                    onClick={handleClick}
                >
                    {isEditing ? "Mentés" : "Szerkesztés"}
                </button>
                {isEditing 
                    ?   <button 
                            className="bg-slate-500 p-2 rounded-md text-white hover:bg-slate-400 transition-colors duration-300"
                            onClick={() => setIsEditing(false)}
                        >
                            Vissza
                        </button>
                    : <button 
                        className="bg-red-500 p-2 rounded-md text-white hover:bg-red-400 transition-colors duration-300"
                        onClick={onDelete}
                        >
                            Törlés
                    </button>
                }
            </div>
        </div>
    )
}

export default BoardItem;