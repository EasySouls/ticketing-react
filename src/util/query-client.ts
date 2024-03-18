import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from './envs';

export const initAxios = () => {
  axios.defaults.baseURL = API_URL;

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (Array.isArray(error?.response?.data?.message)) {
        return Promise.reject({
          ...error.response.data,
          message: error.response.data.message.join(', '),
        });
      }
      if (error?.response?.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    },
  );
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});
