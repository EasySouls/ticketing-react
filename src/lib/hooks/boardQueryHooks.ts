import { useQuery} from '@tanstack/react-query';
import axios from 'axios';
import { Board } from '@/types.ts';

async function fetchBoards(): Promise<Board[]> {
    const res = await axios.get('boards');
    return res.data;
}

export const useFetchBoardsQuery = () => {
    return useQuery({
        queryKey: ['boards'],
        queryFn: fetchBoards
    })
}

async function fetchBoardById(boardId: number): Promise<Board> {
    const res = await axios.get(`boards/${boardId}`);
    return res.data;
}

export const useFetchBoardByIdQuery = (boardId: number) => {
    return useQuery({
        queryKey: ['boards', boardId],
        queryFn: () => fetchBoardById(boardId)
    })
}