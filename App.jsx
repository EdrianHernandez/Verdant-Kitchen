import React, { useState } from 'react';
import { ChefHat, Star, HelpCircle, Menu as MenuIcon, User } from 'lucide-react';
import PlanSelector from './components/PlanSelector';
import WeeklyMenu from './components/WeeklyMenu';
import DeliveryCalendar from './components/DeliveryCalendar';
import CartCounter from './components/CartCounter';

// --- Mock Data ---

export const PLANS = [
  {
    id: '2-person',
    title: '2 Person Plan',
    description: 'Perfect for couples. 3 meals per week.',
    pricePerServing: 8.99,
    mealsPerWeek: 3,
    servingsPerMeal: 2,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'family',
    title: 'Family Plan',
    description: 'Kid-friendly favorites. 4 meals per week.',
    pricePerServing: 7.49,
    mealsPerWeek: 4,
    servingsPerMeal: 4,
    image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'gourmet',
    title: 'Gourmet Plan',
    description: 'Restaurant quality recipes. 3 meals per week.',
    pricePerServing: 11.99,
    mealsPerWeek: 3,
    servingsPerMeal: 2,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600'
  }
];

const MOCK_MEALS = [
  {
    id: 1,
    title: 'Honey Glazed Salmon',
    subtitle: 'with Roasted Asparagus & Jasmine Rice',
    calories: 650,
    time: '25 min',
    tags: ['GF', 'High Protein'],
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'Truffle Mushroom Risotto',
    subtitle: 'with Parmesan Crisps & Fresh Thyme',
    calories: 580,
    time: '40 min',
    tags: ['Vegetarian', 'Gourmet'],
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Korean Beef Tacos',
    subtitle: 'with Spicy Slaw & Lime Crema',
    calories: 720,
    time: '20 min',
    tags: ['Spicy', 'Quick'],
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    title: 'Lemon Herb Roast Chicken',
    subtitle: 'with Root Vegetables & Pan Gravy',
    calories: 780,
    time: '55 min',
    tags: ['Family Fav', 'GF'],
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    title: 'Sweet Potato Buddha Bowl',
    subtitle: 'with Quinoa, Avocado & Tahini Dressing',
    calories: 520,
    time: '30 min',
    tags: ['Vegan', 'Healthy'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 6,
    title: 'Classic Beef Burger',
    subtitle: 'with Brioche Bun & Truffle Fries',
    calories: 950,
    time: '35 min',
    tags: ['Comfort'],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 7,
    title: 'Pesto Pasta Primavera',
    subtitle: 'with Cherry Tomatoes & Pine Nuts',
    calories: 600,
    time: '15 min',
    tags: ['Vegetarian', 'Quick'],
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 8,
    title: 'Thai Green Curry',
    subtitle: 'with Tofu, Bamboo Shoots & Basil',
    calories: 540,
    time: '30 min',
    tags: ['Vegan', 'Spicy'],
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&q=80&w=800'
  }
];

export default function App() {
  const [currentPlan, setCurrentPlan] = useState(PLANS[1]);
  const [boxItems, setBoxItems] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState(null);

  const toggleMeal = (meal) => {
    setBoxItems(prev => {
      const exists = prev.find(m => m.id === meal.id);
      if (exists) {
        return prev.filter(m => m.id !== meal.id);
      }
      if (prev.length >= currentPlan.mealsPerWeek) {
        alert("Your box is full! Remove a meal to add another.");
        return prev;
      }
      return [...prev, meal];
    });
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-emerald-600 p-1.5 rounded-lg">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-emerald-900 tracking-tight">Verdant Kitchen</span>
          </div>
          <div className="hidden md:flex space-x-8 text-stone-600 font-medium">
            <a href="#" className="text-emerald-600">On the Menu</a>
            <a href="#" className="hover:text-emerald-600 transition">Plans</a>
            <a href="#" className="hover:text-emerald-600 transition">Our Story</a>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-stone-500 hover:text-emerald-600">
              <HelpCircle className="w-5 h-5" />
            </button>
            <button className="text-stone-500 hover:text-emerald-600">
              <User className="w-5 h-5" />
            </button>
            <button className="md:hidden">
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero / Plan Selector */}
      <section className="bg-emerald-50/50 py-12 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-3">Choose Your Weekly Box</h1>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Flexible plans for every lifestyle. Skip or cancel anytime.
            </p>
          </div>
          
          <PlanSelector 
            plans={PLANS} 
            selectedPlan={currentPlan} 
            onSelect={setCurrentPlan} 
          />

          <div className="mt-10 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            <DeliveryCalendar 
              selectedDate={deliveryDate} 
              onSelectDate={setDeliveryDate} 
            />
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-stone-800">On The Menu</h2>
            <p className="text-stone-500 mt-1">Select {currentPlan.mealsPerWeek} meals for your delivery</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-2 overflow-x-auto pb-2 hide-scrollbar">
            {['All Recipes', 'Vegetarian', 'Quick & Easy', 'Family Friendly', 'Calorie Smart'].map((filter, idx) => (
              <button 
                key={filter}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  idx === 0 
                    ? 'bg-stone-800 text-white' 
                    : 'bg-white border border-stone-200 text-stone-600 hover:border-emerald-500 hover:text-emerald-600'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <WeeklyMenu 
          meals={MOCK_MEALS} 
          boxItems={boxItems} 
          onToggle={toggleMeal} 
          maxItems={currentPlan.mealsPerWeek}
        />
      </main>

      <CartCounter 
        plan={currentPlan}
        boxCount={boxItems.length}
        items={boxItems}
      />
    </div>
  );
}
