import { CreateBoard } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

async function createBoard(board: CreateBoard) {
  const res = await axios.post('boards', board);
  return res.data;
}

export const useCreateBoardMutation = () => {
  return useMutation({
    mutationKey: ['boards'],
    mutationFn: (board: CreateBoard) => createBoard(board),
  });
};

async function updateBoardTitle(boardId: number, title: string) {
  const res = await axios.patch(`boards/${boardId}`, { title });
  return res.data;
}

export const useUpdateBoardTitleMutation = (boardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['boards', boardId],
    mutationFn: (title: string) => updateBoardTitle(boardId, title),
    onSuccess: (newBoard) => {
      // TODO - this doesn't refresh the current page
      return queryClient.setQueryData(['boards', boardId], newBoard);
    },
  });
};

function deleteBoard(boardId: number) {
  return axios.delete(`boards/${boardId}`);
}

export const useDeleteBoardMutation = (boardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['boards'],
    mutationFn: () => deleteBoard(boardId),
    onMutate: () => {
      // TODO - this doesn't refresh the current page
      queryClient.invalidateQueries({ queryKey: ['boards'] });
    },
  });
};
