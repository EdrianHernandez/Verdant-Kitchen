import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Plan } from './PlanSelector';
import { Meal } from './WeeklyMenu';

interface CartCounterProps {
  plan: Plan;
  boxCount: number;
  items: Meal[];
}

export default function CartCounter({ plan, boxCount, items }: CartCounterProps) {
  const isComplete = boxCount === plan.mealsPerWeek;
  const progress = (boxCount / plan.mealsPerWeek) * 100;
  
  // Calculate total (simplified logic)
  const shipping = 9.99;
  const subtotal = plan.pricePerServing * plan.servingsPerMeal * boxCount;
  const total = subtotal > 0 ? subtotal + shipping : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-emerald-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-6 pt-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Progress Section */}
        <div className="flex items-center w-full sm:w-auto space-x-4">
          <div className="relative">
            <div className="bg-emerald-100 p-2.5 rounded-xl">
              <ShoppingBag className="w-6 h-6 text-emerald-700" />
            </div>
            {boxCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {boxCount}
              </span>
            )}
          </div>
          
          <div className="flex-1 sm:min-w-[200px]">
             <div className="flex justify-between items-end mb-1.5">
               <span className="text-sm font-bold text-stone-800">
                 {isComplete ? 'Box Complete!' : `${boxCount} of ${plan.mealsPerWeek} Meals`}
               </span>
               <span className="text-xs text-stone-500 font-medium">
                 {plan.title} ({plan.servingsPerMeal} servings)
               </span>
             </div>
             <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
               <div 
                  className={`h-full transition-all duration-500 ease-out rounded-full ${isComplete ? 'bg-emerald-500' : 'bg-emerald-300'}`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
               />
             </div>
          </div>
        </div>

        {/* Pricing & Action */}
        <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end space-x-6">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-stone-400">ESTIMATED TOTAL</div>
            <div className="text-xl font-bold text-stone-800">
              ${total.toFixed(2)}
            </div>
          </div>

          <button 
            disabled={!isComplete}
            className={`
              flex-1 sm:flex-none flex items-center justify-center space-x-2 px-8 py-3 rounded-xl font-bold text-lg transition-all transform active:scale-95
              ${isComplete 
                ? 'bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 shadow-emerald-200' 
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }
            `}
          >
            <span>Review Box</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}