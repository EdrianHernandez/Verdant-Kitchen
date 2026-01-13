import React from 'react';
import { Clock, Flame, Plus, Minus, Info } from 'lucide-react';

export default function WeeklyMenu({ meals, boxItems, onToggle, maxItems }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
      {meals.map((meal) => {
        const isInBox = boxItems.some(item => item.id === meal.id);
        const isBoxFull = boxItems.length >= maxItems;
        const isDisabled = !isInBox && isBoxFull;

        return (
          <div key={meal.id} className="meal-card group flex flex-col h-full">
            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-shadow">
              <img 
                src={meal.image} 
                alt={meal.title}
                className="w-full aspect-[4/3] object-cover transform group-hover:scale-105 transition-transform duration-700" 
              />
              
              {/* Tags Overlay */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                {meal.tags.map(tag => (
                  <span key={tag} className="bg-white/90 backdrop-blur-sm text-emerald-800 text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Quick Info Overlay (Hover) */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <button className="bg-white text-stone-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <Info className="w-4 h-4" />
                    <span>View Recipe</span>
                 </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-stone-800 text-lg leading-tight group-hover:text-emerald-700 transition-colors">
                  {meal.title}
                </h3>
              </div>
              <p className="text-stone-500 text-sm mb-4 line-clamp-2">{meal.subtitle}</p>
              
              <div className="flex items-center space-x-4 text-xs font-medium text-stone-400 mb-4 mt-auto">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{meal.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{meal.calories} kcal</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onToggle(meal)}
                disabled={isDisabled}
                className={`
                  w-full py-2.5 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200
                  ${isInBox 
                    ? 'bg-emerald-100 text-emerald-700 hover:bg-red-50 hover:text-red-600'
                    : isDisabled 
                      ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                      : 'bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white'
                  }
                `}
              >
                {isInBox ? (
                  <>
                    <Minus className="w-4 h-4" />
                    <span>Remove</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>{isDisabled ? 'Box Full' : 'Add to Box'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
