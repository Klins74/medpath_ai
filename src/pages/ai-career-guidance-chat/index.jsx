import React, { useState, useRef, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ChatSidebar from './components/ChatSidebar';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import WelcomeScreen from './components/WelcomeScreen';


const AICareerGuidanceChat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [conversationTitle, setConversationTitle] = useState('Career Guidance Chat');
  const messagesEndRef = useRef(null);

  // Mock conversation data
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
        },
        {
          id: 2,
          content: `Absolutely! Cardiology is an excellent specialty choice. Here's a comprehensive overview of the path:\n\n**Educational Requirements:**\n• Complete medical school (4 years)\n• Internal medicine residency (3 years)\n• Cardiology fellowship (3 years)\n• Optional subspecialty fellowship (1 year)\n\n**Key Certifications:**\n• Board certification in Internal Medicine\n• Board certification in Cardiovascular Disease\n• ACLS and BLS certifications\n\n**Timeline:** Typically 10-11 years after undergraduate degree\n\n**Subspecialties to consider:**\n• Interventional Cardiology\n• Electrophysiology\n• Heart Failure and Transplant\n• Preventive Cardiology\n\nWould you like me to elaborate on any specific aspect of the cardiology career path?`,
          isUser: false,
          timestamp: new Date(Date.now() - 3580000),
          suggestions: [
            "What's the salary range for cardiologists?","How competitive is cardiology fellowship?","What skills are most important for cardiology?"
          ]
        }
      ]
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (content) => {
    const userMessage = {
      id: Date.now(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const generateAIResponse = (userMessage) => {
    const responses = {
      specialization: `Based on your question about medical specialization, I'd be happy to help you explore different paths!\n\n**Popular Medical Specialties:**\n• **Internal Medicine** - Broad scope, good foundation\n• **Surgery** - High precision, demanding schedule\n• **Pediatrics** - Working with children and families\n• **Psychiatry** - Mental health focus, growing field\n• **Radiology** - Technology-focused, good work-life balance\n\n**Factors to Consider:**\n• Your interests and personality\n• Desired work-life balance\n• Length of training required\n• Salary expectations\n• Patient interaction preferences\n\nTo give you more personalized advice, could you tell me about your interests, strengths, and what aspects of medicine excite you most?`,
      
      certification: `Great question about medical certifications! Here's a comprehensive overview:\n\n**Essential Certifications:**\n• **USMLE Steps 1, 2, & 3** - Required for medical licensure\n• **Board Certification** - Specialty-specific (e.g., ABIM, ABFM)\n• **State Medical License** - Required in each practice state\n• **DEA Registration** - For prescribing controlled substances\n\n**Additional Certifications:**\n• **ACLS** (Advanced Cardiac Life Support)\n• **BLS** (Basic Life Support)\n• **PALS** (Pediatric Advanced Life Support)\n• **Specialty Subspecialty Boards**\n\n**Timeline Considerations:**\n• Board eligibility typically after residency completion\n• Most boards require recertification every 6-10 years\n• Continuing Medical Education (CME) requirements\n\nWhich specialty are you considering? I can provide more specific certification requirements.`,
      
      transition: `Career transitions in medicine are definitely possible! Here are common transition paths:\n\n**Clinical to Research:**\n• Consider research fellowships\n• Pursue MPH or PhD degrees\n• Start with clinical research in your specialty\n• Network with research institutions\n• Develop grant writing skills\n\n**Clinical to Administration:**\n• MBA or MHA degrees are valuable\n• Start with committee work in your institution\n• Consider healthcare consulting\n• Develop leadership and business skills\n\n**Clinical to Industry:**\n• Pharmaceutical companies value clinical expertise\n• Medical device companies need physician input\n• Healthcare technology sector is growing\n• Consider regulatory affairs or medical affairs roles\n\n**Key Success Factors:**\n• Leverage your clinical experience\n• Network within your target field\n• Consider additional education/training\n• Start with part-time or consulting roles\n\nWhat type of transition are you most interested in exploring?`,
      
      salary: `Medical specialty salaries vary significantly. Here's a general overview:\n\n**High-Earning Specialties:**\n• **Orthopedic Surgery**: $550,000 - $750,000+\n• **Neurosurgery**: $600,000 - $800,000+\n• **Interventional Cardiology**: $500,000 - $700,000+\n• **Anesthesiology**: $400,000 - $500,000+\n\n**Mid-Range Specialties:**\n• **Emergency Medicine**: $350,000 - $450,000\n• **Radiology**: $400,000 - $500,000\n• **Internal Medicine**: $250,000 - $350,000\n• **Psychiatry**: $250,000 - $400,000\n\n**Factors Affecting Salary:**\n• Geographic location\n• Practice setting (academic vs. private)\n• Years of experience\n• Subspecialty training\n• Call requirements\n\n**Remember:** Salary shouldn't be the only factor. Consider work-life balance, job satisfaction, and personal interests.\n\nWhich specialties are you comparing? I can provide more specific information.`
    };

    // Simple keyword matching for demo
    const lowerMessage = userMessage.toLowerCase();
    let response = responses.specialization; // default

    if (lowerMessage.includes('certification') || lowerMessage.includes('board') || lowerMessage.includes('license')) {
      response = responses.certification;
    } else if (lowerMessage.includes('transition') || lowerMessage.includes('change') || lowerMessage.includes('research')) {
      response = responses.transition;
    } else if (lowerMessage.includes('salary') || lowerMessage.includes('money') || lowerMessage.includes('pay')) {
      response = responses.salary;
    }

    return {
      id: Date.now() + 1,
      content: response,
      isUser: false,
      timestamp: new Date(),
      suggestions: [
        "Tell me more about this topic",
        "What are the next steps?",
        "How does this compare to other options?"
      ]
    };
  };

  const handleFileUpload = (files) => {
    const fileMessage = {
      id: Date.now(),
      content: `I've uploaded ${files.length} file(s). Please analyze them and provide career guidance based on the content.`,
      isUser: true,
      timestamp: new Date(),
      attachments: files.map(file => ({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        type: file.type
      }))
    };

    setMessages(prev => [...prev, fileMessage]);
    setIsTyping(true);

    // Simulate file analysis
    setTimeout(() => {
      const analysisResponse = {
        id: Date.now() + 1,
        content: `Thank you for uploading your documents! I've analyzed the content and here's my assessment:\n\n**Document Analysis:**\n• Resume/CV structure looks professional\n• Strong clinical experience noted\n• Good educational background\n• Relevant certifications identified\n\n**Career Recommendations:**\n• Your background shows strong potential for subspecialty training\n• Consider fellowship opportunities in your area of interest\n• Your research experience would be valuable for academic positions\n• Leadership roles align well with administrative career paths\n\n**Next Steps:**\n• Update your CV with recent achievements\n• Network with professionals in your target specialty\n• Consider additional certifications for competitive advantage\n\nWould you like me to elaborate on any specific recommendations or discuss particular career paths in more detail?`,
        isUser: false,
        timestamp: new Date(),
        suggestions: [
          "What fellowships would you recommend?",
          "How can I strengthen my application?",
          "What networking strategies work best?"
        ]
      };

      setMessages(prev => [...prev, analysisResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleTopicSelect = (topic) => {
    handleSendMessage(topic);
    setIsSidebarOpen(false);
  };

  const handleNewChat = () => {
    setMessages([]);
    setConversationTitle('New Career Guidance Chat');
  };

  const handleDeleteConversation = (conversationId) => {
    console.log('Delete conversation:', conversationId);
  };

  const handleExportChat = (format) => {
    const chatContent = messages.map(msg => 
      `${msg.isUser ? 'You' : 'AI'}: ${msg.content}`
    ).join('\n\n');

    if (format === 'txt') {
      const blob = new Blob([chatContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `career-chat-${new Date().toISOString().split('T')[0]}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'pdf') {
      console.log('PDF export would be implemented here');
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setConversationTitle('Career Guidance Chat');
  };

  const handleCopyMessage = (messageId) => {
    console.log('Message copied:', messageId);
  };

  const handleRegenerateMessage = (messageId) => {
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    if (messageIndex > 0) {
      const previousUserMessage = messages[messageIndex - 1];
      if (previousUserMessage.isUser) {
        setIsTyping(true);
        setTimeout(() => {
          const newResponse = generateAIResponse(previousUserMessage.content);
          setMessages(prev => {
            const updated = [...prev];
            updated[messageIndex] = newResponse;
            return updated;
          });
          setIsTyping(false);
        }, 1000);
      }
    }
  };

  const handleMessageFeedback = (messageId, feedbackType) => {
    console.log('Message feedback:', messageId, feedbackType);
  };

  const handleStartChat = () => {
    const welcomeMessage = "Hello! I'm your AI career guidance assistant. I'm here to help you navigate your medical career path. What would you like to discuss today?";
    handleSendMessage("Hi, I'd like to get some career guidance.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <ChatSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onTopicSelect={handleTopicSelect}
          conversations={mockConversations}
          onNewChat={handleNewChat}
          onDeleteConversation={handleDeleteConversation}
        />

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <ChatHeader
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            onExportChat={handleExportChat}
            onClearChat={handleClearChat}
            isConnected={isConnected}
            conversationTitle={conversationTitle}
          />

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto">
            {messages.length === 0 ? (
              <WelcomeScreen
                onStartChat={handleStartChat}
                onSelectTopic={handleTopicSelect}
              />
            ) : (
              <div className="space-y-0">
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
                
                {isTyping && (
                  <ChatMessage isTyping={true} />
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Chat Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            onFileUpload={handleFileUpload}
            disabled={!isConnected}
            placeholder="Ask about your medical career path..."
            suggestions={messages.length > 0 ? [] : [
              "What specialization matches my background?",
              "How do I transition to research?",
              "What certifications do I need?"
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default AICareerGuidanceChat;