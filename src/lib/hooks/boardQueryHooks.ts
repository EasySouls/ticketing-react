import { queryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Board } from '@/types.ts';

export const boardQueryOptions = (boardId: number) => {
  return queryOptions({
    queryKey: ['boards', boardId],
    queryFn: () => fetchBoardById(boardId),
  });
};

async function fetchBoards(): Promise<Board[]> {
  // TODO - paginate with React Query
  const res = await axios.get<Board[]>('boards');
  return res.data.slice(1, 30);
}

export const useFetchBoardsQuery = () => {
  return useQuery({
    queryKey: ['boards'],
    queryFn: fetchBoards,
  });
};

async function fetchBoardById(boardId: number): Promise<Board> {
  const res = await axios.get(`boards/${boardId}`);
  return res.data;
}

export const useFetchBoardByIdQuery = (boardId: number) => {
  return useQuery({
    queryKey: ['boards', boardId],
    queryFn: () => fetchBoardById(boardId),
  });
};
