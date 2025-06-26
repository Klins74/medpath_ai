import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useI18n } from '../../../contexts/I18nContext';
import { getStreamingChatCompletion } from '../../../services/openaiService';

const ChatBotSection = () => {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
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
  const [isStreaming, setIsStreaming] = useState(false);
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
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (message = inputValue.trim()) => {
    if (!message) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const systemPrompt = `Вы - опытный консультант по медицинской карьере с экспертизой в различных медицинских специализациях. 
      Отвечайте на русском языке. Предоставляйте конкретные, практические советы по карьерному развитию в медицине. 
      Будьте дружелюбным, профессиональным и информативным.`;

      // Use streaming for better UX
      setIsStreaming(true);
      let botResponse = '';
      
      const streamingBotMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: '',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, streamingBotMessage]);

      await getStreamingChatCompletion(
        message,
        (chunk) => {
          botResponse += chunk;
          setMessages(prev => 
            prev.map(msg => 
              msg.id === streamingBotMessage.id 
                ? { ...msg, content: botResponse }
                : msg
            )
          );
        },
        systemPrompt
      );

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Извините, произошла ошибка. Попробуйте задать вопрос еще раз.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsStreaming(false);
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
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="MessageSquare" size={16} />
            <span>ИИ-Консультант</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-text-primary mb-6">
            {t('chat_title')}
          </h2>
          
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
                  <p className="text-sm text-text-secondary">Powered by OpenAI GPT-4</p>
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
                  disabled={isTyping || isStreaming}
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping || isStreaming}
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

        {/* FAQ Examples */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              question: 'Карьерное планирование',
              answer: 'Узнайте о построении карьерной траектории',
              icon: 'Route'
            },
            {
              question: 'Развитие навыков',
              answer: 'Какие навыки развивать в вашей специализации',
              icon: 'TrendingUp'
            },
            {
              question: 'Образование',
              answer: 'Курсы и сертификации для роста',
              icon: 'BookOpen'
            },
            {
              question: 'Специализации',
              answer: 'Выбор медицинской специализации',
              icon: 'Stethoscope'
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-surface border border-border rounded-xl p-6 medical-shadow-card hover:medical-shadow-floating medical-transition cursor-pointer"
              onClick={() => handleExampleClick(item.question)}
            >
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                <Icon name={item.icon} size={24} color="var(--color-primary)" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">{item.question}</h3>
              <p className="text-sm text-text-secondary">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChatBotSection;