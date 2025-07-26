import React, { useState } from 'react';
import { ChefHat, Wand2, Clock, Users, Target, Utensils, RefreshCw, Save, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

const RecipeGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipeFilters, setRecipeFilters] = useState({
    mealType: 'breakfast',
    cuisine: 'mediterranean',
    prepTime: '30',
    servings: '2',
    calories: '400',
    symptoms: ['fatigue'],
    dietaryRestrictions: ['gluten-free'],
    excludeIngredients: '',
    includeIngredients: ''
  });

  const [generatedRecipe, setGeneratedRecipe] = useState({
    name: 'Anti-Inflammatory Quinoa Breakfast Bowl',
    description: 'A nourishing breakfast bowl packed with anti-inflammatory ingredients to help combat fatigue and support your recovery.',
    prepTime: '15 min',
    cookTime: '20 min',
    totalTime: '35 min',
    servings: 2,
    calories: 420,
    difficulty: 'Easy',
    symptoms: ['Fatigue', 'Inflammation', 'Low appetite'],
    nutrition: {
      protein: '18g',
      carbs: '52g',
      fat: '12g',
      fiber: '8g',
      sugar: '12g',
      sodium: '180mg'
    },
    vitamins: ['Vitamin E', 'Vitamin K', 'B6', 'Folate', 'Magnesium', 'Iron'],
    ingredients: [
      { amount: '1 cup', item: 'quinoa, rinsed', note: 'High in protein and fiber' },
      { amount: '2 cups', item: 'unsweetened almond milk', note: 'Low calorie, easy to digest' },
      { amount: '1/2 cup', item: 'fresh blueberries', note: 'Rich in antioxidants' },
      { amount: '1/4 cup', item: 'chopped walnuts', note: 'Omega-3 fatty acids' },
      { amount: '2 tbsp', item: 'ground flaxseed', note: 'Anti-inflammatory properties' },
      { amount: '1 tsp', item: 'cinnamon', note: 'Anti-inflammatory spice' },
      { amount: '2 tbsp', item: 'honey', note: 'Natural sweetener, easier on stomach' },
      { amount: '1/2', item: 'banana, sliced', note: 'Potassium and natural sweetness' }
    ],
    instructions: [
      'Rinse quinoa thoroughly under cold water until water runs clear.',
      'In a medium saucepan, combine quinoa and almond milk. Bring to a boil.',
      'Reduce heat to low, cover, and simmer for 15-20 minutes until quinoa is tender and liquid is absorbed.',
      'Remove from heat and let stand for 5 minutes. Fluff with a fork.',
      'Stir in cinnamon and honey while quinoa is still warm.',
      'Divide quinoa between two bowls.',
      'Top each bowl with blueberries, sliced banana, walnuts, and ground flaxseed.',
      'Serve warm or at room temperature. Can be stored in refrigerator for up to 3 days.'
    ],
    tips: [
      'For easier digestion, soak quinoa for 30 minutes before cooking.',
      'If experiencing nausea, try serving at room temperature instead of hot.',
      'Add extra honey if you\'re experiencing taste changes from treatment.',
      'Prepare quinoa in larger batches for easy meal prep throughout the week.'
    ],
    modifications: [
      { issue: 'Dairy-free', solution: 'Recipe is already dairy-free using almond milk' },
      { issue: 'Nut allergies', solution: 'Replace walnuts with pumpkin seeds and almond milk with oat milk' },
      { issue: 'Low appetite', solution: 'Make smaller portions and add extra honey for more calories' },
      { issue: 'Mouth sores', solution: 'Blend into a smooth porridge consistency and serve lukewarm' }
    ]
  });

  const mealTypes = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snack' },
    { value: 'smoothie', label: 'Smoothie/Drink' }
  ];

  const cuisineTypes = [
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'asian', label: 'Asian' },
    { value: 'american', label: 'American' },
    { value: 'indian', label: 'Indian' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'italian', label: 'Italian' },
    { value: 'middle-eastern', label: 'Middle Eastern' }
  ];

  const symptomOptions = [
    { value: 'fatigue', label: 'Fatigue' },
    { value: 'nausea', label: 'Nausea' },
    { value: 'loss-of-appetite', label: 'Loss of Appetite' },
    { value: 'mouth-sores', label: 'Mouth Sores' },
    { value: 'constipation', label: 'Constipation' },
    { value: 'diarrhea', label: 'Diarrhea' },
    { value: 'taste-changes', label: 'Taste Changes' },
    { value: 'inflammation', label: 'Inflammation' }
  ];

  const restrictionOptions = [
    { value: 'gluten-free', label: 'Gluten-Free' },
    { value: 'dairy-free', label: 'Dairy-Free' },
    { value: 'nut-free', label: 'Nut-Free' },
    { value: 'low-sodium', label: 'Low Sodium' },
    { value: 'soft-foods', label: 'Soft Foods Only' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' }
  ];

  const generateRecipe = async () => {
    setIsGenerating(true);
    try {
      // Simulate AI recipe generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      toast.success('New recipe generated successfully!');
    } catch (error) {
      toast.error('Failed to generate recipe. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const saveRecipe = () => {
    toast.success('Recipe saved to your collection!');
  };

  const shareRecipe = () => {
    toast.success('Recipe link copied to clipboard!');
  };

  const modifyRecipe = (modification) => {
    toast.success(`Recipe modified: ${modification}`);
  };

  const handleFilterChange = (key, value) => {
    setRecipeFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleArrayFilterChange = (key, value, checked) => {
    setRecipeFilters(prev => ({
      ...prev,
      [key]: checked 
        ? [...prev[key], value]
        : prev[key].filter(item => item !== value)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Recipe Generator</h1>
          <p className="text-gray-600">
            Create personalized recipes tailored to your treatment needs and preferences
          </p>
        </div>
        <button
          onClick={generateRecipe}
          disabled={isGenerating}
          className="mt-4 sm:mt-0 btn-primary flex items-center space-x-2 px-6 py-3"
        >
          <Wand2 className="h-5 w-5" />
          <span>{isGenerating ? 'Generating Recipe...' : 'Generate New Recipe'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recipe Filters */}
        <div className="lg:col-span-1">
          <div className="card sticky top-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recipe Preferences</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meal Type</label>
                <select
                  value={recipeFilters.mealType}
                  onChange={(e) => handleFilterChange('mealType', e.target.value)}
                  className="input-field"
                >
                  {mealTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine Type</label>
                <select
                  value={recipeFilters.cuisine}
                  onChange={(e) => handleFilterChange('cuisine', e.target.value)}
                  className="input-field"
                >
                  {cuisineTypes.map(cuisine => (
                    <option key={cuisine.value} value={cuisine.value}>{cuisine.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prep Time (min)</label>
                  <input
                    type="number"
                    value={recipeFilters.prepTime}
                    onChange={(e) => handleFilterChange('prepTime', e.target.value)}
                    className="input-field"
                    min="5"
                    max="120"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Servings</label>
                  <input
                    type="number"
                    value={recipeFilters.servings}
                    onChange={(e) => handleFilterChange('servings', e.target.value)}
                    className="input-field"
                    min="1"
                    max="8"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Calories</label>
                <input
                  type="number"
                  value={recipeFilters.calories}
                  onChange={(e) => handleFilterChange('calories', e.target.value)}
                  className="input-field"
                  min="100"
                  max="1000"
                  step="50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Current Symptoms</label>
                <div className="space-y-2">
                  {symptomOptions.map(symptom => (
                    <label key={symptom.value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={recipeFilters.symptoms.includes(symptom.value)}
                        onChange={(e) => handleArrayFilterChange('symptoms', symptom.value, e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{symptom.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Dietary Restrictions</label>
                <div className="space-y-2">
                  {restrictionOptions.map(restriction => (
                    <label key={restriction.value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={recipeFilters.dietaryRestrictions.includes(restriction.value)}
                        onChange={(e) => handleArrayFilterChange('dietaryRestrictions', restriction.value, e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{restriction.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Include Ingredients</label>
                <input
                  type="text"
                  value={recipeFilters.includeIngredients}
                  onChange={(e) => handleFilterChange('includeIngredients', e.target.value)}
                  className="input-field"
                  placeholder="e.g., salmon, quinoa, blueberries"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exclude Ingredients</label>
                <input
                  type="text"
                  value={recipeFilters.excludeIngredients}
                  onChange={(e) => handleFilterChange('excludeIngredients', e.target.value)}
                  className="input-field"
                  placeholder="e.g., dairy, nuts, spicy foods"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Generated Recipe */}
        <div className="lg:col-span-2">
          <div className="card">
            {/* Recipe Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{generatedRecipe.name}</h2>
                <p className="text-gray-600 mb-4">{generatedRecipe.description}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {generatedRecipe.totalTime}
                  </span>
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {generatedRecipe.servings} servings
                  </span>
                  <span className="flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    {generatedRecipe.calories} cal
                  </span>
                  <span className="flex items-center">
                    <ChefHat className="h-4 w-4 mr-1" />
                    {generatedRecipe.difficulty}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button onClick={saveRecipe} className="p-2 text-gray-400 hover:text-primary-600">
                  <Save className="h-5 w-5" />
                </button>
                <button onClick={shareRecipe} className="p-2 text-gray-400 hover:text-primary-600">
                  <Share2 className="h-5 w-5" />
                </button>
                <button onClick={generateRecipe} className="p-2 text-gray-400 hover:text-primary-600">
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Symptoms Helped */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Helps with:</h3>
              <div className="flex flex-wrap gap-2">
                {generatedRecipe.symptoms.map((symptom, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {symptom}
                  </span>
                ))}
              </div>
            </div>

            {/* Nutrition Info */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Nutrition Per Serving</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(generatedRecipe.nutrition).map(([key, value]) => (
                  <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-semibold text-gray-900">{value}</div>
                    <div className="text-sm text-gray-600 capitalize">{key}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <h4 className="font-medium text-gray-700 mb-2">Rich in:</h4>
                <div className="flex flex-wrap gap-1">
                  {generatedRecipe.vitamins.map((vitamin, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {vitamin}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h3>
              <div className="space-y-3">
                {generatedRecipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium">{ingredient.amount}</span>
                      <span className="ml-2">{ingredient.item}</span>
                    </div>
                    <span className="text-xs text-gray-500 ml-4">{ingredient.note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Instructions</h3>
              <div className="space-y-3">
                {generatedRecipe.instructions.map((instruction, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <p className="text-gray-700">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tips for Cancer Patients</h3>
              <div className="space-y-2">
                {generatedRecipe.tips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <p className="text-gray-700 text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Recipe Modifications</h3>
              <div className="space-y-3">
                {generatedRecipe.modifications.map((modification, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{modification.issue}:</span>
                      <button
                        onClick={() => modifyRecipe(modification.issue)}
                        className="btn-secondary text-xs"
                      >
                        Apply
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{modification.solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeGenerator;