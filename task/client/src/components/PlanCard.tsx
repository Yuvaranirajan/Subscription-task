import { Check } from 'lucide-react';

interface Plan {
  _id: string;
  name: string;
  price: number;
  features: string[];
  duration: number;
}

interface PlanCardProps {
  plan: Plan;
  onSubscribe: (planId: string) => void;
  isLoading?: boolean;
}

const PlanCard = ({ plan, onSubscribe, isLoading }: PlanCardProps) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl dark:hover:shadow-slate-900/50 transition-all duration-300 flex flex-col h-full group">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-gray-900 dark:text-white">₹{plan.price}</span>
          <span className="text-gray-500 dark:text-slate-400 font-medium">/ {plan.duration} Days</span>
        </div>
      </div>

      <ul className="space-y-4 mb-8 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-sm text-gray-600 dark:text-slate-400">
            <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
            </div>
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSubscribe(plan._id)}
        disabled={isLoading}
        className="w-full bg-emerald-600 cursor-pointer text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-200 dark:shadow-none hover:shadow-emerald-300 active:scale-[0.98]"
      >
        {isLoading ? 'Selected Plan' : 'Select Plan'}
      </button>
    </div>
  );
};

export default PlanCard;
