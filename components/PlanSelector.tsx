import React from 'react';
import { Check } from 'lucide-react';

export interface Plan {
  id: string;
  title: string;
  description: string;
  pricePerServing: number;
  mealsPerWeek: number;
  servingsPerMeal: number;
  image: string;
}

interface PlanSelectorProps {
  plans: Plan[];
  selectedPlan: Plan;
  onSelect: (plan: Plan) => void;
}

export default function PlanSelector({ plans, selectedPlan, onSelect }: PlanSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => {
        const isSelected = selectedPlan.id === plan.id;
        
        return (
          <div 
            key={plan.id}
            onClick={() => onSelect(plan)}
            className={`
              relative group cursor-pointer rounded-2xl transition-all duration-300 overflow-hidden
              ${isSelected 
                ? 'ring-2 ring-emerald-500 shadow-xl bg-white transform -translate-y-1' 
                : 'bg-white shadow-md hover:shadow-lg border border-transparent hover:border-emerald-200'
              }
            `}
          >
            {/* Header Image */}
            <div className="h-32 w-full overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img 
                src={plan.image} 
                alt={plan.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-3 left-4 z-20">
                <h3 className="text-white font-bold text-lg">{plan.title}</h3>
              </div>
              {isSelected && (
                <div className="absolute top-3 right-3 z-20 bg-emerald-500 text-white p-1 rounded-full shadow-lg">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <p className="text-stone-500 text-sm mb-4 h-10 leading-snug">
                {plan.description}
              </p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-stone-600">Meals/Week</span>
                  <span className="font-semibold text-stone-800">{plan.mealsPerWeek}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-stone-600">Servings</span>
                  <span className="font-semibold text-stone-800">{plan.servingsPerMeal} ppl</span>
                </div>
                <div className="pt-3 border-t border-stone-100 flex justify-between items-end">
                  <div className="text-xs text-stone-400 font-medium">PER SERVING</div>
                  <div className="text-xl font-bold text-emerald-700">
                    ${plan.pricePerServing}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}