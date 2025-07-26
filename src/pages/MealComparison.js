import React, { useState } from 'react';
import { Scale, Plus, X, Target, ChefHat, Clock, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const MealComparison = () => {
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [comparisonMode, setComparisonMode] = useState('nutrition'); // nutrition, symptoms, overall

  const availableMeals = [
    {
      id: 1,
      name: 'Anti-Inflammatory Oatmeal Bowl',
      category: 'Breakfast',
      prepTime: '10 min',
      servings: 1,
      calories: 320,
      nutrition: {
        protein: 12,
        carbs: 45,
        fat: 8,
        fiber: 6,
        sugar: 12,
        sodium: 150
      },
      vitamins: ['Vitamin E', 'B6', 'Magnesium', 'Iron'],
      symptoms: ['Fatigue', 'Inflammation'],
      difficulty: 'Easy',
      cost: 'Low',
      ingredients: ['Oats', 'Blueberries', 'Walnuts', 'Cinnamon', 'Honey'],
      pros: ['High fiber', 'Anti-inflammatory', 'Quick to make', 'Good for energy'],
      cons: ['Contains nuts', 'Moderate sugar content'],
      rating: 4.8,
      suitableFor: ['Fatigue', 'Inflammation', 'Weight management']
    },
    {
      id: 2,
      name: 'Quinoa Power Bowl',
      category: 'Lunch',
      prepTime: '25 min',
      servings: 1,
      calories: 420,
      nutrition: {
        protein: 18,
        carbs: 35,
        fat: 15,
        fiber: 8,
        sugar: 6,
        sodium: 200
      },
      vitamins: ['Vitamin K', 'B12', 'Folate', 'Iron'],
      symptoms: ['Fatigue', 'Weight loss'],
      difficulty: 'Medium',
      cost: 'Medium',
      ingredients: ['Quinoa', 'Chicken', 'Avocado', 'Sweet potato', 'Spinach'],
      pros: ['Complete protein', 'High nutrient density', 'Good for muscle maintenance'],
      cons: ['Takes longer to prepare', 'Higher cost'],
      rating: 4.6,
      suitableFor: ['Weight loss', 'Fatigue', 'Muscle maintenance']
    },
    {
      id: 3,
      name: 'Green Power Smoothie',
      category: 'Snack',
      prepTime: '5 min',
      servings: 1,
      calories: 180,
      nutrition: {
        protein: 8,
        carbs: 25,
        fat: 2,
        fiber: 4,
        sugar: 18,
        sodium: 50
      },
      vitamins: ['Vitamin A', 'Vitamin C', 'K', 'Folate'],
      symptoms: ['Nausea', 'Low appetite'],
      difficulty: 'Easy',
      cost: 'Low',
      ingredients: ['Spinach', 'Banana', 'Protein powder', 'Almond milk'],
      pros: ['Easy to digest', 'High vitamins', 'Quick to make', 'Good for nausea'],
      cons: ['Lower calories', 'High sugar from fruit'],
      rating: 4.2,
      suitableFor: ['Nausea', 'Low appetite', 'Quick nutrition']
    },
    {
      id: 4,
      name: 'Baked Salmon with Vegetables',
      category: 'Dinner',
      prepTime: '30 min',
      servings: 1,
      calories: 480,
      nutrition: {
        protein: 35,
        carbs: 20,
        fat: 25,
        fiber: 5,
        sugar: 8,
        sodium: 300
      },
      vitamins: ['Vitamin D', 'B12', 'Omega-3', 'Selenium'],
      symptoms: ['Inflammation', 'Fatigue'],
      difficulty: 'Medium',
      cost: 'High',
      ingredients: ['Salmon', 'Broccoli', 'Carrots', 'Olive oil', 'Herbs'],
      pros: ['High protein', 'Omega-3 fatty acids', 'Anti-inflammatory', 'Heart healthy'],
      cons: ['Higher cost', 'Longer prep time', 'Fish allergen'],
      rating: 4.9,
      suitableFor: ['Inflammation', 'Heart health', 'Protein needs']
    },
    {
      id: 5,
      name: 'Chicken Soup',
      category: 'Lunch',
      prepTime: '20 min',
      servings: 1,
      calories: 280,
      nutrition: {
        protein: 22,
        carbs: 15,
        fat: 12,
        fiber: 3,
        sugar: 4,
        sodium: 400
      },
      vitamins: ['B6', 'Niacin', 'Phosphorus'],
      symptoms: ['Nausea', 'Cold symptoms'],
      difficulty: 'Easy',
      cost: 'Medium',
      ingredients: ['Chicken', 'Vegetables', 'Broth', 'Noodles'],
      pros: ['Comforting', 'Easy to digest', 'Good protein', 'Hydrating'],
      cons: ['Higher sodium', 'May contain gluten'],
      rating: 4.5,
      suitableFor: ['Nausea', 'Digestive issues', 'Comfort food']
    },
    {
      id: 6,
      name: 'Greek Yogurt Parfait',
      category: 'Breakfast',
      prepTime: '5 min',
      servings: 1,
      calories: 280,
      nutrition: {
        protein: 15,
        carbs: 30,
        fat: 8,
        fiber: 4,
        sugar: 22,
        sodium: 100
      },
      vitamins: ['Calcium', 'B12', 'Probiotics'],
      symptoms: ['Weight loss', 'Digestive issues'],
      difficulty: 'Easy',
      cost: 'Medium',
      ingredients: ['Greek yogurt', 'Berries', 'Granola', 'Honey'],
      pros: ['High protein', 'Probiotics', 'Quick to make', 'Good for digestion'],
      cons: ['High sugar', 'Dairy content'],
      rating: 4.4,
      suitableFor: ['Weight gain', 'Digestive health', 'Quick breakfast']
    }
  ];

  const addMealToComparison = (meal) => {
    if (selectedMeals.length >= 3) {
      toast.error('You can compare up to 3 meals at once');
      return;
    }
    if (selectedMeals.find(m => m.id === meal.id)) {
      toast.error('This meal is already selected for comparison');
      return;
    }
    setSelectedMeals([...selectedMeals, meal]);
  };

  const removeMealFromComparison = (mealId) => {
    setSelectedMeals(selectedMeals.filter(meal => meal.id !== mealId));
  };

  const clearComparison = () => {
    setSelectedMeals([]);
  };

  const getBestMeal = (metric) => {
    if (selectedMeals.length === 0) return null;
    
    switch (metric) {
      case 'protein':
        return selectedMeals.reduce((best, meal) => 
          meal.nutrition.protein > best.nutrition.protein ? meal : best
        );
      case 'calories':
        return selectedMeals.reduce((best, meal) => 
          meal.calories > best.calories ? meal : best
        );
      case 'fiber':
        return selectedMeals.reduce((best, meal) => 
          meal.nutrition.fiber > best.nutrition.fiber ? meal : best
        );
      case 'rating':
        return selectedMeals.reduce((best, meal) => 
          meal.rating > best.rating ? meal : best
        );
      case 'prepTime':
        return selectedMeals.reduce((best, meal) => 
          parseInt(meal.prepTime) < parseInt(best.prepTime) ? meal : best
        );
      default:
        return selectedMeals[0];
    }
  };

  const ComparisonCard = ({ meal, isHighlighted = false }) => (
    <div className={`card ${isHighlighted ? 'ring-2 ring-primary-500 bg-primary-50' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{meal.name}</h3>
          <p className="text-sm text-gray-500">{meal.category}</p>
        </div>
        <button
          onClick={() => removeMealFromComparison(meal.id)}
          className="p-1 text-gray-400 hover:text-red-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>{meal.prepTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-gray-400" />
            <span>{meal.calories} cal</span>
          </div>
          <div className="flex items-center space-x-2">
            <ChefHat className="h-4 w-4 text-gray-400" />
            <span>{meal.difficulty}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span>{meal.servings} serving</span>
          </div>
        </div>

        {/* Nutrition */}
        {comparisonMode === 'nutrition' && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Nutrition</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Protein:</span>
                <span className={`font-medium ${getBestMeal('protein')?.id === meal.id ? 'text-green-600' : ''}`}>
                  {meal.nutrition.protein}g
                </span>
              </div>
              <div className="flex justify-between">
                <span>Carbs:</span>
                <span>{meal.nutrition.carbs}g</span>
              </div>
              <div className="flex justify-between">
                <span>Fat:</span>
                <span>{meal.nutrition.fat}g</span>
              </div>
              <div className="flex justify-between">
                <span>Fiber:</span>
                <span className={`font-medium ${getBestMeal('fiber')?.id === meal.id ? 'text-green-600' : ''}`}>
                  {meal.nutrition.fiber}g
                </span>
              </div>
              <div className="flex justify-between">
                <span>Sodium:</span>
                <span>{meal.nutrition.sodium}mg</span>
              </div>
            </div>
          </div>
        )}

        {/* Symptoms */}
        {comparisonMode === 'symptoms' && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Helps with:</h4>
            <div className="flex flex-wrap gap-1">
              {meal.symptoms.map((symptom, index) => (
                <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  {symptom}
                </span>
              ))}
            </div>
            <h4 className="font-medium text-gray-900 mb-2 mt-4">Suitable for:</h4>
            <div className="flex flex-wrap gap-1">
              {meal.suitableFor.map((condition, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                  {condition}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Overall */}
        {comparisonMode === 'overall' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Pros:</h4>
              <ul className="text-sm space-y-1">
                {meal.pros.map((pro, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Cons:</h4>
              <ul className="text-sm space-y-1">
                {meal.cons.map((con, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Rating:</span>
              <span className={`font-medium ${getBestMeal('rating')?.id === meal.id ? 'text-green-600' : ''}`}>
                {meal.rating}/5
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Cost:</span>
              <span>{meal.cost}</span>
            </div>
          </div>
        )}

        {/* Vitamins */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Rich in:</h4>
          <div className="flex flex-wrap gap-1">
            {meal.vitamins.map((vitamin, index) => (
              <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                {vitamin}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meal Comparison</h1>
          <p className="text-gray-600">
            Compare nutritional values and benefits of different meals side-by-side
          </p>
        </div>
        {selectedMeals.length > 0 && (
          <button
            onClick={clearComparison}
            className="mt-4 sm:mt-0 btn-secondary flex items-center space-x-2"
          >
            <X className="h-5 w-5" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Comparison Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white rounded-xl border border-gray-200">
        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          <Scale className="h-5 w-5 text-gray-400" />
          <span className="font-medium text-gray-700">Compare by:</span>
        </div>
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          {[
            { key: 'nutrition', label: 'Nutrition' },
            { key: 'symptoms', label: 'Symptoms' },
            { key: 'overall', label: 'Overall' }
          ].map((mode) => (
            <button
              key={mode.key}
              onClick={() => setComparisonMode(mode.key)}
              className={`px-4 py-2 text-sm font-medium ${
                comparisonMode === mode.key
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Meals Comparison */}
      {selectedMeals.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Comparing {selectedMeals.length} Meal{selectedMeals.length > 1 ? 's' : ''}</h2>
          
          <div className={`grid gap-6 ${
            selectedMeals.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
            selectedMeals.length === 2 ? 'grid-cols-1 lg:grid-cols-2' :
            'grid-cols-1 lg:grid-cols-3'
          }`}>
            {selectedMeals.map((meal, index) => (
              <ComparisonCard 
                key={meal.id} 
                meal={meal}
                isHighlighted={false}
              />
            ))}
          </div>

          {/* Quick Comparison Summary */}
          {selectedMeals.length > 1 && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Comparison</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Highest Protein</div>
                  <div className="font-medium text-green-600">{getBestMeal('protein')?.name}</div>
                  <div className="text-sm text-gray-500">{getBestMeal('protein')?.nutrition.protein}g</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Most Calories</div>
                  <div className="font-medium text-blue-600">{getBestMeal('calories')?.name}</div>
                  <div className="text-sm text-gray-500">{getBestMeal('calories')?.calories} cal</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Highest Fiber</div>
                  <div className="font-medium text-purple-600">{getBestMeal('fiber')?.name}</div>
                  <div className="text-sm text-gray-500">{getBestMeal('fiber')?.nutrition.fiber}g</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Quickest Prep</div>
                  <div className="font-medium text-orange-600">{getBestMeal('prepTime')?.name}</div>
                  <div className="text-sm text-gray-500">{getBestMeal('prepTime')?.prepTime}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Available Meals */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {selectedMeals.length === 0 ? 'Select Meals to Compare' : 'Add More Meals'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableMeals
            .filter(meal => !selectedMeals.find(selected => selected.id === meal.id))
            .map((meal) => (
              <div key={meal.id} className="card-hover">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{meal.name}</h3>
                    <p className="text-sm text-gray-500">{meal.category}</p>
                  </div>
                  <button
                    onClick={() => addMealToComparison(meal)}
                    className="p-2 text-primary-600 hover:bg-primary-100 rounded-lg transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                  <span>{meal.calories} cal</span>
                  <span>{meal.nutrition.protein}g protein</span>
                  <span>{meal.prepTime}</span>
                  <span>★ {meal.rating}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {meal.symptoms.slice(0, 2).map((symptom, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      {symptom}
                    </span>
                  ))}
                  {meal.symptoms.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{meal.symptoms.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MealComparison;