import { useState, useEffect } from 'react';
import { Loader2, Users, Search, CheckCircle, XCircle, Filter, RotateCcw, ChevronDown } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { usePlansQuery } from '../hooks/usePlans';
import { useDebounce } from '../hooks/useDebounce';
import { useInfiniteSubscriptions } from '../hooks/useSubscriptions';

const AdminSubscriptionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [planFilter, setPlanFilter] = useState('');
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { ref, inView } = useInView();

  const { data: plansData } = usePlansQuery();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteSubscriptions(debouncedSearchTerm, statusFilter, planFilter);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const subscriptions = data?.pages.flatMap((page) => page.subscriptions) || [];
  const totalCount = data?.pages[0]?.totalCount || 0;

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setPlanFilter('');
  };

  if (status === 'pending' && !isFetchingNextPage) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-emerald-600 dark:text-white">Manage Subscriptions</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-2">Manage and monitor all user subscriptions across the platform</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-lg border border-emerald-100 dark:border-emerald-900/50 font-bold transition-all duration-300">
          <Users className="w-5 h-5" />
          <div className="flex flex-col">
            <span className="text-sm">{totalCount} Total Subscriptions</span>
            {(debouncedSearchTerm || statusFilter || planFilter) && (
              <span className="text-[10px] opacity-70 uppercase tracking-wider">Filtered View</span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm mb-6 p-4 transition-all duration-300">
        <div className="flex flex-wrap items-stretch gap-6">
          <div className="relative flex-grow min-w-[300px]">
            {isFetchingNextPage ? (
              <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600 animate-spin" />
            ) : (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            )}
            <input
              type="text"
              placeholder="Search user or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-100 dark:border-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none bg-gray-50/30 dark:bg-slate-800/50 text-gray-900 dark:text-white text-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="relative w-32 sm:w-40">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 z-10" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-9 pr-8 py-2 appearance-none rounded-xl border border-gray-100 dark:border-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none bg-gray-50/30 dark:bg-slate-800/50 text-gray-900 dark:text-white text-sm font-semibold"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="canceled">Canceled</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative w-36 sm:w-44">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 z-10" />
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
                className="w-full pl-9 pr-8 py-2 appearance-none rounded-xl border border-gray-100 dark:border-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none bg-gray-50/30 dark:bg-slate-800/50 text-gray-900 dark:text-white text-sm font-semibold"
              >
                <option value="">All Plans</option>
                {plansData?.map((plan: any) => (
                  <option key={plan._id} value={plan._id}>{plan.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>

            {(searchTerm || statusFilter || planFilter) && (
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-2 px-4 py-2.5 text-red-600 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all font-bold text-sm lg:w-auto w-full justify-center group"
              >
                <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                Reset 
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Expiry Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {subscriptions.length > 0 ? (
                <>
                  {subscriptions.map((sub: any) => (
                    <tr key={sub._id} className="hover:bg-emerald-50/10 dark:hover:bg-slate-800/50 transition-all duration-200 group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors uppercase text-sm tracking-tight">{sub.userId?.name}</div>
                        <div className="text-sm text-gray-500 dark:text-slate-400">{sub.userId?.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 text-[11px] font-extrabold rounded-full border border-gray-200 dark:border-slate-700 group-hover:border-emerald-200 dark:group-hover:border-emerald-800 transition-colors uppercase">
                          {sub.planId?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-bold">
                        {sub.status === 'active' ? (
                          <div className="flex items-center gap-1.5 text-green-600 dark:text-green-500 font-extrabold text-xs uppercase">
                            <CheckCircle className="w-3.5 h-3.5 animate-pulse-slow" />
                            Active
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-gray-400 dark:text-slate-500 font-extrabold text-xs uppercase">
                            <XCircle className="w-3.5 h-3.5" />
                            {sub.status}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-slate-400">
                        {new Date(sub.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-slate-400 font-medium tracking-tight">
                        {new Date(sub.endDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  
                  <tr ref={ref}>
                    <td colSpan={5} className="py-8">
                      {isFetchingNextPage && (
                        <div className="flex items-center justify-center gap-3 text-emerald-600 font-bold text-sm">
                          <Loader2 className="w-6 h-6 animate-spin" />
                          <span>Loading More...</span>
                        </div>
                      )}
                    
                    </td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-gray-500 dark:text-slate-400">
                    <div className="flex flex-col items-center gap-4">
                     
                      <div className="space-y-1">
                        <span className="text-base font-semibold block text-gray-400">No results found</span>
                      </div>
                    
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSubscriptionsPage;
