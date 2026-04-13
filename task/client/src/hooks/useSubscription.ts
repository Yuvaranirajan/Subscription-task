import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Axios from '../utils/axios';
import { toast } from 'sonner';


export const useMySubscriptionQuery = () => {
  return useQuery({
    queryKey: ['subscription', 'me'],
    queryFn: async () => {
      try {
        const { data } = await Axios.get('/subscriptions/user-subscription');
        return data.data.subscriptions.data;
      } catch (err: any) {
        if (err.response?.status === 404) return null;
        throw err;
      }
    },
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};


export const useSubscribeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (planId: string) => {
      const { data } = await Axios.post('/subscriptions/create-subscription', { planId });
      return data.data.subscriptions.data;
    },
    onSuccess: () => {
      toast.success('Subscription activated!');
      queryClient.invalidateQueries({ queryKey: ['subscription', 'me'] });
    },
    onError: (err: any) => {
      console.error('Subscription failed:', err);
      toast.error(err.response?.data?.data?.subscriptions?.message || 'Subscription failed. Please try again.');
    }
  });
};
