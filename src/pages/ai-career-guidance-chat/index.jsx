import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/ui/Header';
import ChatSidebar from './components/ChatSidebar';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import WelcomeScreen from './components/WelcomeScreen';
import { getChatCompletion } from '../../services/openaiService'; 
import { showError, showSuccess, showDevNotification } from '../../utils/notifications';
import { pageTransition, stagger } from '../../utils/animations';

const AICareerGuidanceChat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [conversationTitle, setConversationTitle] = useState('Career Guidance Chat');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 1) {
        scrollToBottom();
    }
  }, [messages.length]);

  const generateConversationTitle = (message) => {
    const words = message.split(' ').slice(0, 5);
    return words.join(' ') + (words.length >= 5 ? '...' : '');
  };

  const handleSendMessage = async (content) => {
    if (!content.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    const botMessageId = Date.now() + 1;
    const placeholderMessage = {
      id: botMessageId,
      content: '...',
      isUser: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, placeholderMessage]);

    try {
      const systemPrompt = `You are an expert medical career advisor named MedPath AI. You help medical professionals with career guidance, specialization decisions, career transitions, and professional development. Provide comprehensive, accurate, and personalized advice.`;
      
      const fullResponse = await getChatCompletion(content, systemPrompt);

      const finalBotMessage = {
        id: botMessageId,
        content: fullResponse,
        isUser: false,
        timestamp: new Date(),
        suggestions: ["Tell me more", "Next steps?"]
      };

      setMessages(prev => prev.map(msg => msg.id === botMessageId ? finalBotMessage : msg));
      
      if (messages.length <= 2) {
        setConversationTitle(generateConversationTitle(content));
      }

    } catch (error) {
      console.error('Error in chat:', error);
      const errorMessage = {
        id: botMessageId,
        content: `Произошла ошибка: ${error.message}`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => prev.map(msg => msg.id === botMessageId ? errorMessage : msg));
    } finally {
      setIsTyping(false);
    }
  };

  const handleTopicSelect = (topic) => {
    handleSendMessage(topic);
    setIsSidebarOpen(false);
  };
  
  const handleNewChat = () => {
    setMessages([]);
    setConversationTitle('New Career Guidance Chat');
    setIsTyping(false);
    showSuccess('New chat started');
  };

  const handleClearChat = () => {
    if (window.confirm('Вы уверены, что хотите очистить эту беседу? Это действие нельзя отменить.')) {
        setMessages([]);
        setConversationTitle('Career Guidance Chat');
        setIsTyping(false);
        showSuccess('Chat cleared');
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <Header />
      
      <div className="flex h-[calc(100vh-4rem)]">
        <AnimatePresence>
          {isSidebarOpen && (
            <ChatSidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              onTopicSelect={handleTopicSelect}
              onNewChat={handleNewChat}
              onDeleteConversation={() => showDevNotification('Delete conversation')}
            />
          )}
        </AnimatePresence>

        <div className="flex-1 flex flex-col">
          <ChatHeader
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            onExportChat={(format) => showDevNotification(`Export chat as ${format}`)}
            onClearChat={handleClearChat}
            isConnected={isConnected}
            conversationTitle={conversationTitle}
          />

          <div className="flex-1 overflow-y-auto">
            {messages.length === 0 && !isTyping ? (
              <WelcomeScreen
                onStartChat={() => handleSendMessage("Привет, мне нужна консультация по карьере.")}
                onSelectTopic={handleTopicSelect}
              />
            ) : (
              <motion.div 
                className="space-y-0"
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    isUser={message.isUser}
                    onCopy={() => navigator.clipboard.writeText(message.content)}
                    onRegenerate={() => showDevNotification('Regenerate message')}
                    onFeedback={() => showDevNotification('Message feedback')}
                  />
                ))}
                
                {isTyping && (
                  <ChatMessage isTyping={true} />
                )}
                
                <div ref={messagesEndRef} />
              </motion.div>
            )}
          </div>

          <ChatInput
            onSendMessage={handleSendMessage}
            onFileUpload={() => showDevNotification('File upload')}
            disabled={isTyping}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AICareerGuidanceChat;
