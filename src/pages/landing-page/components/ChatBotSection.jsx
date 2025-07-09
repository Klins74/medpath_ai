import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useI18n } from '../../../contexts/I18nContext';
// 1. ИСПРАВЛЕНИЕ: Импортируем правильную функцию
import { getChatCompletion } from '../../../services/openaiService';

const ChatBotSection = () => {
  const { t } = useI18n();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Привет! Я ИИ-консультант по медицинской карьере. Как я могу помочь вам с развитием карьеры?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const exampleQuestions = [
    'Какие курсы нужны для перехода на Senior?',
    'Как развиваться в кардиологии?',
    'Какие навыки важны для хирурга?',
    'Планирование карьеры в педиатрии'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Прокручиваем вниз только при добавлении нового сообщения
    if (messages.length > 1) {
        scrollToBottom();
    }
  }, [messages.length]);

  // 2. ИСПРАВЛЕНИЕ: Логика адаптирована под getChatCompletion
  const handleSendMessage = async (message = inputValue.trim()) => {
    if (!message || isTyping) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const botMessageId = Date.now() + 1;
    const placeholderMessage = {
      id: botMessageId,
      type: 'bot',
      content: '...',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, placeholderMessage]);

    try {
      const systemPrompt = `Вы - опытный консультант по медицинской карьере с экспертизой в различных медицинских специализациях. 
      Отвечайте на русском языке. Предоставляйте конкретные, практические советы по карьерному развитию в медицине. 
      Будьте дружелюбным, профессиональным и информативным.`;
      
      const fullResponse = await getChatCompletion(message, systemPrompt);

      const finalBotMessage = {
        id: botMessageId,
        type: 'bot',
        content: fullResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => prev.map(msg => msg.id === botMessageId ? finalBotMessage : msg));

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: botMessageId,
        type: 'bot',
        content: `Произошла ошибка: ${error.message}`,
        timestamp: new Date()
      };
      setMessages(prev => prev.map(msg => msg.id === botMessageId ? errorMessage : msg));
    } finally {
      setIsTyping(false);
    }
  };

  const handleExampleClick = (question) => {
    setInputValue(question);
    handleSendMessage(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="py-20 lg:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 bg-primary-100 text-primary px-6 py-3 rounded-full text-xl lg:text-2xl font-semibold mb-8">
            <Icon name="MessageSquare" size={24} />
            <span>ИИ-Консультант</span>
          </div>
          
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            {t('chat_description')}
          </p>
        </div>

        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-surface border border-border rounded-2xl medical-shadow-elevated overflow-hidden">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-primary-25">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Bot" size={20} color="white" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">MedPath AI Консультант</h3>
                  <p className="text-sm text-text-secondary">Powered by Gemini API</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-success font-medium">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.type === 'user' ?'bg-primary text-primary-foreground ml-auto' :'bg-secondary-100 text-text-primary'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString('ru-RU', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary-100 text-text-primary px-4 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Example Questions */}
            <div className="px-6 py-4 bg-secondary-25 border-t border-border">
              <p className="text-sm text-text-secondary mb-3">Популярные вопросы:</p>
              <div className="flex flex-wrap gap-2">
                {exampleQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(question)}
                    className="text-xs px-3 py-2 bg-surface border border-border rounded-full text-text-secondary hover:text-primary hover:border-primary medical-transition"
                    disabled={isTyping}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-6 border-t border-border bg-surface">
              <div className="flex space-x-4">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('chat_placeholder')}
                  className="flex-1 px-4 py-3 border border-border rounded-xl bg-surface text-text-primary placeholder-text-muted focus:border-primary focus:ring-2 focus:ring-primary-100 medical-transition"
                  disabled={isTyping}
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  variant="primary"
                  iconName="Send"
                  className="px-6 py-3"
                >
                  {t('ask_question')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatBotSection;
