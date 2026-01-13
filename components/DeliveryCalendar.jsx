import React from 'react';
import { Calendar as CalendarIcon, Truck } from 'lucide-react';

export default function DeliveryCalendar({ selectedDate, onSelectDate }) {
  // Generate next 14 days
  const dates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + (i + 2)); // Start 2 days from now
    return d;
  });

  return (
    <div className="flex items-center space-x-3 bg-white p-2 rounded-xl shadow-sm border border-stone-200">
      <div className="px-3 flex items-center space-x-2 text-stone-500 border-r border-stone-200 pr-4">
        <Truck className="w-5 h-5 text-emerald-500" />
        <span className="text-sm font-medium hidden sm:inline">First Delivery:</span>
      </div>
      
      <div className="flex space-x-2 overflow-x-auto hide-scrollbar">
        {dates.map((date) => {
          const isSelected = selectedDate?.toDateString() === date.toDateString();
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dayNum = date.getDate();

          return (
            <button
              key={date.toISOString()}
              onClick={() => onSelectDate(date)}
              className={`
                flex flex-col items-center justify-center w-12 h-12 rounded-lg transition-all
                ${isSelected 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'text-stone-600 hover:bg-emerald-50'
                }
              `}
            >
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">{dayName}</span>
              <span className="text-sm font-bold leading-none">{dayNum}</span>
            </button>
          );
        })}
      </div>
      
      <div className="pl-2 pr-3">
         <CalendarIcon className="w-5 h-5 text-stone-300" />
      </div>
    </div>
  );
}
