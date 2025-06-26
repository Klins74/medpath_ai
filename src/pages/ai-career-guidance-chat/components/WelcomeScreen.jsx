import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeScreen = ({ onStartChat, onSelectTopic }) => {
  const welcomeFeatures = [
    {
      icon: 'Brain',
      title: 'AI-Powered Guidance',
      description: 'Get personalized career advice based on your medical background and goals'
    },
    {
      icon: 'Target',
      title: 'Specialization Planning',
      description: 'Explore different medical specialties and find the perfect match for your interests'
    },
    {
      icon: 'TrendingUp',
      title: 'Career Progression',
      description: 'Plan your professional development with milestone tracking and certification guidance'
    },
    {
      icon: 'Globe',
      title: 'Global Opportunities',
      description: 'Discover international medical career paths and requirements'
    }
  ];

  const quickStartTopics = [
    {
      icon: 'Stethoscope',
      title: 'Medical Specialization',
      question: 'What medical specialization would be best for my background and interests?'
    },
    {
      icon: 'Award',
      title: 'Certification Path',
      question: 'What certifications and qualifications do I need for my desired specialty?'
    },
    {
      icon: 'ArrowRight',
      title: 'Career Transition',
      question: 'How can I transition from clinical practice to medical research?'
    },
    {
      icon: 'DollarSign',
      title: 'Salary Expectations',
      question: 'What are the salary expectations for different medical specialties?'
    }
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Welcome Header */}
        <div className="space-y-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
            <Icon name="MessageSquare" size={32} color="white" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary">
            Welcome to AI Career Guidance
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Get personalized medical career advice powered by advanced AI. 
            Ask questions about specializations, certifications, career transitions, and more.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
          {welcomeFeatures.map((feature, index) => (
            <div key={index} className="p-6 bg-surface rounded-lg border border-border hover:border-primary transition-colors">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name={feature.icon} size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Start Topics */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              Quick Start Topics
            </h2>
            <p className="text-text-secondary">
              Click on any topic below to begin your conversation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {quickStartTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => onSelectTopic(topic.question)}
                className="flex items-start space-x-4 p-4 bg-secondary-50 hover:bg-secondary-100 rounded-lg text-left transition-colors group"
              >
                <div className="w-10 h-10 bg-primary-100 group-hover:bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon 
                    name={topic.icon} 
                    size={20} 
                    className="text-primary group-hover:text-white transition-colors" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-text-primary mb-1">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-2">
                    {topic.question}
                  </p>
                </div>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="text-text-muted group-hover:text-primary transition-colors flex-shrink-0 mt-1" 
                />
              </button>
            ))}
          </div>
        </div>

        {/* Start Chat Button */}
        <div className="space-y-4">
          <Button
            variant="primary"
            size="lg"
            iconName="MessageSquare"
            iconPosition="left"
            onClick={onStartChat}
            className="px-8 py-3"
          >
            Start New Conversation
          </Button>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-text-muted">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} />
              <span>Private & Secure</span>
            </div>
            <div className="w-1 h-1 bg-text-muted rounded-full" />
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={16} />
              <span>AI-Powered</span>
            </div>
            <div className="w-1 h-1 bg-text-muted rounded-full" />
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} />
              <span>24/7 Available</span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-primary-50 rounded-lg p-6 text-left max-w-2xl mx-auto">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-text-primary mb-2">
                How to get the best results:
              </h3>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Be specific about your medical background and experience</li>
                <li>• Mention your career goals and interests</li>
                <li>• Ask follow-up questions for detailed guidance</li>
                <li>• Upload relevant documents for personalized advice</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;