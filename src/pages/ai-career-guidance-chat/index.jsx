import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import Header from '../../components/ui/Header';
import ChatSidebar from './components/ChatSidebar';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import WelcomeScreen from './components/WelcomeScreen';
import ConfigurationStatus from '../../components/ui/ConfigurationStatus';
import { getStreamingChatCompletion } from '../../services/openaiService';
import { showError, showSuccess, showDevNotification } from '../../utils/notifications';
import { pageTransition, stagger } from '../../utils/animations';
import { getOpenAIConfigStatus } from '../../utils/openaiClient';

const AICareerGuidanceChat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [conversationTitle, setConversationTitle] = useState('Career Guidance Chat');
  const [currentStreamingMessage, setCurrentStreamingMessage] = useState('');
  const [streamingMessageId, setStreamingMessageId] = useState(null);
  const [showConfigStatus, setShowConfigStatus] = useState(false);
  const [configStatus, setConfigStatus] = useState(null);
  const messagesEndRef = useRef(null);

  // Check configuration status on mount
  useEffect(() => {
    const status = getOpenAIConfigStatus();
    setConfigStatus(status);
    
    if (!status.isConfigured) {
      setShowConfigStatus(true);
    }
  }, []);

  // Generate conversation title based on first message
  const generateConversationTitle = (message) => {
    const words = message.split(' ').slice(0, 5);
    return words.join(' ') + (words.length >= 5 ? '...' : '');
  };

  // Generate suggestions based on AI response
  const generateSuggestions = (response) => {
    const suggestions = [
      "Tell me more about this",
      "What are the next steps?",
      "Are there any alternatives?",
      "What resources do you recommend?"
    ];
    return suggestions.slice(0, 3);
  };

  // Handle file upload functionality
  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) {
      showError('No files selected');
      return;
    }

    // Validate file types and sizes
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB limit

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        showError(`File type ${file.type} is not supported. Please upload PDF, DOC, DOCX, or TXT files.`);
        return;
      }

      if (file.size > maxSize) {
        showError(`File ${file.name} is too large. Maximum size is 5MB.`);
        return;
      }
    }

    try {
      // Process each file
      for (const file of files) {
        const fileContent = await readFileContent(file);
        
        // Add file upload message to chat
        const fileMessage = {
          id: Date.now() + Math.random(),
          content: `📄 Uploaded: ${file.name}`,
          isUser: true,
          timestamp: new Date(),
          isFileUpload: true,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size
        };

        setMessages(prev => [...prev, fileMessage]);

        // Generate AI response based on file content
        const analysisPrompt = `I've uploaded a document: ${file.name}. Here's the content:\n\n${fileContent}\n\nCan you analyze this document and provide career guidance based on its content?`;
        
        // Wait a moment before sending the analysis request
        setTimeout(() => {
          handleSendMessage(analysisPrompt);
        }, 500);
      }

      showSuccess(`Successfully uploaded ${files.length} file(s)`);
    } catch (error) {
      console.error('Error uploading files:', error);
      showError(`Failed to upload files: ${error.message}`);
    }
  };

  // Read file content as text
  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const content = e.target.result;
        
        // For text files, return as is
        if (file.type === 'text/plain') {
          resolve(content);
          return;
        }
        
        // For other file types, we'll need to extract text
        // This is a simplified approach - in production, you'd want to use proper libraries
        if (file.type === 'application/pdf') {
          // For PDF files, you'd typically use a library like pdf-parse
          resolve(`PDF content from ${file.name} - Content extraction would require additional libraries`);
        } else if (file.type.includes('document')) {
          // For Word documents, you'd use libraries like mammoth or docx-parser
          resolve(`Document content from ${file.name} - Content extraction would require additional libraries`);
        } else {
          resolve(content);
        }
      };
      
      reader.onerror = (error) => {
        reject(new Error(`Failed to read file: ${error.message}`));
      };
      
      // Read as text for most file types
      if (file.type === 'text/plain') {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    });
  };

  // Mock conversation data for sidebar
  const mockConversations = [
    {
      id: 1,
      title: 'Cardiology Specialization Path',
      messages: [
        {
          id: 1,
          content: "I\'m interested in pursuing cardiology. Can you help me understand the path and requirements?",
          isUser: true,
          timestamp: new Date(Date.now() - 3600000),
        }
      ]
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, currentStreamingMessage]);

  const handleSendMessage = async (content) => {
    if (!content.trim()) return;

    // Check configuration before sending
    const status = getOpenAIConfigStatus();
    if (!status.isConfigured) {
      showError('OpenAI API is not configured. Please configure your API key first.');
      setShowConfigStatus(true);
      return;
    }

    const userMessage = {
      id: Date.now(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setCurrentStreamingMessage('');

    // Create streaming message placeholder
    const streamingId = Date.now() + 1;
    setStreamingMessageId(streamingId);

    try {
      const systemPrompt = `You are an expert medical career advisor named MedPath AI. You help medical professionals with career guidance, specialization decisions, career transitions, and professional development. 

      Provide comprehensive, accurate, and personalized advice. Include specific steps, timelines, and resources when possible. Structure your responses clearly with headings and bullet points where appropriate.

      For each response, consider:
      - Current career stage and background
      - Specific medical specializations and requirements
      - Certification and education pathways
      - Market trends and opportunities
      - Work-life balance considerations
      - Financial implications

      Be encouraging and supportive while providing realistic expectations.`;

      let fullResponse = '';
      
      await getStreamingChatCompletion(
        content,
        (chunk) => {
          fullResponse += chunk;
          setCurrentStreamingMessage(fullResponse);
        },
        (completeResponse) => {
          // Add complete message to messages array
          const aiMessage = {
            id: streamingId,
            content: completeResponse,
            isUser: false,
            timestamp: new Date(),
            suggestions: generateSuggestions(completeResponse)
          };
          
          setMessages(prev => [...prev, aiMessage]);
          setCurrentStreamingMessage('');
          setStreamingMessageId(null);
          setIsTyping(false);
          
          // Update conversation title based on first message
          if (messages.length === 1) {
            const title = generateConversationTitle(content);
            setConversationTitle(title);
          }
        },
        (error) => {
          console.error('Error in streaming chat completion:', error);
          showError(`Error in streaming chat completion: ${error.message}`);
          setIsTyping(false);
          setCurrentStreamingMessage('');
          setStreamingMessageId(null);
        },
        systemPrompt
      );
    } catch (error) {
      console.error('Error in chat:', error);
      showError(`Failed to send message: ${error.message}`);
      setIsTyping(false);
      setCurrentStreamingMessage('');
      setStreamingMessageId(null);
    }
  };

  const handleTopicSelect = (topic) => {
    handleSendMessage(topic);
    setIsSidebarOpen(false);
  };

  const handleNewChat = () => {
    setMessages([]);
    setConversationTitle('New Career Guidance Chat');
    setCurrentStreamingMessage('');
    setStreamingMessageId(null);
    setIsTyping(false);
    showSuccess('New chat started');
  };

  const handleDeleteConversation = (conversationId) => {
    showDevNotification('Conversation management');
    console.log('Delete conversation:', conversationId);
  };

  const handleExportChat = (format) => {
    if (messages.length === 0) {
      showError('No messages to export');
      return;
    }

    const chatContent = messages.map(msg => 
      `${msg.isUser ? 'You' : 'MedPath AI'}: ${msg.content}`
    ).join('\n\n');

    if (format === 'txt') {
      const blob = new Blob([chatContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `medpath-chat-${new Date().toISOString().split('T')[0]}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      showSuccess('Chat exported as text file');
    } else if (format === 'pdf') {
      showDevNotification('PDF export');
    }
  };

  const handleClearChat = () => {
    if (messages.length === 0) {
      showError('No messages to clear');
      return;
    }
    
    setMessages([]);
    setConversationTitle('Career Guidance Chat');
    setCurrentStreamingMessage('');
    setStreamingMessageId(null);
    setIsTyping(false);
    showSuccess('Chat cleared');
  };

  const handleCopyMessage = (messageId) => {
    const message = messages.find(msg => msg.id === messageId);
    if (message) {
      navigator.clipboard.writeText(message.content);
      showSuccess('Message copied to clipboard');
    }
  };

  const handleRegenerateMessage = async (messageId) => {
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    if (messageIndex > 0) {
      const previousUserMessage = messages[messageIndex - 1];
      if (previousUserMessage.isUser) {
        setIsTyping(true);
        setCurrentStreamingMessage('');
        setStreamingMessageId(messageId);
        
        try {
          let fullResponse = '';
          
          await getStreamingChatCompletion(
            previousUserMessage.content,
            (chunk) => {
              fullResponse += chunk;
              setCurrentStreamingMessage(fullResponse);
            },
            (completeResponse) => {
              const updatedMessage = {
                ...messages[messageIndex],
                content: completeResponse,
                suggestions: generateSuggestions(completeResponse)
              };
              
              setMessages(prev => {
                const updated = [...prev];
                updated[messageIndex] = updatedMessage;
                return updated;
              });
              
              setCurrentStreamingMessage('');
              setStreamingMessageId(null);
              setIsTyping(false);
              showSuccess('Response regenerated');
            }
          );
        } catch (error) {
          showError('Failed to regenerate response');
          setIsTyping(false);
          setCurrentStreamingMessage('');
          setStreamingMessageId(null);
        }
      }
    }
  };

  const handleMessageFeedback = (messageId, feedbackType) => {
    showDevNotification('Message feedback system');
    console.log('Message feedback:', messageId, feedbackType);
  };

  const handleStartChat = () => {
    const welcomeMessage = "Hello! I'm MedPath AI, your dedicated medical career advisor. I'm here to help you navigate your medical career path, whether you're a medical student, resident, or practicing physician looking to make a change. What would you like to discuss today?";
    handleSendMessage("Hi, I'd like to get some career guidance for my medical career.");
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
      
      {/* Configuration Status Modal */}
      {showConfigStatus && (
        <ConfigurationStatus 
          onClose={() => setShowConfigStatus(false)}
        />
      )}
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <ChatSidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              onTopicSelect={handleTopicSelect}
              conversations={mockConversations}
              onNewChat={handleNewChat}
              onDeleteConversation={handleDeleteConversation}
            />
          )}
        </AnimatePresence>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <ChatHeader
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            onExportChat={handleExportChat}
            onClearChat={handleClearChat}
            isConnected={isConnected && configStatus?.isConfigured}
            conversationTitle={conversationTitle}
          />

          {/* Configuration Warning */}
          {configStatus && !configStatus.isConfigured && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mx-4 mt-2">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    OpenAI API is not configured. Please configure your API key to use the chat feature.
                  </p>
                  <button
                    onClick={() => setShowConfigStatus(true)}
                    className="mt-2 text-sm text-yellow-700 underline hover:text-yellow-800"
                  >
                    Configure Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto">
            {messages.length === 0 && !isTyping ? (
              <WelcomeScreen
                onStartChat={handleStartChat}
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
                    onCopy={handleCopyMessage}
                    onRegenerate={handleRegenerateMessage}
                    onFeedback={handleMessageFeedback}
                  />
                ))}
                
                {/* Streaming message */}
                {isTyping && streamingMessageId && (
                  <ChatMessage
                    message={{
                      id: streamingMessageId,
                      content: currentStreamingMessage,
                      isUser: false,
                      timestamp: new Date()
                    }}
                    isUser={false}
                    isStreaming={true}
                    onCopy={handleCopyMessage}
                    onRegenerate={handleRegenerateMessage}
                    onFeedback={handleMessageFeedback}
                  />
                )}
                
                {/* Typing indicator */}
                {isTyping && !streamingMessageId && (
                  <ChatMessage isTyping={true} />
                )}
                
                <div ref={messagesEndRef} />
              </motion.div>
            )}
          </div>

          {/* Chat Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            onFileUpload={handleFileUpload}
            disabled={!isConnected || isTyping || !configStatus?.isConfigured}
            placeholder={
              configStatus?.isConfigured 
                ? "Ask about your medical career path..." :"Please configure OpenAI API key to start chatting..."
            }
            suggestions={messages.length > 0 ? [] : [
              "What specialization matches my background?",
              "How do I transition to research?",
              "What certifications do I need?",
              "Help me plan my residency application",
              "What are the highest-paying medical specialties?"
            ]}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AICareerGuidanceChat;