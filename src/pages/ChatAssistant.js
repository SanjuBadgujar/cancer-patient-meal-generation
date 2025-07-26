import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Lightbulb, Heart, Utensils, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ChatAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your personalized nutrition assistant. I'm here to help you with meal planning, recipe suggestions, and nutrition advice during your cancer treatment. How can I help you today?",
      timestamp: new Date(),
      suggestions: [
        "What should I eat after chemotherapy?",
        "I'm feeling nauseous, what foods can help?",
        "Suggest a high-protein breakfast",
        "Foods to boost my energy levels"
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickSuggestions = [
    {
      icon: Utensils,
      title: "Meal Ideas",
      suggestions: [
        "Easy breakfast for low appetite",
        "Anti-inflammatory dinner ideas",
        "Soft foods for mouth sores",
        "High-calorie snacks"
      ]
    },
    {
      icon: Heart,
      title: "Symptom Help",
      suggestions: [
        "Foods for nausea relief",
        "Constipation-friendly meals",
        "Energy-boosting foods",
        "Appetite stimulating foods"
      ]
    },
    {
      icon: AlertCircle,
      title: "Treatment Support",
      suggestions: [
        "Pre-chemo meal prep",
        "Post-treatment nutrition",
        "Hydration tips",
        "Weight management"
      ]
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (message = inputMessage) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(message.trim());
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    let response = {
      id: Date.now() + 1,
      type: 'bot',
      content: '',
      timestamp: new Date(),
      suggestions: []
    };

    if (lowerMessage.includes('nausea') || lowerMessage.includes('nauseous')) {
      response.content = `I understand you're dealing with nausea. Here are some helpful suggestions:

🥃 **Ginger-based foods**: Fresh ginger tea, ginger ale, or crystallized ginger
🍋 **Citrus**: Lemon water, peppermint tea, or cold citrus fruits
🍞 **Bland foods**: Toast, crackers, rice, bananas (BRAT diet)
🥤 **Small, frequent meals**: Eat small portions every 2-3 hours
❄️ **Cold foods**: Often more tolerable than hot foods

Would you like a specific recipe for any of these, or do you have other symptoms I can help with?`;
      
      response.suggestions = [
        "Give me a ginger tea recipe",
        "What are the best bland breakfast options?",
        "How to stay hydrated when nauseous?",
        "Small meal ideas for nausea"
      ];
    } 
    else if (lowerMessage.includes('fatigue') || lowerMessage.includes('tired') || lowerMessage.includes('energy')) {
      response.content = `For fatigue and energy support, focus on these nutritional strategies:

⚡ **Iron-rich foods**: Lean meats, spinach, lentils, fortified cereals
🥜 **Protein powerhouses**: Greek yogurt, eggs, nuts, quinoa
🍌 **Complex carbs**: Whole grains, sweet potatoes, oats
💧 **Stay hydrated**: Dehydration worsens fatigue
☕ **Smart caffeine**: Green tea provides gentle energy boost

The key is eating regularly - even when you don't feel hungry. Small, nutrient-dense meals every 3 hours can help maintain energy levels.`;
      
      response.suggestions = [
        "High-energy breakfast recipes",
        "Iron-rich meal ideas",
        "Quick protein snacks",
        "Energy-boosting smoothie recipes"
      ];
    }
    else if (lowerMessage.includes('appetite') || lowerMessage.includes('not hungry')) {
      response.content = `Loss of appetite is common during treatment. Here's how to stimulate appetite and get nutrition:

🍽️ **Make food appealing**: Use colorful foods, appealing presentation
👃 **Enhance aromas**: Cook with herbs and spices you enjoy
🥤 **Liquid calories**: Smoothies, protein shakes, soups
⏰ **Regular schedule**: Eat at set times, even if not hungry
🏃 **Light activity**: Gentle walks can stimulate appetite
🎵 **Pleasant environment**: Eat with music or good company

Focus on calorie-dense foods when you do eat - every bite counts!`;
      
      response.suggestions = [
        "High-calorie smoothie recipes",
        "Appetite-stimulating spices",
        "Nutrient-dense small meals",
        "Liquid nutrition options"
      ];
    }
    else if (lowerMessage.includes('breakfast')) {
      response.content = `Here are some cancer-friendly breakfast ideas:

🥣 **Anti-inflammatory oatmeal**: With berries, nuts, and cinnamon
🥤 **Protein smoothie**: Banana, spinach, protein powder, almond milk
🍳 **Soft scrambled eggs**: With avocado and whole grain toast
🥨 **Greek yogurt parfait**: With honey, granola, and fresh fruit
🍞 **Nut butter toast**: On whole grain with sliced banana

Would you like a detailed recipe for any of these options?`;
      
      response.suggestions = [
        "Anti-inflammatory oatmeal recipe",
        "High-protein smoothie recipe",
        "Soft foods breakfast ideas",
        "Quick breakfast for busy mornings"
      ];
    }
    else if (lowerMessage.includes('mouth sores') || lowerMessage.includes('sore mouth')) {
      response.content = `For mouth sores, focus on soft, non-irritating foods:

🥤 **Smooth textures**: Smoothies, protein shakes, puddings
🧊 **Cold foods**: Ice cream, popsicles, cold soups
🥣 **Soft foods**: Mashed potatoes, scrambled eggs, oatmeal
🚫 **Avoid**: Citrus, spicy foods, rough textures, alcohol
🥛 **Room temperature**: Lukewarm foods are often best tolerated
💧 **Stay hydrated**: Use straws to bypass sore areas

Let me know if you'd like specific soft food recipes or meal ideas!`;
      
      response.suggestions = [
        "Soft breakfast options",
        "Cooling popsicle recipes",
        "Nutritious smoothie ideas",
        "Gentle soup recipes"
      ];
    }
    else if (lowerMessage.includes('recipe') || lowerMessage.includes('cook')) {
      response.content = `I'd be happy to help with recipes! To give you the best suggestions, could you tell me:

• What type of meal are you looking for? (breakfast, lunch, dinner, snack)
• Any current symptoms I should consider?
• How much energy do you have for cooking?
• Any foods you're particularly craving or avoiding?

I can provide everything from 5-minute no-cook options to more elaborate healing meals!`;
      
      response.suggestions = [
        "Quick 5-minute meals",
        "No-cook recipe ideas",
        "Batch cooking for the week",
        "Anti-inflammatory recipes"
      ];
    }
    else {
      response.content = `I'm here to help with all your nutrition questions during cancer treatment! I can assist with:

• Meal planning and recipe suggestions
• Managing treatment side effects through nutrition
• Appetite and energy support
• Specific dietary restrictions or preferences
• Hydration and supplement guidance

What specific nutrition challenge would you like help with today?`;
      
      response.suggestions = [
        "Help with nausea and eating",
        "Boost my energy levels",
        "Meal prep for treatment days",
        "Weight management tips"
      ];
    }

    return response;
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary-100 rounded-full">
            <Bot className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nutrition Assistant</h1>
            <p className="text-gray-600">
              Your personal AI guide for nutrition during cancer treatment
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Quick Suggestions Sidebar */}
        <div className="w-80 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto hidden lg:block">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Help</h3>
          <div className="space-y-4">
            {quickSuggestions.map((category, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-2 mb-3">
                  <category.icon className="h-5 w-5 text-primary-600" />
                  <h4 className="font-medium text-gray-900">{category.title}</h4>
                </div>
                <div className="space-y-2">
                  {category.suggestions.map((suggestion, suggestionIndex) => (
                    <button
                      key={suggestionIndex}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left text-sm text-gray-600 hover:text-primary-600 p-2 hover:bg-primary-50 rounded transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' ? 'bg-primary-600' : 'bg-gray-200'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="h-5 w-5 text-white" />
                    ) : (
                      <Bot className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                  
                  <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block p-4 rounded-2xl ${
                      message.type === 'user' 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-white border border-gray-200'
                    }`}>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                    
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-sm text-gray-500 mb-2">Quick replies:</p>
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex space-x-3 max-w-3xl">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl p-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex space-x-4">
              <div className="flex-1">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about nutrition, recipes, or managing symptoms..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  rows={1}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={() => sendMessage()}
                disabled={!inputMessage.trim() || isTyping}
                className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mt-2 text-xs text-gray-500 flex items-center space-x-2">
              <Lightbulb className="h-4 w-4" />
              <span>Tip: Be specific about your symptoms or dietary needs for better recommendations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;