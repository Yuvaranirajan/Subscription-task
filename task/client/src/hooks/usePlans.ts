import { useQuery } from '@tanstack/react-query';
import Axios from '../utils/axios';


export const usePlansQuery = () => {
  return useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      const { data } = await Axios.get('/plans/get-plans');
      return data.data.plans.data;
    },
  });
};
