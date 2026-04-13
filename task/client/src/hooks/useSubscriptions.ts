import { useInfiniteQuery } from '@tanstack/react-query';
import Axios from '../utils/axios';

const fetchSubscriptions = async ({ pageParam = 1, queryKey }: { pageParam?: number, queryKey: (string | undefined)[] }) => {
  const [_key, search, status, planId] = queryKey;
  const { data } = await Axios.get('/subscriptions/all-subscriptions', {
    params: {
      search,
      status,
      planId,
      page: pageParam,
      limit: 10,
    },
  });
  return data.data.subscriptions.data;
};


export const useInfiniteSubscriptions = (search: string, status?: string, planId?: string) => {
  return useInfiniteQuery({
    queryKey: ['subscriptions', search, status, planId],
    queryFn: fetchSubscriptions,
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => {
      if (lastPage.hasMore) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60, 
  });
};
