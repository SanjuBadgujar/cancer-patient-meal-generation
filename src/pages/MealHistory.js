import React, { useState } from 'react';
import { History, Calendar, Download, Filter, Search, Star, Clock, Utensils, Target } from 'lucide-react';
import toast from 'react-hot-toast';

const MealHistory = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all'); // all, favorites, recent
  const [selectedMealType, setSelectedMealType] = useState('all');

  const mealHistory = [
    {
      id: 1,
      date: '2024-01-15',
      dayOfWeek: 'Monday',
      meals: [
        {
          type: 'breakfast',
          name: 'Anti-Inflammatory Oatmeal Bowl',
          time: '7:30 AM',
          calories: 320,
          protein: '12g',
          rating: 5,
          symptoms: ['Fatigue', 'Inflammation'],
          isFavorite: true
        },
        {
          type: 'lunch',
          name: 'Quinoa Power Bowl',
          time: '12:30 PM',
          calories: 420,
          protein: '18g',
          rating: 4,
          symptoms: ['Fatigue', 'Weight loss'],
          isFavorite: false
        },
        {
          type: 'dinner',
          name: 'Baked Salmon with Vegetables',
          time: '6:30 PM',
          calories: 480,
          protein: '35g',
          rating: 5,
          symptoms: ['Inflammation'],
          isFavorite: true
        }
      ],
      totalCalories: 1420,
      totalProtein: 85,
      notes: 'Good energy day, felt less nauseous'
    },
    {
      id: 2,
      date: '2024-01-14',
      dayOfWeek: 'Sunday',
      meals: [
        {
          type: 'breakfast',
          name: 'Green Power Smoothie',
          time: '8:00 AM',
          calories: 180,
          protein: '8g',
          rating: 3,
          symptoms: ['Nausea', 'Low appetite'],
          isFavorite: false
        },
        {
          type: 'lunch',
          name: 'Chicken Soup',
          time: '1:00 PM',
          calories: 280,
          protein: '22g',
          rating: 4,
          symptoms: ['Nausea'],
          isFavorite: true
        },
        {
          type: 'dinner',
          name: 'Mashed Sweet Potato',
          time: '7:00 PM',
          calories: 250,
          protein: '4g',
          rating: 4,
          symptoms: ['Digestive issues'],
          isFavorite: false
        }
      ],
      totalCalories: 1180,
      totalProtein: 58,
      notes: 'Challenging day with nausea, soft foods helped'
    },
    {
      id: 3,
      date: '2024-01-13',
      dayOfWeek: 'Saturday',
      meals: [
        {
          type: 'breakfast',
          name: 'Greek Yogurt Parfait',
          time: '8:30 AM',
          calories: 280,
          protein: '15g',
          rating: 5,
          symptoms: ['Weight loss'],
          isFavorite: true
        },
        {
          type: 'lunch',
          name: 'Avocado Toast with Egg',
          time: '12:00 PM',
          calories: 380,
          protein: '18g',
          rating: 4,
          symptoms: ['Fatigue'],
          isFavorite: false
        },
        {
          type: 'dinner',
          name: 'Lentil Curry',
          time: '6:45 PM',
          calories: 420,
          protein: '20g',
          rating: 4,
          symptoms: ['Inflammation'],
          isFavorite: true
        }
      ],
      totalCalories: 1580,
      totalProtein: 78,
      notes: 'Felt stronger today, enjoyed spiced foods'
    }
  ];

  const savedMealPlans = [
    {
      id: 1,
      name: 'Anti-Inflammatory Week',
      dateCreated: '2024-01-10',
      daysIncluded: 7,
      avgCalories: 1650,
      focus: 'Reducing inflammation and boosting energy',
      isTemplate: true
    },
    {
      id: 2,
      name: 'Gentle Recovery Plan',
      dateCreated: '2024-01-08',
      daysIncluded: 5,
      avgCalories: 1200,
      focus: 'Soft foods for digestive comfort',
      isTemplate: false
    },
    {
      id: 3,
      name: 'High-Protein Boost',
      dateCreated: '2024-01-05',
      daysIncluded: 7,
      avgCalories: 1800,
      focus: 'Meeting protein targets for muscle maintenance',
      isTemplate: true
    }
  ];

  const favoriteRecipes = [
    {
      name: 'Anti-Inflammatory Oatmeal Bowl',
      timesEaten: 8,
      avgRating: 4.8,
      lastEaten: '2024-01-15',
      calories: 320,
      protein: '12g'
    },
    {
      name: 'Baked Salmon with Vegetables',
      timesEaten: 6,
      avgRating: 4.9,
      lastEaten: '2024-01-15',
      calories: 480,
      protein: '35g'
    },
    {
      name: 'Greek Yogurt Parfait',
      timesEaten: 5,
      avgRating: 4.6,
      lastEaten: '2024-01-13',
      calories: 280,
      protein: '15g'
    },
    {
      name: 'Chicken Soup',
      timesEaten: 4,
      avgRating: 4.5,
      lastEaten: '2024-01-14',
      calories: 280,
      protein: '22g'
    }
  ];

  const filteredHistory = mealHistory.filter(day => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return day.meals.some(meal => 
        meal.name.toLowerCase().includes(searchLower) ||
        meal.symptoms.some(symptom => symptom.toLowerCase().includes(searchLower))
      ) || day.notes.toLowerCase().includes(searchLower);
    }
    return true;
  }).filter(day => {
    if (filterBy === 'favorites') {
      return day.meals.some(meal => meal.isFavorite);
    }
    return true;
  });

  const exportPDF = (type, data = null) => {
    if (type === 'history') {
      toast.success('Meal history exported to PDF!');
    } else if (type === 'plan') {
      toast.success(`Meal plan "${data.name}" exported to PDF!`);
    } else {
      toast.success('Report exported to PDF!');
    }
  };

  const toggleFavorite = (dayId, mealIndex) => {
    // Toggle favorite status logic would go here
    toast.success('Favorite status updated!');
  };

  const rateMeal = (dayId, mealIndex, rating) => {
    // Rating update logic would go here
    toast.success(`Meal rated ${rating} stars!`);
  };

  const StarRating = ({ rating, onChange, readonly = false }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          className={`h-4 w-4 cursor-pointer ${
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
          onClick={() => !readonly && onChange && onChange(star)}
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meal History</h1>
          <p className="text-gray-600">
            Track your nutrition journey and save successful meal plans
          </p>
        </div>
        <button
          onClick={() => exportPDF('history')}
          className="mt-4 sm:mt-0 btn-primary flex items-center space-x-2"
        >
          <Download className="h-5 w-5" />
          <span>Export History PDF</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 bg-white rounded-xl border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search meals, symptoms, or notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-w-[250px]"
            />
          </div>
          
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Meals</option>
            <option value="favorites">Favorites Only</option>
            <option value="recent">Recent (Last 7 days)</option>
          </select>

          <select
            value={selectedMealType}
            onChange={(e) => setSelectedMealType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Meal Types</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snacks</option>
          </select>
        </div>

        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          {['week', 'month', '3months'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 text-sm font-medium capitalize ${
                selectedPeriod === period
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {period === '3months' ? '3 Months' : period}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meal History Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Daily Meal History</h2>
          
          {filteredHistory.map((day, dayIndex) => (
            <div key={day.id} className="card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {day.dayOfWeek}, {new Date(day.date).toLocaleDateString()}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      {day.totalCalories} cal
                    </span>
                    <span className="flex items-center">
                      <Utensils className="h-4 w-4 mr-1" />
                      {day.totalProtein}g protein
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => exportPDF('day', day)}
                  className="p-2 text-gray-400 hover:text-primary-600"
                >
                  <Download className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                {day.meals.map((meal, mealIndex) => (
                  <div key={mealIndex} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{meal.name}</h4>
                        <button
                          onClick={() => toggleFavorite(day.id, mealIndex)}
                          className={`p-1 ${meal.isFavorite ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
                        >
                          <Star className={`h-4 w-4 ${meal.isFavorite ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span className="capitalize">{meal.type}</span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {meal.time}
                        </span>
                        <span>{meal.calories} cal</span>
                        <span>{meal.protein} protein</span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex flex-wrap gap-1">
                          {meal.symptoms.map((symptom, index) => (
                            <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                              {symptom}
                            </span>
                          ))}
                        </div>
                        <StarRating 
                          rating={meal.rating} 
                          onChange={(rating) => rateMeal(day.id, mealIndex, rating)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {day.notes && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-1">Daily Notes:</h5>
                  <p className="text-blue-800 text-sm">{day.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Saved Meal Plans */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Saved Meal Plans</h3>
              <History className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="space-y-3">
              {savedMealPlans.map((plan, index) => (
                <div key={plan.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{plan.name}</h4>
                    <button
                      onClick={() => exportPDF('plan', plan)}
                      className="p-1 text-gray-400 hover:text-primary-600"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{plan.daysIncluded} days • Avg: {plan.avgCalories} cal/day</p>
                    <p className="text-xs">{plan.focus}</p>
                    <p className="text-xs text-gray-500">
                      Created: {new Date(plan.dateCreated).toLocaleDateString()}
                    </p>
                  </div>

                  {plan.isTemplate && (
                    <span className="inline-block mt-2 px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                      Template
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Favorite Recipes */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Eaten Recipes</h3>
            
            <div className="space-y-3">
              {favoriteRecipes.map((recipe, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{recipe.name}</h4>
                    <span className="text-xs text-gray-500">{recipe.timesEaten}x</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <StarRating rating={Math.round(recipe.avgRating)} readonly />
                    <span className="text-xs text-gray-500">{recipe.avgRating}/5</span>
                  </div>
                  
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>{recipe.calories} cal</span>
                      <span>{recipe.protein} protein</span>
                    </div>
                    <p className="text-gray-500">Last eaten: {new Date(recipe.lastEaten).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week's Stats</h3>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">21</div>
                <div className="text-sm text-gray-600">Meals Logged</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">4.6</div>
                <div className="text-sm text-gray-600">Avg Meal Rating</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1580</div>
                <div className="text-sm text-gray-600">Avg Daily Calories</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">89g</div>
                <div className="text-sm text-gray-600">Avg Daily Protein</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealHistory;