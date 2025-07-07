import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useI18n } from '../../../contexts/I18nContext';

const WelcomeScreen = ({ onStartChat, onSelectTopic }) => {
  const { t } = useI18n();
  
  const welcomeFeatures = [
    {
      icon: 'Brain',
      title: t('ai_powered_guidance'),
      description: t('ai_powered_guidance_desc')
    },
    {
      icon: 'Target',
      title: t('specialization_planning'),
      description: t('specialization_planning_desc')
    },
    {
      icon: 'TrendingUp',
      title: t('career_progression'),
      description: t('career_progression_desc')
    },
    {
      icon: 'Globe',
      title: t('global_opportunities'),
      description: t('global_opportunities_desc')
    }
  ];

  const quickStartTopics = [
    {
      icon: 'Stethoscope',
      title: t('medical_specialization'),
      question: t('medical_specialization_question')
    },
    {
      icon: 'Award',
      title: t('certification_path'),
      question: t('certification_path_question')
    },
    {
      icon: 'ArrowRight',
      title: t('career_transition'),
      question: t('career_transition_question')
    },
    {
      icon: 'DollarSign',
      title: t('salary_expectations'),
      question: t('salary_expectations_question')
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
            {t('welcome_ai_career_guidance')}
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {t('welcome_description')}
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
              {t('quick_start_topics')}
            </h2>
            <p className="text-text-secondary">
              {t('quick_start_topics_desc')}
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
            {t('start_new_conversation')}
          </Button>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-text-muted">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} />
              <span>{t('private_secure')}</span>
            </div>
            <div className="w-1 h-1 bg-text-muted rounded-full" />
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={16} />
              <span>{t('ai_powered')}</span>
            </div>
            <div className="w-1 h-1 bg-text-muted rounded-full" />
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} />
              <span>{t('available_24_7')}</span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-primary-50 rounded-lg p-6 text-left max-w-2xl mx-auto">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-text-primary mb-2">
                {t('how_to_get_best_results')}
              </h3>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>{t('be_specific_background')}</li>
                <li>{t('mention_career_goals')}</li>
                <li>{t('ask_followup_questions')}</li>
                <li>{t('upload_relevant_documents')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;