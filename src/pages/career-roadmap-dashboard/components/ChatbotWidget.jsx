import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatbotWidget = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const initialMessages = [
    {
      id: 1,
      type: 'bot',
      content: `Hello! I'm your AI Career Advisor. I can help you with:\n\n• Career pathway recommendations\n• Certification guidance\n• Skill development planning\n• Fellowship opportunities\n• Professional networking advice\n\nWhat would you like to know about your medical career?`,
      timestamp: new Date(Date.now() - 300000)
    }
  ];

  const quickSuggestions = [
    "What certifications should I pursue next?",
    "How can I prepare for cardiology fellowship?",
    "What are the best networking opportunities?",
    "How to improve my research profile?"
  ];

  const mockResponses = {
    "certification": `Based on your current profile, I recommend focusing on these certifications:\n\n🏆 **Advanced Cardiac Life Support (ACLS)**\n- Priority: High\n- Time: 2-3 weeks\n- Cost: $350\n\n📜 **Board Certification in Cardiology**\n- Priority: Critical\n- Time: 6 months prep\n- Cost: $2,500\n\nWould you like detailed information about any of these?`,
    
    "fellowship": `For cardiology fellowship preparation, here's your roadmap:\n\n📚 **Academic Requirements:**\n- Strong USMLE scores\n- Research publications (aim for 3-5)\n- Clinical experience in cardiology\n\n🔬 **Research Focus:**\n- Consider subspecialty interests\n- Seek mentorship opportunities\n- Present at conferences\n\n📅 **Timeline:**\n- Applications due: September\n- Interviews: October-January\n- Match results: March\n\nNeed help with any specific aspect?`,
    
    "networking": `Here are the best networking strategies for your career:\n\n🏥 **Professional Organizations:**\n- American College of Cardiology (ACC)\n- American Heart Association (AHA)\n- Local medical societies\n\n📅 **Key Events:**\n- ACC Scientific Conference\n- AHA Annual Meeting\n- Regional cardiology symposiums\n\n💼 **Digital Networking:**\n- LinkedIn medical groups\n- Twitter medical community\n- Research collaboration platforms\n\nWhich networking avenue interests you most?`,
    
    "research": `To strengthen your research profile:\n\n📊 **Publication Strategy:**\n- Aim for 3-5 peer-reviewed articles\n- Focus on cardiology subspecialties\n- Consider case reports and reviews\n\n🔬 **Research Opportunities:**\n- Clinical trials participation\n- Quality improvement projects\n- Retrospective studies\n\n👥 **Collaboration:**\n- Find research mentors\n- Join multi-center studies\n- Present at conferences\n\nWhat type of research interests you most?`
  };

  useEffect(() => {
    if (messages.length === 0) {
      setMessages(initialMessages);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getResponseKey = (message) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('certification') || lowerMessage.includes('cert')) return 'certification';
    if (lowerMessage.includes('fellowship') || lowerMessage.includes('cardiology')) return 'fellowship';
    if (lowerMessage.includes('network') || lowerMessage.includes('connect')) return 'networking';
    if (lowerMessage.includes('research') || lowerMessage.includes('publication')) return 'research';
    return 'default';
  };

  const generateBotResponse = (userMessage) => {
    const responseKey = getResponseKey(userMessage);
    return mockResponses[responseKey] || `I understand you're asking about "${userMessage}". Let me help you with that.\n\nBased on your career roadmap, I recommend focusing on your immediate next steps. Would you like me to provide specific guidance on:\n\n• Certification requirements\n• Fellowship preparation\n• Research opportunities\n• Networking strategies\n\nPlease let me know which area you'd like to explore further!`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: generateBotResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickSuggestion = (suggestion) => {
    setInputValue(suggestion);
    handleSendMessage();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-1000">
        <button
          onClick={onToggle}
          className="w-14 h-14 bg-primary hover:bg-primary-700 text-primary-foreground rounded-full medical-shadow-floating hover:medical-shadow-elevated medical-transition flex items-center justify-center"
          title="Open AI Career Advisor"
        >
          <Icon name="MessageSquare" size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-1000 w-96 h-[600px] bg-surface border border-border rounded-medical-card medical-shadow-elevated flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-medical-card">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <Icon name="Bot" size={16} />
          </div>
          <div>
            <h3 className="font-medium">AI Career Advisor</h3>
            <p className="text-xs opacity-80">Online • Ready to help</p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="p-1 hover:bg-primary-foreground/20 rounded-medical medical-transition"
        >
          <Icon name="X" size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-medical text-sm ${
                message.type === 'user' ?'bg-primary text-primary-foreground ml-4' :'bg-secondary-100 text-text-primary mr-4'
              }`}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
              <div className={`text-xs mt-2 opacity-70 ${
                message.type === 'user' ? 'text-primary-foreground' : 'text-text-muted'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-secondary-100 text-text-primary p-3 rounded-medical mr-4">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      {messages.length <= 1 && (
        <div className="px-4 py-2 border-t border-border">
          <p className="text-xs text-text-muted mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleQuickSuggestion(suggestion)}
                className="px-2 py-1 bg-secondary-100 hover:bg-secondary-200 text-text-secondary hover:text-text-primary rounded-medical text-xs medical-transition"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Ask about your career path..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button
            variant="primary"
            size="sm"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            iconName="Send"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatbotWidget;