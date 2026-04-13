import PlanCard from '../components/PlanCard';
import { Loader2 } from 'lucide-react';
import { usePlansQuery } from '../hooks/usePlans';
import { useSubscribeMutation } from '../hooks/useSubscription';

const PlansPage = () => {
  const { data: plans, isLoading } = usePlansQuery();
  const { mutate: subscribe,  variables: subscribingId } = useSubscribeMutation();

  const handleSubscribe = (planId: string) => {
    subscribe(planId);
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-500">Subscription Plans</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-2">Choose the plan that's right for your business. No hidden fees.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan: any) => (
          <PlanCard
            key={plan._id}
            plan={plan}
            onSubscribe={handleSubscribe}
            isLoading={subscribingId === plan._id}
          />
        ))}
      </div>
    </div>
  );
};

export default PlansPage;
