import React, { useState } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { 
  Target, 
  TrendingUp, 
  Calendar, 
  Plus, 
  Download, 
  Activity,
  Zap,
  Heart,
  Apple
} from 'lucide-react';
import toast from 'react-hot-toast';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const NutritionTracker = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week'); // week, month, 3months
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const dailyTargets = {
    calories: 1800,
    protein: 120,
    carbs: 200,
    fat: 60,
    fiber: 25,
    water: 8 // glasses
  };

  const todayIntake = {
    calories: 1420,
    protein: 85,
    carbs: 160,
    fat: 48,
    fiber: 18,
    water: 6
  };

  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    calories: [1650, 1420, 1580, 1720, 1420, 1380, 1500],
    protein: [110, 85, 95, 125, 85, 78, 92],
    water: [7, 6, 8, 9, 6, 5, 7]
  };

  const macroData = {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [{
      data: [todayIntake.protein * 4, todayIntake.carbs * 4, todayIntake.fat * 9],
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
      borderWidth: 0
    }]
  };

  const calorieProgressData = {
    labels: weeklyData.labels,
    datasets: [
      {
        label: 'Daily Calories',
        data: weeklyData.calories,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Target',
        data: Array(7).fill(dailyTargets.calories),
        borderColor: '#EF4444',
        borderDash: [5, 5],
        pointRadius: 0
      }
    ]
  };

  const proteinProgressData = {
    labels: weeklyData.labels,
    datasets: [{
      label: 'Protein (g)',
      data: weeklyData.protein,
      backgroundColor: '#10B981',
      borderRadius: 4
    }]
  };

  const nutritionStats = [
    {
      name: 'Calories',
      current: todayIntake.calories,
      target: dailyTargets.calories,
      unit: 'cal',
      icon: Target,
      color: 'blue',
      progress: (todayIntake.calories / dailyTargets.calories) * 100
    },
    {
      name: 'Protein',
      current: todayIntake.protein,
      target: dailyTargets.protein,
      unit: 'g',
      icon: Activity,
      color: 'green',
      progress: (todayIntake.protein / dailyTargets.protein) * 100
    },
    {
      name: 'Hydration',
      current: todayIntake.water,
      target: dailyTargets.water,
      unit: 'glasses',
      icon: Heart,
      color: 'cyan',
      progress: (todayIntake.water / dailyTargets.water) * 100
    },
    {
      name: 'Fiber',
      current: todayIntake.fiber,
      target: dailyTargets.fiber,
      unit: 'g',
      icon: Apple,
      color: 'orange',
      progress: (todayIntake.fiber / dailyTargets.fiber) * 100
    }
  ];

  const recentMeals = [
    {
      name: 'Quinoa Power Bowl',
      time: '12:30 PM',
      type: 'Lunch',
      calories: 420,
      protein: 18,
      carbs: 35,
      fat: 15
    },
    {
      name: 'Green Smoothie',
      time: '10:00 AM',
      type: 'Snack',
      calories: 180,
      protein: 8,
      carbs: 25,
      fat: 2
    },
    {
      name: 'Oatmeal with Berries',
      time: '7:30 AM',
      type: 'Breakfast',
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 8
    }
  ];

  const vitaminsAndMinerals = [
    { name: 'Vitamin D', current: 15, target: 20, unit: 'mcg', status: 'low' },
    { name: 'Iron', current: 12, target: 18, unit: 'mg', status: 'low' },
    { name: 'Calcium', current: 850, target: 1200, unit: 'mg', status: 'moderate' },
    { name: 'Vitamin C', current: 90, target: 75, unit: 'mg', status: 'good' },
    { name: 'B12', current: 2.8, target: 2.4, unit: 'mcg', status: 'good' },
    { name: 'Folate', current: 380, target: 400, unit: 'mcg', status: 'good' }
  ];

  const addMeal = () => {
    toast.success('Meal logging feature coming soon!');
  };

  const exportReport = () => {
    toast.success('Nutrition report exported to PDF!');
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const macroChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nutrition Tracker</h1>
          <p className="text-gray-600">
            Monitor your daily nutrition intake and track progress towards your goals
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={addMeal}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Log Meal</span>
          </button>
          <button
            onClick={exportReport}
            className="btn-secondary flex items-center space-x-2"
          >
            <Download className="h-5 w-5" />
            <span>Export Report</span>
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
      </div>

      {/* Daily Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {nutritionStats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {stat.current}
                  <span className="text-sm font-normal text-gray-500">/{stat.target}</span>
                </div>
                <div className="text-sm text-gray-500">{stat.unit}</div>
              </div>
            </div>
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">{stat.name}</span>
                <span className="text-sm text-gray-500">{Math.round(stat.progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-${stat.color}-500`}
                  style={{ width: `${Math.min(stat.progress, 100)}%` }}
                ></div>
              </div>
            </div>
            <div className={`text-xs ${stat.progress >= 100 ? 'text-green-600' : stat.progress >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
              {stat.progress >= 100 ? 'Goal achieved!' : `${Math.round(stat.target - stat.current)} ${stat.unit} remaining`}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calorie Progress Chart */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Weekly Calorie Progress</h2>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div style={{ height: '300px' }}>
            <Line data={calorieProgressData} options={chartOptions} />
          </div>
        </div>

        {/* Macro Distribution */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Today's Macros</h2>
          <div style={{ height: '250px' }}>
            <Doughnut data={macroData} options={macroChartOptions} />
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Protein:</span>
              <span className="font-medium">{todayIntake.protein}g ({Math.round((todayIntake.protein * 4 / todayIntake.calories) * 100)}%)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Carbs:</span>
              <span className="font-medium">{todayIntake.carbs}g ({Math.round((todayIntake.carbs * 4 / todayIntake.calories) * 100)}%)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Fat:</span>
              <span className="font-medium">{todayIntake.fat}g ({Math.round((todayIntake.fat * 9 / todayIntake.calories) * 100)}%)</span>
            </div>
          </div>
        </div>

        {/* Protein Progress */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Weekly Protein Intake</h2>
          <div style={{ height: '200px' }}>
            <Bar data={proteinProgressData} options={chartOptions} />
          </div>
          <div className="mt-4 text-center">
            <div className="text-sm text-gray-600">
              Average: <span className="font-medium">{Math.round(weeklyData.protein.reduce((a, b) => a + b, 0) / weeklyData.protein.length)}g/day</span>
            </div>
          </div>
        </div>

        {/* Recent Meals */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Today's Meals</h2>
          <div className="space-y-4">
            {recentMeals.map((meal, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{meal.name}</h3>
                    <p className="text-sm text-gray-500">{meal.time} • {meal.type}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{meal.calories} cal</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                  <span>P: {meal.protein}g</span>
                  <span>C: {meal.carbs}g</span>
                  <span>F: {meal.fat}g</span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={addMeal}
            className="w-full mt-4 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary-300 hover:text-primary-600 transition-colors"
          >
            + Add meal
          </button>
        </div>

        {/* Vitamins & Minerals */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Vitamins & Minerals</h2>
          <div className="space-y-4">
            {vitaminsAndMinerals.map((nutrient, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{nutrient.name}</span>
                  <span className="text-sm text-gray-500">
                    {nutrient.current}/{nutrient.target} {nutrient.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      nutrient.status === 'good' ? 'bg-green-500' :
                      nutrient.status === 'moderate' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min((nutrient.current / nutrient.target) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Weekly Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {Math.round(weeklyData.calories.reduce((a, b) => a + b, 0) / weeklyData.calories.length)}
            </div>
            <div className="text-sm text-gray-600">Average Daily Calories</div>
            <div className="text-xs text-gray-500 mt-1">
              Target: {dailyTargets.calories} cal/day
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {Math.round(weeklyData.protein.reduce((a, b) => a + b, 0) / weeklyData.protein.length)}g
            </div>
            <div className="text-sm text-gray-600">Average Daily Protein</div>
            <div className="text-xs text-gray-500 mt-1">
              Target: {dailyTargets.protein}g/day
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-600 mb-2">
              {Math.round(weeklyData.water.reduce((a, b) => a + b, 0) / weeklyData.water.length)}
            </div>
            <div className="text-sm text-gray-600">Average Daily Water (glasses)</div>
            <div className="text-xs text-gray-500 mt-1">
              Target: {dailyTargets.water} glasses/day
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionTracker;