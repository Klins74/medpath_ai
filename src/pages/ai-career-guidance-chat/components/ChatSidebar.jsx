import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatSidebar = ({ 
  isOpen, 
  onClose, 
  onTopicSelect, 
  conversations = [],
  onNewChat,
  onDeleteConversation 
}) => {
  const [activeTab, setActiveTab] = useState('topics');

  const quickStartTopics = [
    {
      id: 'specialization',
      title: 'Medical Specialization',
      description: 'Explore different medical specialties and career paths',
      icon: 'Stethoscope',
      prompts: [
        'What specialization matches my background?',
        'Compare cardiology vs neurology career paths',
        'Requirements for surgical specializations'
      ]
    },
    {
      id: 'certification',
      title: 'Certification Planning',
      description: 'Plan your professional certifications and continuing education',
      icon: 'Award',
      prompts: [
        'What certifications do I need for my specialty?',
        'Timeline for board certification',
        'Continuing education requirements'
      ]
    },
    {
      id: 'transition',
      title: 'Career Transition',
      description: 'Navigate career changes and new opportunities',
      icon: 'ArrowRight',
      prompts: [
        'How to transition from clinical to research?',
        'Moving from hospital to private practice',
        'International medical career opportunities'
      ]
    },
    {
      id: 'advancement',
      title: 'Career Advancement',
      description: 'Strategies for professional growth and leadership',
      icon: 'TrendingUp',
      prompts: [
        'Path to department head position',
        'Building a medical practice',
        'Academic medicine career track'
      ]
    },
    {
      id: 'salary',
      title: 'Compensation & Benefits',
      description: 'Understand salary expectations and negotiation',
      icon: 'DollarSign',
      prompts: [
        'Salary expectations for my specialty',
        'How to negotiate medical contracts',
        'Benefits comparison across positions'
      ]
    },
    {
      id: 'worklife',
      title: 'Work-Life Balance',
      description: 'Maintain healthy work-life integration in medicine',
      icon: 'Scale',
      prompts: [
        'Managing burnout in medical practice',
        'Flexible work arrangements in healthcare',
        'Part-time opportunities for physicians'
      ]
    }
  ];

  const recentConversations = [
    {
      id: 1,
      title: 'Cardiology Specialization Path',
      lastMessage: 'Thank you for the detailed roadmap...',
      timestamp: new Date(Date.now() - 3600000),
      messageCount: 12
    },
    {
      id: 2,
      title: 'Board Certification Timeline',
      lastMessage: 'What are the key milestones I should focus on?',
      timestamp: new Date(Date.now() - 7200000),
      messageCount: 8
    },
    {
      id: 3,
      title: 'Research vs Clinical Practice',
      lastMessage: 'Can you help me compare the pros and cons?',
      timestamp: new Date(Date.now() - 86400000),
      messageCount: 15
    }
  ];

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-secondary-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:relative top-0 left-0 h-full w-80 bg-surface border-r border-border z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-text-primary">Career Guidance</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="Plus"
                onClick={onNewChat}
                className="text-primary hover:bg-primary-50"
              >
                New Chat
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={onClose}
                className="lg:hidden"
              />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab('topics')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'topics' ?'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-secondary-50'
              }`}
            >
              <Icon name="MessageSquare" size={16} className="inline mr-2" />
              Topics
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'history' ?'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-secondary-50'
              }`}
            >
              <Icon name="History" size={16} className="inline mr-2" />
              History
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'topics' ? (
              <div className="p-4 space-y-4">
                <div className="text-xs font-medium text-text-muted uppercase tracking-wide mb-3">
                  Quick Start Topics
                </div>
                {quickStartTopics.map((topic) => (
                  <div key={topic.id} className="space-y-2">
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-secondary-50 hover:bg-secondary-100 transition-colors cursor-pointer">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Icon name={topic.icon} size={16} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-text-primary truncate">
                          {topic.title}
                        </h4>
                        <p className="text-xs text-text-muted line-clamp-2">
                          {topic.description}
                        </p>
                      </div>
                    </div>
                    <div className="ml-11 space-y-1">
                      {topic.prompts.map((prompt, index) => (
                        <button
                          key={index}
                          onClick={() => onTopicSelect(prompt)}
                          className="block w-full text-left text-xs text-text-secondary hover:text-primary hover:bg-primary-50 p-2 rounded transition-colors"
                        >
                          "{prompt}"
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 space-y-3">
                <div className="text-xs font-medium text-text-muted uppercase tracking-wide mb-3">
                  Recent Conversations
                </div>
                {recentConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className="group p-3 rounded-lg hover:bg-secondary-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-text-primary truncate mb-1">
                          {conversation.title}
                        </h4>
                        <p className="text-xs text-text-muted line-clamp-2 mb-2">
                          {conversation.lastMessage}
                        </p>
                        <div className="flex items-center space-x-3 text-xs text-text-muted">
                          <span>{formatTimestamp(conversation.timestamp)}</span>
                          <span>•</span>
                          <span>{conversation.messageCount} messages</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteConversation(conversation.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-error-50 hover:text-error rounded transition-all"
                      >
                        <Icon name="Trash2" size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                
                {recentConversations.length === 0 && (
                  <div className="text-center py-8">
                    <Icon name="MessageSquare" size={32} className="text-text-muted mx-auto mb-3" />
                    <p className="text-sm text-text-muted">No conversations yet</p>
                    <p className="text-xs text-text-muted mt-1">Start a new chat to begin</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-2 text-xs text-text-muted">
              <Icon name="Shield" size={14} />
              <span>Your conversations are private and secure</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;