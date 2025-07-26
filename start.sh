#!/bin/bash

# Cancer Patient Nutrition Platform - Startup Script
# This script starts both the frontend and backend services

set -e

echo "🌟 Starting Cancer Patient Nutrition Platform..."
echo "================================================"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if port is available
is_port_available() {
    ! nc -z localhost $1 2>/dev/null
}

# Check prerequisites
echo -e "${BLUE}Checking prerequisites...${NC}"

if ! command_exists node; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 16+ first.${NC}"
    exit 1
fi

if ! command_exists npm; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
fi

if ! command_exists python3; then
    echo -e "${RED}❌ Python 3 is not installed. Please install Python 3.8+ first.${NC}"
    exit 1
fi

if ! command_exists pip; then
    echo -e "${RED}❌ pip is not installed. Please install pip first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All prerequisites are installed${NC}"

# Check if ports are available
if ! is_port_available 3000; then
    echo -e "${YELLOW}⚠️  Port 3000 is already in use. The React app might already be running.${NC}"
fi

if ! is_port_available 5000; then
    echo -e "${YELLOW}⚠️  Port 5000 is already in use. The Flask app might already be running.${NC}"
fi

# Setup environment files if they don't exist
echo -e "${BLUE}Setting up environment files...${NC}"

if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file from template...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please edit .env file with your OpenAI API key before running the application${NC}"
fi

if [ ! -f backend/.env ]; then
    echo -e "${YELLOW}Creating backend/.env file from template...${NC}"
    cp backend/.env.example backend/.env
fi

# Install frontend dependencies
echo -e "${BLUE}Installing frontend dependencies...${NC}"
if [ ! -d "node_modules" ]; then
    npm install
else
    echo -e "${GREEN}✅ Frontend dependencies already installed${NC}"
fi

# Install backend dependencies
echo -e "${BLUE}Installing backend dependencies...${NC}"
cd backend
if [ ! -d "venv" ]; then
    echo -e "${YELLOW}Creating Python virtual environment...${NC}"
    python3 -m venv venv
fi

echo -e "${YELLOW}Activating virtual environment...${NC}"
source venv/bin/activate

pip install -r requirements.txt

# Setup database and sample data
echo -e "${BLUE}Setting up database...${NC}"
python sample_data.py

cd ..

# Start the applications
echo -e "${GREEN}🚀 Starting applications...${NC}"

# Function to start backend
start_backend() {
    echo -e "${BLUE}Starting Flask backend server...${NC}"
    cd backend
    source venv/bin/activate
    python app.py &
    BACKEND_PID=$!
    cd ..
    echo -e "${GREEN}✅ Backend server started (PID: $BACKEND_PID)${NC}"
}

# Function to start frontend
start_frontend() {
    echo -e "${BLUE}Starting React frontend server...${NC}"
    npm start &
    FRONTEND_PID=$!
    echo -e "${GREEN}✅ Frontend server started (PID: $FRONTEND_PID)${NC}"
}

# Start backend first
start_backend

# Wait a moment for backend to start
sleep 3

# Start frontend
start_frontend

# Display information
echo ""
echo -e "${GREEN}🎉 Cancer Patient Nutrition Platform is starting!${NC}"
echo "================================================"
echo -e "${BLUE}Frontend (React):${NC} http://localhost:3000"
echo -e "${BLUE}Backend (Flask):${NC}  http://localhost:5000"
echo -e "${BLUE}API Health Check:${NC} http://localhost:5000/api/health"
echo ""
echo -e "${YELLOW}📝 Sample data has been loaded:${NC}"
echo "   - Sample patient profile (Sarah Johnson)"
echo "   - 5 cancer-specific recipes"
echo "   - 7 days of nutrition logs"
echo ""
echo -e "${YELLOW}🔑 Important:${NC}"
echo "   - Add your OpenAI API key to the .env file"
echo "   - The application will open in your browser shortly"
echo ""
echo -e "${YELLOW}📖 Usage:${NC}"
echo "   1. Visit the Patient Profile to view/edit patient information"
echo "   2. Try the Recipe Generator with AI-powered recommendations"
echo "   3. Explore Meal Planning for personalized meal plans"
echo "   4. Check Nutrition Tracker for progress analytics"
echo "   5. Use Chat Assistant for nutrition guidance"
echo ""
echo -e "${BLUE}To stop the application:${NC}"
echo "   Press Ctrl+C to stop this script"
echo "   Or run: pkill -f 'npm start' && pkill -f 'python app.py'"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Shutting down servers...${NC}"
    
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null || true
        echo -e "${GREEN}✅ Backend server stopped${NC}"
    fi
    
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null || true
        echo -e "${GREEN}✅ Frontend server stopped${NC}"
    fi
    
    # Kill any remaining processes
    pkill -f "npm start" 2>/dev/null || true
    pkill -f "python app.py" 2>/dev/null || true
    
    echo -e "${GREEN}👋 Thanks for using Cancer Patient Nutrition Platform!${NC}"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM EXIT

# Wait for user to stop the script
echo -e "${GREEN}✨ Application is running. Press Ctrl+C to stop.${NC}"

# Keep script running
while true; do
    sleep 1
done