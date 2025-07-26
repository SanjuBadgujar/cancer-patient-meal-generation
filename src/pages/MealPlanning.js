import React, { useState } from 'react';
import { Calendar, Plus, Clock, Users, ChefHat, Target, Shuffle, Download } from 'lucide-react';
import toast from 'react-hot-toast';

const MealPlanning = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewType, setViewType] = useState('daily'); // daily or weekly
  const [isGenerating, setIsGenerating] = useState(false);

  const [mealPlan, setMealPlan] = useState({
    breakfast: {
      name: 'Anti-Inflammatory Oatmeal Bowl',
      calories: 320,
      protein: '12g',
      prepTime: '10 min',
      servings: 1,
      ingredients: ['Rolled oats', 'Blueberries', 'Walnuts', 'Cinnamon', 'Honey'],
      symptoms: ['Fatigue', 'Inflammation'],
      nutrition: { carbs: '45g', fat: '8g', fiber: '6g', vitamins: 'B1, B6, E' }
    },
    morningSnack: {
      name: 'Green Power Smoothie',
      calories: 180,
      protein: '8g',
      prepTime: '5 min',
      servings: 1,
      ingredients: ['Spinach', 'Banana', 'Protein powder', 'Almond milk'],
      symptoms: ['Nausea', 'Low appetite'],
      nutrition: { carbs: '25g', fat: '2g', fiber: '4g', vitamins: 'A, C, K' }
    },
    lunch: {
      name: 'Quinoa Power Bowl',
      calories: 420,
      protein: '18g',
      prepTime: '25 min',
      servings: 1,
      ingredients: ['Quinoa', 'Grilled chicken', 'Avocado', 'Sweet potato', 'Spinach'],
      symptoms: ['Fatigue', 'Weight loss'],
      nutrition: { carbs: '35g', fat: '15g', fiber: '8g', vitamins: 'B12, E, K' }
    },
    afternoonSnack: {
      name: 'Turmeric Golden Milk',
      calories: 150,
      protein: '6g',
      prepTime: '8 min',
      servings: 1,
      ingredients: ['Coconut milk', 'Turmeric', 'Ginger', 'Honey', 'Black pepper'],
      symptoms: ['Inflammation', 'Digestive issues'],
      nutrition: { carbs: '12g', fat: '10g', fiber: '2g', vitamins: 'D, E' }
    },
    dinner: {
      name: 'Baked Salmon with Vegetables',
      calories: 480,
      protein: '35g',
      prepTime: '30 min',
      servings: 1,
      ingredients: ['Salmon fillet', 'Broccoli', 'Carrots', 'Olive oil', 'Herbs'],
      symptoms: ['Inflammation', 'Fatigue'],
      nutrition: { carbs: '20g', fat: '25g', fiber: '5g', vitamins: 'D, B12, Omega-3' }
    },
    eveningSnack: {
      name: 'Chamomile Tea with Honey',
      calories: 45,
      protein: '0g',
      prepTime: '5 min',
      servings: 1,
      ingredients: ['Chamomile tea', 'Honey'],
      symptoms: ['Sleep issues', 'Anxiety'],
      nutrition: { carbs: '12g', fat: '0g', fiber: '0g', vitamins: 'Antioxidants' }
    }
  });

  const mealTypes = [
    { key: 'breakfast', name: 'Breakfast', icon: '🌅', time: '7:00 AM' },
    { key: 'morningSnack', name: 'Morning Snack', icon: '🥤', time: '10:00 AM' },
    { key: 'lunch', name: 'Lunch', icon: '🥗', time: '12:30 PM' },
    { key: 'afternoonSnack', name: 'Afternoon Snack', icon: '🥛', time: '3:00 PM' },
    { key: 'dinner', name: 'Dinner', icon: '🍽️', time: '6:30 PM' },
    { key: 'eveningSnack', name: 'Evening Snack', icon: '🫖', time: '8:30 PM' }
  ];

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const dailyTotals = Object.values(mealPlan).reduce((totals, meal) => ({
    calories: totals.calories + meal.calories,
    protein: totals.protein + parseInt(meal.protein),
  }), { calories: 0, protein: 0 });

  const generateMealPlan = async (type = 'daily') => {
    setIsGenerating(true);
    try {
      // Simulate AI meal generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success(`New ${type} meal plan generated successfully!`);
    } catch (error) {
      toast.error('Failed to generate meal plan. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const exportMealPlan = () => {
    toast.success('Meal plan exported to PDF!');
  };

  const MealCard = ({ mealType, meal }) => (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{mealTypes.find(t => t.key === mealType)?.icon}</span>
          <div>
            <h3 className="font-semibold text-gray-900">{mealTypes.find(t => t.key === mealType)?.name}</h3>
            <p className="text-sm text-gray-500">{mealTypes.find(t => t.key === mealType)?.time}</p>
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <Shuffle className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">{meal.name}</h4>
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
          <span className="flex items-center">
            <Target className="h-4 w-4 mr-1" />
            {meal.calories} cal
          </span>
          <span className="flex items-center">
            <ChefHat className="h-4 w-4 mr-1" />
            {meal.protein} protein
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {meal.prepTime}
          </span>
          <span className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {meal.servings} serving
          </span>
        </div>
      </div>

      <div className="mb-4">
        <h5 className="text-sm font-medium text-gray-700 mb-2">Ingredients:</h5>
        <div className="flex flex-wrap gap-1">
          {meal.ingredients.map((ingredient, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
              {ingredient}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h5 className="text-sm font-medium text-gray-700 mb-2">Helps with:</h5>
        <div className="flex flex-wrap gap-1">
          {meal.symptoms.map((symptom, index) => (
            <span key={index} className="px-2 py-1 bg-green-100 text-xs rounded-full text-green-700">
              {symptom}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t pt-3">
        <h5 className="text-sm font-medium text-gray-700 mb-2">Nutrition:</h5>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <span>Carbs: {meal.nutrition.carbs}</span>
          <span>Fat: {meal.nutrition.fat}</span>
          <span>Fiber: {meal.nutrition.fiber}</span>
          <span>Vitamins: {meal.nutrition.vitamins}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meal Planning</h1>
          <p className="text-gray-600">
            Personalized meal plans designed for your cancer treatment journey
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={() => generateMealPlan(viewType)}
            disabled={isGenerating}
            className="btn-primary flex items-center space-x-2"
          >
            <Shuffle className="h-5 w-5" />
            <span>{isGenerating ? 'Generating...' : 'Generate New Plan'}</span>
          </button>
          <button
            onClick={exportMealPlan}
            className="btn-secondary flex items-center space-x-2"
          >
            <Download className="h-5 w-5" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white rounded-xl border border-gray-200">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => setViewType('daily')}
              className={`px-4 py-2 text-sm font-medium ${
                viewType === 'daily'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Daily View
            </button>
            <button
              onClick={() => setViewType('weekly')}
              className={`px-4 py-2 text-sm font-medium ${
                viewType === 'weekly'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Weekly View
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Daily Target:</span> 1800 cal | 120g protein
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-900">Current:</span>
            <span className={`ml-1 ${dailyTotals.calories >= 1800 ? 'text-green-600' : 'text-orange-600'}`}>
              {dailyTotals.calories} cal
            </span>
            <span className="text-gray-400"> | </span>
            <span className={`${dailyTotals.protein >= 120 ? 'text-green-600' : 'text-orange-600'}`}>
              {dailyTotals.protein}g protein
            </span>
          </div>
        </div>
      </div>

      {viewType === 'daily' ? (
        /* Daily View */
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {mealTypes.map(({ key }) => (
            <MealCard key={key} mealType={key} meal={mealPlan[key]} />
          ))}
        </div>
      ) : (
        /* Weekly View */
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Weekly Meal Plan</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Meal</th>
                  {weekDays.map(day => (
                    <th key={day} className="text-left py-3 px-4 font-medium text-gray-700 min-w-[150px]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mealTypes.slice(0, 3).map(({ key, name }) => (
                  <tr key={key} className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium text-gray-900">{name}</td>
                    {weekDays.map(day => (
                      <td key={day} className="py-4 px-4">
                        <div className="text-sm">
                          <p className="font-medium text-gray-900 mb-1">{mealPlan[key].name}</p>
                          <p className="text-gray-500">{mealPlan[key].calories} cal</p>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="p-4 bg-blue-100 rounded-lg w-fit mx-auto mb-4">
            <Plus className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Add Custom Meal</h3>
          <p className="text-gray-600 mb-4">Create your own meal based on available ingredients</p>
          <button className="btn-primary w-full">Add Meal</button>
        </div>

        <div className="card text-center">
          <div className="p-4 bg-green-100 rounded-lg w-fit mx-auto mb-4">
            <Calendar className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Meal Prep Guide</h3>
          <p className="text-gray-600 mb-4">Get step-by-step meal preparation instructions</p>
          <button className="btn-primary w-full">View Guide</button>
        </div>

        <div className="card text-center">
          <div className="p-4 bg-purple-100 rounded-lg w-fit mx-auto mb-4">
            <Target className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Nutrition Goals</h3>
          <p className="text-gray-600 mb-4">Adjust your daily nutrition targets and preferences</p>
          <button className="btn-primary w-full">Customize Goals</button>
        </div>
      </div>
    </div>
  );
};

export default MealPlanning;