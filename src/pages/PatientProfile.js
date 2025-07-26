import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { Save, User, Heart, AlertTriangle, Utensils } from 'lucide-react';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  age: yup.number().required('Age is required').min(18, 'Must be at least 18').max(120, 'Must be less than 120'),
  gender: yup.string().required('Gender is required'),
  weight: yup.number().required('Weight is required').min(20, 'Weight must be at least 20kg').max(300, 'Weight must be less than 300kg'),
  height: yup.number().required('Height is required').min(100, 'Height must be at least 100cm').max(250, 'Height must be less than 250cm'),
  cancerType: yup.string().required('Cancer type is required'),
  stage: yup.string().required('Cancer stage is required'),
  caloricNeeds: yup.number().required('Daily caloric needs are required').min(800, 'Must be at least 800 calories').max(4000, 'Must be less than 4000 calories'),
  dietaryPreference: yup.string().required('Dietary preference is required'),
});

const PatientProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: 'Sarah Johnson',
      age: 45,
      gender: 'female',
      weight: 65,
      height: 165,
      cancerType: 'breast',
      stage: 'stage-ii',
      caloricNeeds: 1800,
      dietaryPreference: 'vegetarian',
      symptoms: ['fatigue', 'nausea'],
      dietaryRestrictions: ['gluten-free'],
      allergies: [],
      activityLevel: 'moderate'
    }
  });

  const cancerTypes = [
    { value: 'breast', label: 'Breast Cancer' },
    { value: 'colon', label: 'Colon Cancer' },
    { value: 'lung', label: 'Lung Cancer' },
    { value: 'prostate', label: 'Prostate Cancer' },
    { value: 'ovarian', label: 'Ovarian Cancer' },
    { value: 'pancreatic', label: 'Pancreatic Cancer' },
    { value: 'leukemia', label: 'Leukemia' },
    { value: 'lymphoma', label: 'Lymphoma' },
    { value: 'other', label: 'Other' }
  ];

  const stages = [
    { value: 'stage-i', label: 'Stage I' },
    { value: 'stage-ii', label: 'Stage II' },
    { value: 'stage-iii', label: 'Stage III' },
    { value: 'stage-iv', label: 'Stage IV' }
  ];

  const symptoms = [
    { value: 'fatigue', label: 'Fatigue' },
    { value: 'nausea', label: 'Nausea' },
    { value: 'loss-of-appetite', label: 'Loss of Appetite' },
    { value: 'mouth-sores', label: 'Mouth Sores' },
    { value: 'constipation', label: 'Constipation' },
    { value: 'diarrhea', label: 'Diarrhea' },
    { value: 'taste-changes', label: 'Taste Changes' },
    { value: 'weight-loss', label: 'Weight Loss' },
    { value: 'dry-mouth', label: 'Dry Mouth' }
  ];

  const dietaryRestrictions = [
    { value: 'gluten-free', label: 'Gluten-Free' },
    { value: 'diabetic-friendly', label: 'Diabetic-Friendly' },
    { value: 'low-sodium', label: 'Low Sodium' },
    { value: 'low-fat', label: 'Low Fat' },
    { value: 'dairy-free', label: 'Dairy-Free' },
    { value: 'nut-free', label: 'Nut-Free' },
    { value: 'soft-foods', label: 'Soft Foods Only' }
  ];

  const dietaryPreferences = [
    { value: 'omnivore', label: 'Omnivore (No restrictions)' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'pescatarian', label: 'Pescatarian' }
  ];

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Profile data:', data);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const watchedSymptoms = watch('symptoms') || [];
  const watchedRestrictions = watch('dietaryRestrictions') || [];

  const handleCheckboxChange = (fieldName, value, checked) => {
    const currentValues = watch(fieldName) || [];
    if (checked) {
      setValue(fieldName, [...currentValues, value]);
    } else {
      setValue(fieldName, currentValues.filter(item => item !== value));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Profile</h1>
        <p className="text-gray-600">
          Complete your profile to receive personalized meal recommendations and nutrition guidance.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <div className="card">
          <div className="flex items-center mb-6">
            <User className="h-6 w-6 text-primary-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                {...register('name')}
                className="input-field"
                placeholder="Enter your full name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age *
              </label>
              <input
                type="number"
                {...register('age')}
                className="input-field"
                placeholder="Enter your age"
              />
              {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender *
              </label>
              <select {...register('gender')} className="input-field">
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg) *
              </label>
              <input
                type="number"
                step="0.1"
                {...register('weight')}
                className="input-field"
                placeholder="Enter your weight"
              />
              {errors.weight && <p className="mt-1 text-sm text-red-600">{errors.weight.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height (cm) *
              </label>
              <input
                type="number"
                {...register('height')}
                className="input-field"
                placeholder="Enter your height"
              />
              {errors.height && <p className="mt-1 text-sm text-red-600">{errors.height.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Caloric Needs *
              </label>
              <input
                type="number"
                {...register('caloricNeeds')}
                className="input-field"
                placeholder="Enter daily caloric needs"
              />
              {errors.caloricNeeds && <p className="mt-1 text-sm text-red-600">{errors.caloricNeeds.message}</p>}
            </div>
          </div>
        </div>

        {/* Cancer Information */}
        <div className="card">
          <div className="flex items-center mb-6">
            <Heart className="h-6 w-6 text-red-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Cancer Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cancer Type *
              </label>
              <select {...register('cancerType')} className="input-field">
                <option value="">Select cancer type</option>
                {cancerTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              {errors.cancerType && <p className="mt-1 text-sm text-red-600">{errors.cancerType.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cancer Stage *
              </label>
              <select {...register('stage')} className="input-field">
                <option value="">Select stage</option>
                {stages.map(stage => (
                  <option key={stage.value} value={stage.value}>{stage.label}</option>
                ))}
              </select>
              {errors.stage && <p className="mt-1 text-sm text-red-600">{errors.stage.message}</p>}
            </div>
          </div>
        </div>

        {/* Symptoms */}
        <div className="card">
          <div className="flex items-center mb-6">
            <AlertTriangle className="h-6 w-6 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Current Symptoms</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {symptoms.map(symptom => (
              <label key={symptom.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={watchedSymptoms.includes(symptom.value)}
                  onChange={(e) => handleCheckboxChange('symptoms', symptom.value, e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{symptom.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Dietary Information */}
        <div className="card">
          <div className="flex items-center mb-6">
            <Utensils className="h-6 w-6 text-green-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Dietary Information</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dietary Preference *
              </label>
              <select {...register('dietaryPreference')} className="input-field">
                <option value="">Select dietary preference</option>
                {dietaryPreferences.map(pref => (
                  <option key={pref.value} value={pref.value}>{pref.label}</option>
                ))}
              </select>
              {errors.dietaryPreference && <p className="mt-1 text-sm text-red-600">{errors.dietaryPreference.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Dietary Restrictions
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dietaryRestrictions.map(restriction => (
                  <label key={restriction.value} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={watchedRestrictions.includes(restriction.value)}
                      onChange={(e) => handleCheckboxChange('dietaryRestrictions', restriction.value, e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{restriction.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Food Allergies
              </label>
              <textarea
                {...register('allergies')}
                rows={3}
                className="input-field"
                placeholder="List any food allergies or intolerances (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activity Level
              </label>
              <select {...register('activityLevel')} className="input-field">
                <option value="sedentary">Sedentary (little to no exercise)</option>
                <option value="light">Light activity (light exercise 1-3 days/week)</option>
                <option value="moderate">Moderate activity (moderate exercise 3-5 days/week)</option>
                <option value="very-active">Very active (hard exercise 6-7 days/week)</option>
                <option value="extremely-active">Extremely active (very hard exercise, physical job)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary flex items-center space-x-2 px-6 py-3"
          >
            <Save className="h-5 w-5" />
            <span>{isLoading ? 'Saving...' : 'Save Profile'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientProfile;