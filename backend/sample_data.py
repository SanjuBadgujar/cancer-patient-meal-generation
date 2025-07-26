"""
Sample data generator for the Cancer Patient Nutrition Platform
This script populates the database with sample recipes, meal plans, and nutrition data
"""

import json
from datetime import datetime, date, timedelta
from app import app, db, Recipe, PatientProfile, MealPlan, NutritionLog

def create_sample_recipes():
    """Create sample recipes for different cancer symptoms and dietary needs"""
    
    sample_recipes = [
        {
            "name": "Anti-Inflammatory Quinoa Bowl",
            "description": "A nutritious bowl packed with anti-inflammatory ingredients to help combat fatigue and inflammation",
            "category": "lunch",
            "prep_time": 15,
            "cook_time": 20,
            "servings": 2,
            "difficulty": "Easy",
            "calories": 420,
            "nutrition_data": {
                "protein": "18g",
                "carbs": "52g",
                "fat": "12g",
                "fiber": "8g",
                "sugar": "8g",
                "sodium": "180mg"
            },
            "ingredients": [
                {"amount": "1 cup", "item": "quinoa, rinsed", "note": "High in protein and fiber"},
                {"amount": "2 cups", "item": "vegetable broth", "note": "Low sodium preferred"},
                {"amount": "1/2 cup", "item": "cherry tomatoes, halved", "note": "Rich in lycopene"},
                {"amount": "1/4 cup", "item": "cucumber, diced", "note": "Hydrating and cooling"},
                {"amount": "2 tbsp", "item": "olive oil", "note": "Healthy monounsaturated fats"},
                {"amount": "1 tbsp", "item": "lemon juice", "note": "Vitamin C and flavor enhancer"},
                {"amount": "1/4 cup", "item": "fresh herbs (parsley, mint)", "note": "Anti-inflammatory compounds"}
            ],
            "instructions": [
                "Rinse quinoa thoroughly under cold water",
                "Bring vegetable broth to a boil in a medium saucepan",
                "Add quinoa, reduce heat to low, cover and simmer for 15 minutes",
                "Remove from heat and let stand 5 minutes, then fluff with a fork",
                "Meanwhile, prepare vegetables and herbs",
                "Whisk together olive oil and lemon juice",
                "Combine quinoa with vegetables and herbs",
                "Drizzle with dressing and toss gently",
                "Serve at room temperature or chilled"
            ],
            "symptoms_helped": ["Fatigue", "Inflammation", "Loss of appetite"],
            "dietary_tags": ["Gluten-free", "Vegetarian", "Dairy-free"]
        },
        {
            "name": "Gentle Ginger Chicken Soup",
            "description": "A soothing soup perfect for nausea relief with easy-to-digest ingredients",
            "category": "lunch",
            "prep_time": 10,
            "cook_time": 25,
            "servings": 4,
            "difficulty": "Easy",
            "calories": 220,
            "nutrition_data": {
                "protein": "25g",
                "carbs": "15g",
                "fat": "8g",
                "fiber": "2g",
                "sugar": "4g",
                "sodium": "650mg"
            },
            "ingredients": [
                {"amount": "1 lb", "item": "boneless chicken breast", "note": "Lean protein source"},
                {"amount": "6 cups", "item": "low-sodium chicken broth", "note": "Hydrating base"},
                {"amount": "1 inch", "item": "fresh ginger, sliced", "note": "Natural nausea remedy"},
                {"amount": "2", "item": "carrots, sliced", "note": "Easy to digest"},
                {"amount": "2", "item": "celery stalks, chopped", "note": "Mild flavor"},
                {"amount": "1/2 cup", "item": "rice noodles", "note": "Gluten-free option"},
                {"amount": "1 tsp", "item": "turmeric", "note": "Anti-inflammatory spice"}
            ],
            "instructions": [
                "Place chicken breast in a large pot with broth and ginger",
                "Bring to a boil, then reduce heat and simmer for 15 minutes",
                "Remove chicken and shred when cool enough to handle",
                "Add carrots and celery to the broth, simmer 8 minutes",
                "Add rice noodles and cook according to package directions",
                "Return shredded chicken to pot",
                "Stir in turmeric and season lightly with salt",
                "Serve warm in small portions"
            ],
            "symptoms_helped": ["Nausea", "Loss of appetite", "Digestive issues"],
            "dietary_tags": ["Gluten-free", "Low-fat", "Easy-digest"]
        },
        {
            "name": "High-Protein Berry Smoothie",
            "description": "A nutrient-dense smoothie perfect for maintaining weight and energy levels",
            "category": "snack",
            "prep_time": 5,
            "cook_time": 0,
            "servings": 1,
            "difficulty": "Easy",
            "calories": 380,
            "nutrition_data": {
                "protein": "25g",
                "carbs": "45g",
                "fat": "8g",
                "fiber": "8g",
                "sugar": "32g",
                "sodium": "120mg"
            },
            "ingredients": [
                {"amount": "1 cup", "item": "frozen mixed berries", "note": "High in antioxidants"},
                {"amount": "1 scoop", "item": "vanilla protein powder", "note": "Muscle maintenance"},
                {"amount": "1 cup", "item": "unsweetened almond milk", "note": "Low calorie base"},
                {"amount": "1 tbsp", "item": "almond butter", "note": "Healthy fats"},
                {"amount": "1/2", "item": "frozen banana", "note": "Natural sweetness"},
                {"amount": "1 tbsp", "item": "ground flaxseed", "note": "Omega-3 fatty acids"},
                {"amount": "1 tsp", "item": "honey", "note": "Optional sweetener"}
            ],
            "instructions": [
                "Add all ingredients to a high-speed blender",
                "Blend on high for 60-90 seconds until smooth",
                "Add more almond milk if needed for desired consistency",
                "Taste and adjust sweetness with honey if needed",
                "Serve immediately in a chilled glass",
                "Can be made ahead and stored in refrigerator for up to 24 hours"
            ],
            "symptoms_helped": ["Weight loss", "Fatigue", "Loss of appetite"],
            "dietary_tags": ["Gluten-free", "Dairy-free", "High-protein"]
        },
        {
            "name": "Soft Scrambled Eggs with Avocado",
            "description": "Gentle, protein-rich breakfast perfect for sensitive digestion",
            "category": "breakfast",
            "prep_time": 5,
            "cook_time": 8,
            "servings": 1,
            "difficulty": "Easy",
            "calories": 320,
            "nutrition_data": {
                "protein": "18g",
                "carbs": "8g",
                "fat": "24g",
                "fiber": "6g",
                "sugar": "2g",
                "sodium": "280mg"
            },
            "ingredients": [
                {"amount": "2", "item": "large eggs", "note": "Complete protein source"},
                {"amount": "1/2", "item": "ripe avocado, sliced", "note": "Healthy monounsaturated fats"},
                {"amount": "1 tbsp", "item": "butter or olive oil", "note": "For cooking"},
                {"amount": "2 tbsp", "item": "milk", "note": "Makes eggs creamier"},
                {"amount": "1 slice", "item": "whole grain toast", "note": "Optional base"},
                {"amount": "to taste", "item": "salt and pepper", "note": "Light seasoning"}
            ],
            "instructions": [
                "Crack eggs into a bowl and whisk with milk",
                "Heat butter in a non-stick pan over low heat",
                "Pour in egg mixture and let sit for 20 seconds",
                "Using a spatula, gently stir eggs every 20 seconds",
                "Continue until eggs are just set but still creamy",
                "Remove from heat while slightly underdone",
                "Season lightly with salt and pepper",
                "Serve with sliced avocado on the side or on toast"
            ],
            "symptoms_helped": ["Mouth sores", "Digestive issues", "Weight loss"],
            "dietary_tags": ["Vegetarian", "Gluten-free", "Soft-foods"]
        },
        {
            "name": "Anti-Inflammatory Golden Milk",
            "description": "A warming, soothing drink with turmeric to help reduce inflammation",
            "category": "snack",
            "prep_time": 5,
            "cook_time": 5,
            "servings": 1,
            "difficulty": "Easy",
            "calories": 150,
            "nutrition_data": {
                "protein": "4g",
                "carbs": "18g",
                "fat": "6g",
                "fiber": "1g",
                "sugar": "15g",
                "sodium": "100mg"
            },
            "ingredients": [
                {"amount": "1 cup", "item": "unsweetened coconut milk", "note": "Creamy, dairy-free base"},
                {"amount": "1/2 tsp", "item": "ground turmeric", "note": "Anti-inflammatory compound"},
                {"amount": "1/4 tsp", "item": "ground ginger", "note": "Digestive aid"},
                {"amount": "1/8 tsp", "item": "ground cinnamon", "note": "Blood sugar support"},
                {"amount": "pinch", "item": "black pepper", "note": "Enhances turmeric absorption"},
                {"amount": "1 tbsp", "item": "honey", "note": "Natural sweetener"},
                {"amount": "1/2 tsp", "item": "vanilla extract", "note": "Flavor enhancer"}
            ],
            "instructions": [
                "Heat coconut milk in a small saucepan over medium heat",
                "Whisk in turmeric, ginger, cinnamon, and black pepper",
                "Heat until steaming but not boiling, about 3-4 minutes",
                "Remove from heat and whisk in honey and vanilla",
                "Strain through a fine-mesh sieve if desired",
                "Serve warm in a mug",
                "Can be made ahead and reheated gently"
            ],
            "symptoms_helped": ["Inflammation", "Sleep issues", "Digestive issues"],
            "dietary_tags": ["Dairy-free", "Gluten-free", "Vegan"]
        }
    ]
    
    for recipe_data in sample_recipes:
        recipe = Recipe(
            name=recipe_data["name"],
            description=recipe_data["description"],
            category=recipe_data["category"],
            prep_time=recipe_data["prep_time"],
            cook_time=recipe_data["cook_time"],
            servings=recipe_data["servings"],
            difficulty=recipe_data["difficulty"],
            calories=recipe_data["calories"],
            nutrition_data=json.dumps(recipe_data["nutrition_data"]),
            ingredients=json.dumps(recipe_data["ingredients"]),
            instructions=json.dumps(recipe_data["instructions"]),
            symptoms_helped=json.dumps(recipe_data["symptoms_helped"]),
            dietary_tags=json.dumps(recipe_data["dietary_tags"]),
            rating=4.5,
            rating_count=12
        )
        db.session.add(recipe)
    
    print(f"Created {len(sample_recipes)} sample recipes")

def create_sample_patient():
    """Create a sample patient profile"""
    
    patient = PatientProfile(
        name="Sarah Johnson",
        age=45,
        gender="female",
        weight=65.0,
        height=165.0,
        cancer_type="breast",
        stage="stage-ii",
        caloric_needs=1800,
        dietary_preference="vegetarian",
        symptoms=json.dumps(["fatigue", "nausea", "loss-of-appetite"]),
        dietary_restrictions=json.dumps(["gluten-free"]),
        allergies="Tree nuts",
        activity_level="moderate"
    )
    
    db.session.add(patient)
    db.session.commit()
    
    print(f"Created sample patient: {patient.name} (ID: {patient.id})")
    return patient.id

def create_sample_nutrition_logs(patient_id):
    """Create sample nutrition logs for the past week"""
    
    sample_logs = []
    
    # Generate logs for the past 7 days
    for i in range(7):
        log_date = date.today() - timedelta(days=i)
        
        # Sample meals for each day
        daily_meals = [
            {
                "food_name": "Anti-Inflammatory Oatmeal Bowl",
                "calories": 320,
                "protein": 12.0,
                "carbs": 45.0,
                "fat": 8.0,
                "fiber": 6.0,
                "meal_type": "breakfast",
                "rating": 5,
                "vitamins": ["B1", "B6", "Iron", "Magnesium"]
            },
            {
                "food_name": "High-Protein Berry Smoothie",
                "calories": 380,
                "protein": 25.0,
                "carbs": 45.0,
                "fat": 8.0,
                "fiber": 8.0,
                "meal_type": "snack",
                "rating": 4,
                "vitamins": ["Vitamin C", "Antioxidants", "Omega-3"]
            },
            {
                "food_name": "Gentle Ginger Chicken Soup",
                "calories": 220,
                "protein": 25.0,
                "carbs": 15.0,
                "fat": 8.0,
                "fiber": 2.0,
                "meal_type": "lunch",
                "rating": 5,
                "vitamins": ["B6", "Niacin", "Zinc"]
            },
            {
                "food_name": "Anti-Inflammatory Golden Milk",
                "calories": 150,
                "protein": 4.0,
                "carbs": 18.0,
                "fat": 6.0,
                "fiber": 1.0,
                "meal_type": "snack",
                "rating": 4,
                "vitamins": ["Turmeric", "Ginger"]
            },
            {
                "food_name": "Baked Salmon with Vegetables",
                "calories": 480,
                "protein": 35.0,
                "carbs": 20.0,
                "fat": 25.0,
                "fiber": 5.0,
                "meal_type": "dinner",
                "rating": 5,
                "vitamins": ["Vitamin D", "B12", "Omega-3", "Selenium"]
            }
        ]
        
        for meal in daily_meals:
            nutrition_log = NutritionLog(
                patient_id=patient_id,
                date=log_date,
                food_name=meal["food_name"],
                calories=meal["calories"],
                protein=meal["protein"],
                carbs=meal["carbs"],
                fat=meal["fat"],
                fiber=meal["fiber"],
                vitamins=json.dumps(meal["vitamins"]),
                meal_type=meal["meal_type"],
                rating=meal["rating"],
                notes=f"Day {8-i} meal log"
            )
            sample_logs.append(nutrition_log)
    
    db.session.add_all(sample_logs)
    db.session.commit()
    
    print(f"Created {len(sample_logs)} sample nutrition logs")

def populate_sample_data():
    """Main function to populate all sample data"""
    
    with app.app_context():
        # Create tables if they don't exist
        db.create_all()
        
        # Check if data already exists
        if Recipe.query.first() or PatientProfile.query.first():
            print("Sample data already exists. Skipping population.")
            return
        
        print("Populating sample data...")
        
        # Create sample recipes
        create_sample_recipes()
        
        # Create sample patient
        patient_id = create_sample_patient()
        
        # Create sample nutrition logs
        create_sample_nutrition_logs(patient_id)
        
        print("Sample data population completed successfully!")
        print("\nYou can now:")
        print("1. View the patient profile")
        print("2. Explore sample recipes")
        print("3. Check nutrition analytics")
        print("4. Generate new meal plans")
        print("5. Chat with the AI assistant")

if __name__ == "__main__":
    populate_sample_data()