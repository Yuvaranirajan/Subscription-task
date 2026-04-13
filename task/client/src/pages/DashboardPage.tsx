import { useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, Calendar, CreditCard, User as UserIcon, Shield } from 'lucide-react';
import useAuthStore from '../store/authStore';
import { useMySubscriptionQuery } from '../hooks/useSubscription';

const DashboardPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const { 
    data: subscription, 
    isLoading 
  } = useMySubscriptionQuery();

  // Safe formatting for the registration date
  const memberSince = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
    : 'New Member';

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  const isOrphaned = subscription && !subscription.planId;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-emerald-600 dark:text-white"> Dashboard</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-2">Manage your account and subscription details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm col-span-1">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white">{user?.name}</h2>
              <p className="text-sm text-gray-500 dark:text-slate-400">{user?.email}</p>
            </div>
          </div>
          <div className="pt-6 border-t border-gray-50 dark:border-slate-800 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-slate-400">Account Type</span>
              <span className="font-bold text-gray-900 dark:text-white capitalize">{user?.role}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-slate-400">Member Since</span>
              <span className="font-bold text-gray-900 dark:text-white">{memberSince}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm lg:col-span-2">
          {user?.role === 'admin' ? (
            <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-900 transition-colors duration-300 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group shadow-sm hover:shadow-md">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500 group-hover:w-2.5 transition-all duration-300"></div>
              
              <div className="flex items-center gap-6 pl-2 w-full md:w-auto">
                <div className="flex-shrink-0 w-14 h-14 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-500 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Shield className="w-7 h-7" />
                </div>
                <div className="text-left">
                  <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-1">Super Admin</h2>
                  <p className="text-gray-500 dark:text-slate-400 text-sm max-w-md font-medium leading-relaxed">
                    Your account holds elevated system privileges. Manage active users and global platform subscriptions via the admin center.
                  </p>
                </div>
              </div>

              <button 
                onClick={() => navigate('/admin')}
                className="w-full md:w-auto cursor-pointer bg-emerald-600 dark:bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-emerald-700 dark:hover:bg-emerald-700 transition-all shadow-md hover:shadow-emerald-200 dark:hover:shadow-none active:scale-[0.98] flex-shrink-0"
              >
                Access Portal
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                Subscription Status
                {subscription && (
                  <span className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-500 text-xs font-bold rounded-full border border-green-100 dark:border-green-900 uppercase">
                    {subscription.status}
                  </span>
                )}
              </h2>

              {subscription ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-slate-400 flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-gray-400 dark:text-slate-500" />
                        Current Plan
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {isOrphaned ? 'Plan data unavailable' : subscription.planId?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-slate-400 flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-gray-400 dark:text-slate-500" />
                        Next Renewal Date
                      </p>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {new Date(subscription.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-xl border border-gray-100 dark:border-slate-700">
                    <p className="text-sm text-gray-500 dark:text-slate-400 flex items-center gap-2 mb-4">
                      <CreditCard className="w-4 h-4 text-gray-400 dark:text-slate-500" />
                      Billing Details
                    </p>
                    {isOrphaned ? (
                      <p className="text-sm text-amber-600 dark:text-amber-500 font-medium">
                        Your plan information could not be retrieved.
                      </p>
                    ) : (
                      <>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Amount</span>
                          <span className="font-bold text-gray-900 dark:text-white">₹{subscription.planId?.price}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Frequency</span>
                          <span className="font-bold text-gray-900 dark:text-white">{subscription.planId?.duration} Days</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-gray-200 dark:border-slate-700">
                  <p className="text-gray-500 dark:text-slate-400 mb-4">You don't have an active subscription.</p>
                  <button 
                    onClick={() => navigate('/plans')}
                    className="bg-emerald-600 cursor-pointer text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-700 transition-all"
                  >
                    Browse Plans
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
