import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import PatientProfile from './pages/PatientProfile';
import MealPlanning from './pages/MealPlanning';
import RecipeGenerator from './pages/RecipeGenerator';
import NutritionTracker from './pages/NutritionTracker';
import MealHistory from './pages/MealHistory';
import ChatAssistant from './pages/ChatAssistant';
import MealComparison from './pages/MealComparison';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<PatientProfile />} />
          <Route path="/meal-planning" element={<MealPlanning />} />
          <Route path="/recipe-generator" element={<RecipeGenerator />} />
          <Route path="/nutrition-tracker" element={<NutritionTracker />} />
          <Route path="/meal-history" element={<MealHistory />} />
          <Route path="/chat-assistant" element={<ChatAssistant />} />
          <Route path="/meal-comparison" element={<MealComparison />} />
        </Routes>
      </Layout>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default App;