# Cancer Patient Nutrition Platform

A comprehensive AI-powered nutrition platform designed specifically for cancer patients to help manage their nutritional needs during treatment and recovery.

## 🌟 Features

### Core Features
- **Patient Profile Management**: Complete health profiles with cancer type, stage, symptoms, and dietary restrictions
- **AI-Powered Meal Planning**: Personalized daily and weekly meal plans based on patient needs
- **Recipe Generator**: GPT-powered custom recipe creation with symptom-specific considerations
- **Nutrition Tracking**: Comprehensive tracking of daily nutrition intake with charts and analytics
- **Meal History**: Save and export successful meal plans with PDF generation
- **Meal Comparison**: Side-by-side nutritional analysis of different meal options

### Advanced AI Features
- **Chat Assistant**: Conversational nutrition guidance with context-aware responses
- **Recipe Modification**: AI-powered ingredient swapping and dietary adaptation
- **Symptom-Based Filtering**: Smart meal recommendations based on treatment side effects
- **ML Meal Ratings**: Learning system that improves meal matching over time

### Data & Analytics
- **Interactive Charts**: Visual nutrition progress tracking using Chart.js
- **PDF Export**: Professional meal plan and nutrition reports
- **Progress Monitoring**: Weekly and monthly nutrition trends
- **Custom Analytics**: Personalized insights based on patient data

## 🏗️ Technology Stack

### Frontend
- **React 18**: Modern UI with hooks and functional components
- **Tailwind CSS**: Utility-first CSS framework for beautiful styling
- **Chart.js**: Interactive charts for nutrition analytics
- **React Router**: Client-side routing
- **Axios**: HTTP client for API communication
- **React Hook Form**: Form handling with validation

### Backend
- **Flask**: Python web framework
- **SQLAlchemy**: Database ORM
- **OpenAI GPT**: AI-powered recipe generation and chat
- **SQLite**: Development database (PostgreSQL recommended for production)
- **Pandas & NumPy**: Data analysis and processing
- **scikit-learn**: Machine learning for meal recommendations

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cancer-patient-meal-generation
   ```

2. **Frontend Setup**
   ```bash
   npm install
   ```

3. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env file with your API keys
   ```

5. **Database Setup**
   ```bash
   cd backend
   python app.py  # This will create the SQLite database
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   python app.py
   ```
   Backend will run on http://localhost:5000

2. **Start the Frontend Development Server**
   ```bash
   npm start
   ```
   Frontend will run on http://localhost:3000

## 📱 Usage Guide

### Setting Up a Patient Profile
1. Navigate to the Patient Profile page
2. Fill in comprehensive health information:
   - Basic demographics (age, gender, weight, height)
   - Cancer type and stage
   - Current symptoms
   - Dietary restrictions and preferences
   - Caloric needs and activity level

### Generating Meal Plans
1. Go to Meal Planning
2. Select date and view type (daily/weekly)
3. Click "Generate New Plan" for AI-powered recommendations
4. Customize individual meals as needed
5. Export to PDF for easy reference

### Using the Recipe Generator
1. Access the Recipe Generator
2. Set preferences:
   - Meal type and cuisine
   - Preparation time and servings
   - Current symptoms to address
   - Dietary restrictions
   - Include/exclude specific ingredients
3. Generate AI-powered recipes with detailed instructions
4. Save favorites for future use

### Tracking Nutrition
1. Visit Nutrition Tracker
2. Log daily meals and intake
3. View progress charts and analytics
4. Export detailed nutrition reports
5. Monitor vitamin and mineral intake

### Chat Assistant
1. Open the Chat Assistant
2. Ask questions about:
   - Symptom-specific meal suggestions
   - Recipe modifications
   - Nutrition advice
   - Treatment-related dietary concerns
3. Get personalized, context-aware responses

## 🔧 API Documentation

### Authentication
Currently using session-based authentication. JWT implementation recommended for production.

### Key Endpoints

#### Patient Management
- `POST /api/patient/profile` - Create/update patient profile
- `GET /api/patient/profile/{id}` - Get patient profile

#### Recipe Generation
- `POST /api/recipe/generate` - Generate AI-powered recipe
- `GET /api/recipes/search` - Search existing recipes
- `GET /api/recipe/{id}` - Get recipe details

#### Meal Planning
- `POST /api/meal-plan/generate` - Generate meal plan
- `GET /api/meal-plan/{patient_id}` - Get saved meal plans

#### Nutrition Tracking
- `POST /api/nutrition/log` - Log nutrition intake
- `GET /api/nutrition/analytics/{patient_id}` - Get nutrition analytics

#### Chat Assistant
- `POST /api/chat` - Chat with AI assistant

## 🎨 UI/UX Features

### Design Principles
- **Accessibility**: High contrast, readable fonts, keyboard navigation
- **Mobile-First**: Responsive design for all devices
- **Intuitive**: Clear navigation and user-friendly interfaces
- **Compassionate**: Warm colors and supportive messaging

### Key Components
- **Dashboard**: Overview of nutrition status and quick actions
- **Interactive Charts**: Real-time nutrition progress visualization
- **Smart Filters**: Context-aware meal and recipe filtering
- **Progress Indicators**: Visual feedback for nutrition goals
- **Export Features**: PDF generation for meal plans and reports

## 🔒 Security Considerations

### Data Privacy
- Patient health information is stored securely
- No sensitive data in logs or error messages
- API key management through environment variables

### Security Features
- Input validation and sanitization
- SQL injection prevention through ORM
- XSS protection in frontend
- Rate limiting on API endpoints (recommended)

## 🧪 Testing

### Frontend Testing
```bash
npm test
```

### Backend Testing
```bash
cd backend
python -m pytest tests/
```

## 📦 Deployment

### Production Considerations
1. **Database**: Migrate from SQLite to PostgreSQL
2. **Environment**: Set production environment variables
3. **Security**: Implement JWT authentication
4. **Monitoring**: Add application monitoring and logging
5. **Scaling**: Consider containerization with Docker

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### Development Guidelines
- Follow React best practices
- Use TypeScript for new components (migration in progress)
- Write comprehensive tests
- Follow PEP 8 for Python code
- Document new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help
- Check the [Issues](../../issues) page for known problems
- Create a new issue for bug reports or feature requests
- Contact the development team for urgent issues

### Medical Disclaimer
This platform provides nutritional guidance and should not replace professional medical advice. Always consult with healthcare providers before making significant dietary changes during cancer treatment.

## 🙏 Acknowledgments

- OpenAI for GPT-powered recipe generation
- Cancer nutrition research community
- Healthcare professionals who provided domain expertise
- Open source community for excellent libraries and tools

## 🔮 Future Enhancements

### Planned Features
- **Mobile App**: Native iOS and Android applications
- **Telehealth Integration**: Connect with healthcare providers
- **Grocery Integration**: Automatic shopping list generation
- **Wearable Device Support**: Activity and sleep tracking
- **Community Features**: Patient support groups and recipe sharing
- **Multi-language Support**: Internationalization
- **Advanced Analytics**: Predictive modeling for nutrition outcomes

### Technical Improvements
- **Real-time Updates**: WebSocket implementation
- **Offline Support**: Progressive Web App features
- **Performance Optimization**: Caching and lazy loading
- **Enhanced Security**: Advanced authentication and authorization
- **API Versioning**: Backward compatibility management

---

**Made with ❤️ for cancer patients and their families**