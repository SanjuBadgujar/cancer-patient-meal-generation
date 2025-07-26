import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Users, 
  Calendar, 
  TrendingUp, 
  ChefHat, 
  MessageCircle,
  Target,
  Activity,
  Zap,
  Clock
} from 'lucide-react';

const Dashboard = () => {
  const [patientData, setPatientData] = useState({
    name: 'Sarah Johnson',
    cancerType: 'Breast Cancer',
    stage: 'Stage II',
    lastMeal: '2 hours ago',
    dailyCalories: 1420,
    targetCalories: 1800,
    weeklyMeals: 18,
    targetMeals: 21
  });

  const quickStats = [
    {
      name: 'Daily Calories',
      value: `${patientData.dailyCalories}/${patientData.targetCalories}`,
      icon: Target,
      color: 'bg-blue-500',
      progress: (patientData.dailyCalories / patientData.targetCalories) * 100
    },
    {
      name: 'Weekly Meals',
      value: `${patientData.weeklyMeals}/${patientData.targetMeals}`,
      icon: Calendar,
      color: 'bg-green-500',
      progress: (patientData.weeklyMeals / patientData.targetMeals) * 100
    },
    {
      name: 'Nutrition Score',
      value: '85%',
      icon: Activity,
      color: 'bg-purple-500',
      progress: 85
    },
    {
      name: 'Energy Level',
      value: 'Good',
      icon: Zap,
      color: 'bg-yellow-500',
      progress: 75
    }
  ];

  const recentMeals = [
    {
      name: 'Quinoa Power Bowl',
      time: '2 hours ago',
      calories: 420,
      protein: '18g',
      type: 'Lunch'
    },
    {
      name: 'Green Smoothie',
      time: '5 hours ago',
      calories: 180,
      protein: '8g',
      type: 'Snack'
    },
    {
      name: 'Oatmeal with Berries',
      time: '8 hours ago',
      calories: 320,
      protein: '12g',
      type: 'Breakfast'
    }
  ];

  const upcomingMeals = [
    {
      name: 'Anti-inflammatory Salmon',
      time: 'In 2 hours',
      calories: 480,
      type: 'Dinner'
    },
    {
      name: 'Chamomile Tea with Honey',
      time: 'In 4 hours',
      calories: 45,
      type: 'Evening Snack'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, {patientData.name}!</h1>
            <p className="text-primary-100 mb-4">
              {patientData.cancerType} • {patientData.stage} • Last meal: {patientData.lastMeal}
            </p>
            <div className="flex space-x-4">
              <Link 
                to="/meal-planning" 
                className="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors"
              >
                Plan Today's Meals
              </Link>
              <Link 
                to="/chat-assistant" 
                className="border border-white text-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors"
              >
                Ask Nutrition Assistant
              </Link>
            </div>
          </div>
          <Heart className="h-16 w-16 text-primary-200" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
            </div>
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">{stat.name}</span>
                <span className="text-sm text-gray-500">{Math.round(stat.progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${stat.color}`}
                  style={{ width: `${stat.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Meals */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Meals</h2>
            <Link to="/meal-history" className="text-primary-600 hover:text-primary-700 font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentMeals.map((meal, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <ChefHat className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{meal.name}</h3>
                    <p className="text-sm text-gray-500">{meal.time} • {meal.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{meal.calories} cal</p>
                  <p className="text-sm text-gray-500">{meal.protein} protein</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Meals */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Meals</h2>
            <Link to="/meal-planning" className="text-primary-600 hover:text-primary-700 font-medium">
              Edit Plan
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingMeals.map((meal, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{meal.name}</h3>
                    <p className="text-sm text-gray-500">{meal.time} • {meal.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{meal.calories} cal</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/recipe-generator" className="card-hover">
          <div className="text-center">
            <div className="p-4 bg-orange-100 rounded-lg w-fit mx-auto mb-4">
              <ChefHat className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Generate Recipe</h3>
            <p className="text-gray-600">Create custom recipes based on your needs and preferences</p>
          </div>
        </Link>

        <Link to="/nutrition-tracker" className="card-hover">
          <div className="text-center">
            <div className="p-4 bg-purple-100 rounded-lg w-fit mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Nutrition</h3>
            <p className="text-gray-600">Monitor your daily nutrition intake and progress</p>
          </div>
        </Link>

        <Link to="/chat-assistant" className="card-hover">
          <div className="text-center">
            <div className="p-4 bg-blue-100 rounded-lg w-fit mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ask Assistant</h3>
            <p className="text-gray-600">Get personalized nutrition advice and meal suggestions</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;