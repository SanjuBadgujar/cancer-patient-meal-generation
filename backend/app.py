from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
import openai
import os
from dotenv import load_dotenv
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import joblib
import json

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///nutrition_platform.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key-here'

# Initialize database
db = SQLAlchemy(app)

# Set OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

# Database Models
class PatientProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(20), nullable=False)
    weight = db.Column(db.Float, nullable=False)
    height = db.Column(db.Float, nullable=False)
    cancer_type = db.Column(db.String(50), nullable=False)
    stage = db.Column(db.String(20), nullable=False)
    caloric_needs = db.Column(db.Integer, nullable=False)
    dietary_preference = db.Column(db.String(50), nullable=False)
    symptoms = db.Column(db.Text)  # JSON string
    dietary_restrictions = db.Column(db.Text)  # JSON string
    allergies = db.Column(db.Text)
    activity_level = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class MealPlan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient_profile.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    date = db.Column(db.Date, nullable=False)
    meal_type = db.Column(db.String(20), nullable=False)  # breakfast, lunch, dinner, snack
    recipe_data = db.Column(db.Text, nullable=False)  # JSON string
    calories = db.Column(db.Integer)
    protein = db.Column(db.Float)
    carbs = db.Column(db.Float)
    fat = db.Column(db.Float)
    fiber = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String(50))
    prep_time = db.Column(db.Integer)  # minutes
    cook_time = db.Column(db.Integer)  # minutes
    servings = db.Column(db.Integer)
    difficulty = db.Column(db.String(20))
    calories = db.Column(db.Integer)
    nutrition_data = db.Column(db.Text)  # JSON string
    ingredients = db.Column(db.Text, nullable=False)  # JSON string
    instructions = db.Column(db.Text, nullable=False)  # JSON string
    symptoms_helped = db.Column(db.Text)  # JSON string
    dietary_tags = db.Column(db.Text)  # JSON string (gluten-free, dairy-free, etc.)
    rating = db.Column(db.Float, default=0.0)
    rating_count = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class NutritionLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient_profile.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    meal_id = db.Column(db.Integer, db.ForeignKey('meal_plan.id'))
    food_name = db.Column(db.String(200), nullable=False)
    calories = db.Column(db.Integer, nullable=False)
    protein = db.Column(db.Float)
    carbs = db.Column(db.Float)
    fat = db.Column(db.Float)
    fiber = db.Column(db.Float)
    vitamins = db.Column(db.Text)  # JSON string
    meal_type = db.Column(db.String(20))
    rating = db.Column(db.Integer)  # 1-5 stars
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class ChatConversation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient_profile.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    response = db.Column(db.Text, nullable=False)
    message_type = db.Column(db.String(20), default='chat')  # chat, recipe_request, meal_planning
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Initialize database tables
with app.app_context():
    db.create_all()

# AI Recipe Generation System
class RecipeAI:
    def __init__(self):
        self.symptom_mappings = {
            'nausea': {
                'avoid': ['spicy', 'fatty', 'strong-smelling'],
                'prefer': ['bland', 'cold', 'ginger', 'crackers', 'toast'],
                'cooking_methods': ['steaming', 'boiling'],
                'temperature': 'cold or room temperature'
            },
            'fatigue': {
                'nutrients': ['iron', 'protein', 'complex carbs', 'b-vitamins'],
                'foods': ['lean meats', 'spinach', 'quinoa', 'eggs', 'nuts'],
                'avoid': ['processed foods', 'high sugar']
            },
            'mouth-sores': {
                'texture': ['soft', 'smooth', 'pureed'],
                'avoid': ['citrus', 'spicy', 'rough textures', 'alcohol'],
                'prefer': ['lukewarm', 'creamy', 'mild flavors']
            },
            'constipation': {
                'nutrients': ['fiber', 'water'],
                'foods': ['whole grains', 'fruits', 'vegetables', 'prunes'],
                'avoid': ['processed foods', 'dairy (if sensitive)']
            },
            'diarrhea': {
                'prefer': ['BRAT diet', 'bananas', 'rice', 'toast', 'applesauce'],
                'avoid': ['dairy', 'high-fiber', 'fatty foods', 'caffeine'],
                'nutrients': ['electrolytes', 'potassium']
            },
            'loss-of-appetite': {
                'strategy': ['small frequent meals', 'calorie-dense', 'appealing presentation'],
                'foods': ['smoothies', 'protein shakes', 'favorite foods'],
                'nutrients': ['protein', 'healthy fats']
            },
            'taste-changes': {
                'tips': ['enhance flavors', 'try new seasonings', 'cold foods'],
                'avoid': ['metallic utensils'],
                'prefer': ['plastic utensils', 'strong flavors', 'marinades']
            },
            'inflammation': {
                'foods': ['fatty fish', 'berries', 'leafy greens', 'turmeric', 'ginger'],
                'avoid': ['processed foods', 'refined sugars', 'trans fats'],
                'nutrients': ['omega-3', 'antioxidants']
            }
        }
        
        self.dietary_restrictions = {
            'gluten-free': {
                'avoid': ['wheat', 'barley', 'rye', 'spelt'],
                'substitutes': ['rice flour', 'almond flour', 'quinoa', 'rice']
            },
            'dairy-free': {
                'avoid': ['milk', 'cheese', 'butter', 'yogurt'],
                'substitutes': ['almond milk', 'coconut milk', 'dairy-free cheese', 'olive oil']
            },
            'nut-free': {
                'avoid': ['peanuts', 'tree nuts', 'nut oils'],
                'substitutes': ['seeds', 'seed butters']
            },
            'low-sodium': {
                'limit': 'sodium < 1500mg per day',
                'avoid': ['processed foods', 'canned soups', 'deli meats'],
                'seasonings': ['herbs', 'spices', 'lemon', 'vinegar']
            }
        }

    def generate_recipe_prompt(self, filters):
        """Generate a prompt for OpenAI based on user filters"""
        symptoms = filters.get('symptoms', [])
        dietary_restrictions = filters.get('dietary_restrictions', [])
        meal_type = filters.get('meal_type', 'lunch')
        cuisine = filters.get('cuisine', 'american')
        prep_time = filters.get('prep_time', 30)
        servings = filters.get('servings', 2)
        calories = filters.get('calories', 400)
        include_ingredients = filters.get('include_ingredients', '')
        exclude_ingredients = filters.get('exclude_ingredients', '')

        prompt = f"""Create a detailed recipe for a cancer patient with the following requirements:

Meal Type: {meal_type}
Cuisine: {cuisine}
Prep Time: Maximum {prep_time} minutes
Servings: {servings}
Target Calories: Around {calories} calories per serving
Current Symptoms: {', '.join(symptoms)}
Dietary Restrictions: {', '.join(dietary_restrictions)}
"""

        if include_ingredients:
            prompt += f"Must include ingredients: {include_ingredients}\n"
        
        if exclude_ingredients:
            prompt += f"Must avoid ingredients: {exclude_ingredients}\n"

        # Add symptom-specific guidance
        for symptom in symptoms:
            if symptom in self.symptom_mappings:
                mapping = self.symptom_mappings[symptom]
                prompt += f"\nFor {symptom}:\n"
                if 'prefer' in mapping:
                    prompt += f"- Prefer: {', '.join(mapping['prefer'])}\n"
                if 'avoid' in mapping:
                    prompt += f"- Avoid: {', '.join(mapping['avoid'])}\n"
                if 'texture' in mapping:
                    prompt += f"- Texture: {', '.join(mapping['texture'])}\n"

        # Add dietary restriction guidance
        for restriction in dietary_restrictions:
            if restriction in self.dietary_restrictions:
                mapping = self.dietary_restrictions[restriction]
                prompt += f"\nFor {restriction}:\n"
                if 'avoid' in mapping:
                    prompt += f"- Avoid: {', '.join(mapping['avoid'])}\n"
                if 'substitutes' in mapping:
                    prompt += f"- Use substitutes: {', '.join(mapping['substitutes'])}\n"

        prompt += """

Please provide the recipe in the following JSON format:
{
    "name": "Recipe Name",
    "description": "Brief description focusing on how it helps with the patient's symptoms",
    "prepTime": "15 min",
    "cookTime": "20 min",
    "totalTime": "35 min",
    "servings": 2,
    "calories": 420,
    "difficulty": "Easy/Medium/Hard",
    "nutrition": {
        "protein": "18g",
        "carbs": "52g",
        "fat": "12g",
        "fiber": "8g",
        "sugar": "12g",
        "sodium": "180mg"
    },
    "vitamins": ["Vitamin E", "Vitamin K", "B6", "Folate", "Magnesium", "Iron"],
    "ingredients": [
        {"amount": "1 cup", "item": "quinoa, rinsed", "note": "High in protein and fiber"},
        {"amount": "2 cups", "item": "unsweetened almond milk", "note": "Low calorie, easy to digest"}
    ],
    "instructions": [
        "Step 1 instruction",
        "Step 2 instruction"
    ],
    "tips": [
        "Tip for cancer patients",
        "Another helpful tip"
    ],
    "modifications": [
        {"issue": "Dairy-free", "solution": "Recipe is already dairy-free using almond milk"},
        {"issue": "Nut allergies", "solution": "Replace almond milk with oat milk"}
    ],
    "symptomsHelped": ["Fatigue", "Inflammation"],
    "suitableFor": ["Weight loss", "Fatigue", "Muscle maintenance"]
}

Make sure the recipe is specifically tailored for cancer patients, considering their unique nutritional needs and potential side effects from treatment."""

        return prompt

    def generate_recipe(self, filters):
        """Generate a recipe using OpenAI"""
        try:
            prompt = self.generate_recipe_prompt(filters)
            
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a specialized nutritionist and chef who creates recipes specifically for cancer patients. You understand the unique dietary needs, symptoms, and restrictions that cancer patients face during treatment."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=2000,
                temperature=0.7
            )
            
            recipe_text = response.choices[0].message.content
            
            # Try to parse JSON response
            try:
                # Extract JSON from the response if it's wrapped in text
                start_idx = recipe_text.find('{')
                end_idx = recipe_text.rfind('}') + 1
                if start_idx != -1 and end_idx != -1:
                    json_str = recipe_text[start_idx:end_idx]
                    recipe_data = json.loads(json_str)
                    return recipe_data
                else:
                    # Fallback: create structured response from text
                    return self._parse_text_recipe(recipe_text, filters)
            except json.JSONDecodeError:
                return self._parse_text_recipe(recipe_text, filters)
                
        except Exception as e:
            print(f"Error generating recipe: {e}")
            return self._get_fallback_recipe(filters)

    def _parse_text_recipe(self, text, filters):
        """Parse text response into structured format"""
        # This is a simplified parser - in production, you'd want more robust parsing
        return {
            "name": f"AI-Generated {filters.get('meal_type', 'meal').title()}",
            "description": "A nutritious meal designed for cancer patients",
            "prepTime": f"{filters.get('prep_time', 30)} min",
            "cookTime": "20 min",
            "totalTime": f"{int(filters.get('prep_time', 30)) + 20} min",
            "servings": filters.get('servings', 2),
            "calories": filters.get('calories', 400),
            "difficulty": "Medium",
            "nutrition": {
                "protein": "18g",
                "carbs": "45g",
                "fat": "12g",
                "fiber": "6g",
                "sugar": "8g",
                "sodium": "200mg"
            },
            "vitamins": ["B6", "Iron", "Folate"],
            "ingredients": [
                {"amount": "1 cup", "item": "main ingredient", "note": "Nutritious base"},
                {"amount": "1/2 cup", "item": "protein source", "note": "Essential amino acids"}
            ],
            "instructions": [
                "Prepare ingredients as needed",
                "Cook according to dietary requirements",
                "Serve at appropriate temperature"
            ],
            "tips": [
                "Adjust seasoning to taste preferences",
                "Serve at comfortable temperature for symptoms"
            ],
            "modifications": [
                {"issue": "Texture", "solution": "Blend for smoother consistency if needed"}
            ],
            "symptomsHelped": filters.get('symptoms', []),
            "suitableFor": ["General nutrition", "Cancer treatment support"]
        }

    def _get_fallback_recipe(self, filters):
        """Provide a fallback recipe if AI generation fails"""
        meal_type = filters.get('meal_type', 'lunch')
        
        fallback_recipes = {
            'breakfast': {
                "name": "Gentle Morning Oatmeal",
                "description": "A soothing breakfast that's easy on the stomach and provides sustained energy",
                "prepTime": "10 min",
                "cookTime": "5 min",
                "totalTime": "15 min",
                "servings": 1,
                "calories": 320,
                "difficulty": "Easy",
                "nutrition": {
                    "protein": "12g",
                    "carbs": "45g",
                    "fat": "8g",
                    "fiber": "6g",
                    "sugar": "12g",
                    "sodium": "150mg"
                },
                "vitamins": ["B1", "B6", "Iron", "Magnesium"],
                "ingredients": [
                    {"amount": "1/2 cup", "item": "rolled oats", "note": "High in fiber"},
                    {"amount": "1 cup", "item": "almond milk", "note": "Easy to digest"},
                    {"amount": "1 tbsp", "item": "honey", "note": "Natural sweetener"},
                    {"amount": "1/4 cup", "item": "blueberries", "note": "Antioxidants"}
                ],
                "instructions": [
                    "Combine oats and almond milk in a saucepan",
                    "Cook over medium heat for 5 minutes, stirring occasionally",
                    "Stir in honey",
                    "Top with blueberries and serve warm"
                ],
                "tips": [
                    "Let cool slightly if experiencing mouth sensitivity",
                    "Add extra liquid if texture is too thick"
                ],
                "modifications": [
                    {"issue": "Nausea", "solution": "Serve at room temperature"},
                    {"issue": "Low appetite", "solution": "Make smaller portion with extra honey"}
                ],
                "symptomsHelped": ["Fatigue", "Digestive issues"],
                "suitableFor": ["Easy digestion", "Energy boost"]
            },
            # Add more fallback recipes for other meal types
        }
        
        return fallback_recipes.get(meal_type, fallback_recipes['breakfast'])

# Initialize AI system
recipe_ai = RecipeAI()

# Chat AI System
class NutritionChatAI:
    def __init__(self):
        self.system_prompt = """You are a specialized nutrition assistant for cancer patients. You provide compassionate, evidence-based nutrition advice tailored to cancer treatment side effects and recovery needs. 

Key principles:
1. Always consider the patient's current symptoms and treatment stage
2. Provide practical, actionable advice
3. Be empathetic and supportive
4. Recommend consulting with healthcare providers for medical concerns
5. Focus on nutrition strategies that help manage side effects
6. Suggest specific foods, recipes, and meal timing
7. Address common concerns like appetite loss, nausea, fatigue, etc.

Always ask clarifying questions if you need more information about symptoms, preferences, or current situation."""

    def get_response(self, message, patient_context=None):
        """Generate AI response to user message"""
        try:
            messages = [
                {"role": "system", "content": self.system_prompt}
            ]
            
            # Add patient context if available
            if patient_context:
                context_msg = f"Patient context: {patient_context.get('symptoms', [])} symptoms, {patient_context.get('cancer_type', 'cancer')} patient, dietary preferences: {patient_context.get('dietary_preference', 'none specified')}"
                messages.append({"role": "system", "content": context_msg})
            
            messages.append({"role": "user", "content": message})
            
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=messages,
                max_tokens=800,
                temperature=0.7
            )
            
            return response.choices[0].message.content
            
        except Exception as e:
            print(f"Error generating chat response: {e}")
            return "I apologize, but I'm having trouble responding right now. Please try asking your question again, or consult with your healthcare team for immediate nutrition guidance."

# Initialize chat AI
chat_ai = NutritionChatAI()

# API Routes

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "Cancer Nutrition Platform API is running"})

@app.route('/api/patient/profile', methods=['POST'])
def create_patient_profile():
    """Create or update patient profile"""
    try:
        data = request.json
        
        # Check if patient already exists (for updates)
        patient_id = data.get('id')
        if patient_id:
            patient = PatientProfile.query.get(patient_id)
        else:
            patient = PatientProfile()
        
        # Update patient data
        patient.name = data.get('name')
        patient.age = data.get('age')
        patient.gender = data.get('gender')
        patient.weight = data.get('weight')
        patient.height = data.get('height')
        patient.cancer_type = data.get('cancerType')
        patient.stage = data.get('stage')
        patient.caloric_needs = data.get('caloricNeeds')
        patient.dietary_preference = data.get('dietaryPreference')
        patient.symptoms = json.dumps(data.get('symptoms', []))
        patient.dietary_restrictions = json.dumps(data.get('dietaryRestrictions', []))
        patient.allergies = data.get('allergies', '')
        patient.activity_level = data.get('activityLevel', 'moderate')
        patient.updated_at = datetime.utcnow()
        
        if not patient_id:
            db.session.add(patient)
        
        db.session.commit()
        
        return jsonify({
            "success": True,
            "message": "Patient profile saved successfully",
            "patient_id": patient.id
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/patient/profile/<int:patient_id>', methods=['GET'])
def get_patient_profile(patient_id):
    """Get patient profile"""
    try:
        patient = PatientProfile.query.get_or_404(patient_id)
        
        return jsonify({
            "success": True,
            "profile": {
                "id": patient.id,
                "name": patient.name,
                "age": patient.age,
                "gender": patient.gender,
                "weight": patient.weight,
                "height": patient.height,
                "cancerType": patient.cancer_type,
                "stage": patient.stage,
                "caloricNeeds": patient.caloric_needs,
                "dietaryPreference": patient.dietary_preference,
                "symptoms": json.loads(patient.symptoms) if patient.symptoms else [],
                "dietaryRestrictions": json.loads(patient.dietary_restrictions) if patient.dietary_restrictions else [],
                "allergies": patient.allergies,
                "activityLevel": patient.activity_level,
                "createdAt": patient.created_at.isoformat(),
                "updatedAt": patient.updated_at.isoformat()
            }
        })
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/recipe/generate', methods=['POST'])
def generate_recipe():
    """Generate AI-powered recipe"""
    try:
        filters = request.json
        
        # Generate recipe using AI
        recipe = recipe_ai.generate_recipe(filters)
        
        # Save recipe to database
        new_recipe = Recipe(
            name=recipe['name'],
            description=recipe['description'],
            category=filters.get('meal_type', 'lunch'),
            prep_time=int(recipe['prepTime'].replace(' min', '')),
            cook_time=int(recipe.get('cookTime', '20 min').replace(' min', '')),
            servings=recipe['servings'],
            difficulty=recipe['difficulty'],
            calories=recipe['calories'],
            nutrition_data=json.dumps(recipe['nutrition']),
            ingredients=json.dumps(recipe['ingredients']),
            instructions=json.dumps(recipe['instructions']),
            symptoms_helped=json.dumps(recipe.get('symptomsHelped', [])),
            dietary_tags=json.dumps(filters.get('dietary_restrictions', []))
        )
        
        db.session.add(new_recipe)
        db.session.commit()
        
        return jsonify({
            "success": True,
            "recipe": recipe,
            "recipe_id": new_recipe.id
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/meal-plan/generate', methods=['POST'])
def generate_meal_plan():
    """Generate AI-powered meal plan"""
    try:
        data = request.json
        patient_id = data.get('patient_id')
        date = datetime.strptime(data.get('date'), '%Y-%m-%d').date()
        plan_type = data.get('type', 'daily')  # daily or weekly
        
        # Get patient profile for context
        patient = PatientProfile.query.get(patient_id)
        if not patient:
            return jsonify({"success": False, "error": "Patient not found"}), 404
        
        # Generate meal plan based on patient profile
        meal_types = ['breakfast', 'morning-snack', 'lunch', 'afternoon-snack', 'dinner', 'evening-snack']
        meal_plan = {}
        
        for meal_type in meal_types:
            # Create filters based on patient profile and meal type
            filters = {
                'meal_type': meal_type,
                'symptoms': json.loads(patient.symptoms) if patient.symptoms else [],
                'dietary_restrictions': json.loads(patient.dietary_restrictions) if patient.dietary_restrictions else [],
                'calories': patient.caloric_needs // 6 if 'snack' in meal_type else patient.caloric_needs // 3,
                'servings': 1,
                'prep_time': 15 if 'snack' in meal_type else 30
            }
            
            # Generate recipe for this meal
            recipe = recipe_ai.generate_recipe(filters)
            meal_plan[meal_type.replace('-', '_')] = recipe
        
        return jsonify({
            "success": True,
            "meal_plan": meal_plan,
            "date": date.isoformat()
        })
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/chat', methods=['POST'])
def chat_with_ai():
    """Chat with nutrition AI assistant"""
    try:
        data = request.json
        message = data.get('message')
        patient_id = data.get('patient_id')
        
        # Get patient context if provided
        patient_context = None
        if patient_id:
            patient = PatientProfile.query.get(patient_id)
            if patient:
                patient_context = {
                    'symptoms': json.loads(patient.symptoms) if patient.symptoms else [],
                    'cancer_type': patient.cancer_type,
                    'dietary_preference': patient.dietary_preference,
                    'dietary_restrictions': json.loads(patient.dietary_restrictions) if patient.dietary_restrictions else []
                }
        
        # Generate AI response
        response = chat_ai.get_response(message, patient_context)
        
        # Save conversation to database
        if patient_id:
            conversation = ChatConversation(
                patient_id=patient_id,
                message=message,
                response=response
            )
            db.session.add(conversation)
            db.session.commit()
        
        return jsonify({
            "success": True,
            "response": response,
            "timestamp": datetime.utcnow().isoformat()
        })
        
    except Exception as e:
        db.session.rollback() if patient_id else None
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/nutrition/log', methods=['POST'])
def log_nutrition():
    """Log nutrition intake"""
    try:
        data = request.json
        
        nutrition_log = NutritionLog(
            patient_id=data.get('patient_id'),
            date=datetime.strptime(data.get('date'), '%Y-%m-%d').date(),
            food_name=data.get('food_name'),
            calories=data.get('calories'),
            protein=data.get('protein'),
            carbs=data.get('carbs'),
            fat=data.get('fat'),
            fiber=data.get('fiber'),
            vitamins=json.dumps(data.get('vitamins', [])),
            meal_type=data.get('meal_type'),
            rating=data.get('rating'),
            notes=data.get('notes', '')
        )
        
        db.session.add(nutrition_log)
        db.session.commit()
        
        return jsonify({
            "success": True,
            "message": "Nutrition logged successfully",
            "log_id": nutrition_log.id
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/nutrition/analytics/<int:patient_id>', methods=['GET'])
def get_nutrition_analytics(patient_id):
    """Get nutrition analytics and trends"""
    try:
        days = request.args.get('days', 7, type=int)
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=days-1)
        
        # Get nutrition logs for the period
        logs = NutritionLog.query.filter(
            NutritionLog.patient_id == patient_id,
            NutritionLog.date >= start_date,
            NutritionLog.date <= end_date
        ).all()
        
        # Calculate daily totals
        daily_totals = {}
        for log in logs:
            date_str = log.date.isoformat()
            if date_str not in daily_totals:
                daily_totals[date_str] = {
                    'calories': 0,
                    'protein': 0,
                    'carbs': 0,
                    'fat': 0,
                    'fiber': 0,
                    'meals': []
                }
            
            daily_totals[date_str]['calories'] += log.calories
            daily_totals[date_str]['protein'] += log.protein or 0
            daily_totals[date_str]['carbs'] += log.carbs or 0
            daily_totals[date_str]['fat'] += log.fat or 0
            daily_totals[date_str]['fiber'] += log.fiber or 0
            daily_totals[date_str]['meals'].append({
                'name': log.food_name,
                'type': log.meal_type,
                'calories': log.calories,
                'rating': log.rating
            })
        
        # Calculate averages
        total_days = len(daily_totals)
        if total_days > 0:
            avg_calories = sum(day['calories'] for day in daily_totals.values()) / total_days
            avg_protein = sum(day['protein'] for day in daily_totals.values()) / total_days
        else:
            avg_calories = avg_protein = 0
        
        return jsonify({
            "success": True,
            "analytics": {
                "daily_totals": daily_totals,
                "averages": {
                    "calories": round(avg_calories, 1),
                    "protein": round(avg_protein, 1)
                },
                "period": {
                    "start_date": start_date.isoformat(),
                    "end_date": end_date.isoformat(),
                    "days": days
                }
            }
        })
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/recipes/search', methods=['GET'])
def search_recipes():
    """Search recipes by criteria"""
    try:
        query = request.args.get('q', '')
        category = request.args.get('category', '')
        symptoms = request.args.get('symptoms', '').split(',') if request.args.get('symptoms') else []
        dietary_tags = request.args.get('dietary_tags', '').split(',') if request.args.get('dietary_tags') else []
        max_prep_time = request.args.get('max_prep_time', type=int)
        
        # Build query
        recipes_query = Recipe.query
        
        if query:
            recipes_query = recipes_query.filter(
                Recipe.name.contains(query) | 
                Recipe.description.contains(query)
            )
        
        if category:
            recipes_query = recipes_query.filter(Recipe.category == category)
        
        if max_prep_time:
            recipes_query = recipes_query.filter(Recipe.prep_time <= max_prep_time)
        
        recipes = recipes_query.order_by(Recipe.rating.desc()).limit(20).all()
        
        # Format response
        recipe_list = []
        for recipe in recipes:
            recipe_data = {
                "id": recipe.id,
                "name": recipe.name,
                "description": recipe.description,
                "category": recipe.category,
                "prep_time": recipe.prep_time,
                "cook_time": recipe.cook_time,
                "servings": recipe.servings,
                "difficulty": recipe.difficulty,
                "calories": recipe.calories,
                "rating": recipe.rating,
                "rating_count": recipe.rating_count,
                "nutrition": json.loads(recipe.nutrition_data) if recipe.nutrition_data else {},
                "symptoms_helped": json.loads(recipe.symptoms_helped) if recipe.symptoms_helped else [],
                "dietary_tags": json.loads(recipe.dietary_tags) if recipe.dietary_tags else []
            }
            recipe_list.append(recipe_data)
        
        return jsonify({
            "success": True,
            "recipes": recipe_list,
            "total": len(recipe_list)
        })
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/recipe/<int:recipe_id>', methods=['GET'])
def get_recipe_details(recipe_id):
    """Get detailed recipe information"""
    try:
        recipe = Recipe.query.get_or_404(recipe_id)
        
        recipe_data = {
            "id": recipe.id,
            "name": recipe.name,
            "description": recipe.description,
            "category": recipe.category,
            "prep_time": recipe.prep_time,
            "cook_time": recipe.cook_time,
            "servings": recipe.servings,
            "difficulty": recipe.difficulty,
            "calories": recipe.calories,
            "rating": recipe.rating,
            "rating_count": recipe.rating_count,
            "nutrition": json.loads(recipe.nutrition_data) if recipe.nutrition_data else {},
            "ingredients": json.loads(recipe.ingredients) if recipe.ingredients else [],
            "instructions": json.loads(recipe.instructions) if recipe.instructions else [],
            "symptoms_helped": json.loads(recipe.symptoms_helped) if recipe.symptoms_helped else [],
            "dietary_tags": json.loads(recipe.dietary_tags) if recipe.dietary_tags else [],
            "created_at": recipe.created_at.isoformat()
        }
        
        return jsonify({
            "success": True,
            "recipe": recipe_data
        })
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)