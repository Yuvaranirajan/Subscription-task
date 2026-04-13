import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Axios from '../utils/axios';
import { toast } from 'sonner';
import useAuthStore from '../store/authStore';

export const useMySubscriptionQuery = () => {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: ['subscription', 'me', user?._id],
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
    enabled: !!user?._id // Only run the query if a user is logged in
  });
};


export const useSubscribeMutation = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: async (planId: string) => {
      const { data } = await Axios.post('/subscriptions/create-subscription', { planId });
      return data.data.subscriptions.data;
    },
    onSuccess: () => {
      toast.success('Subscription activated!');
      queryClient.invalidateQueries({ queryKey: ['subscription', 'me', user?._id] });
    },
    onError: (err: any) => {
      console.error('Subscription failed:', err);
      toast.error(err.response?.data?.data?.subscriptions?.message || 'Subscription failed. Please try again.');
    }
  });
};
