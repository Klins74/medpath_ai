import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useI18n } from '../../../contexts/I18nContext';

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useI18n();

  const handleStartAnalysis = () => {
    navigate('/resume-upload-analysis');
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-surface to-accent-50 py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary-200 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Icon name="Sparkles" size={16} />
              <span>{t('ai_career_analytics_platform')}</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
              {t('hero_title')}
            </h1>
            
            <p className="text-lg lg:text-xl text-primary mb-4 font-medium">
              {t('hero_slogan')}
            </p>
            
            <p className="text-base lg:text-lg text-text-secondary mb-8 leading-relaxed max-w-2xl">
              {t('hero_description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="primary" 
                size="lg"
                iconName="ArrowRight" 
                iconPosition="right"
                onClick={handleStartAnalysis}
                className="px-8 py-4"
              >
                {t('start_analysis')}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                iconName="Play" 
                iconPosition="left"
                className="px-8 py-4"
              >
                {t('watch_demo')}
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start mt-12 pt-8 border-t border-border">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">10,000+</div>
                <div className="text-sm text-text-secondary">{t('healthcare_professionals')}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-text-secondary">{t('career_satisfaction')}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-text-secondary">{t('medical_specializations')}</div>
              </div>
            </div>
          </div>
          
          {/* Visual */}
          <div className="relative">
            <div className="relative bg-surface rounded-2xl medical-shadow-elevated p-8 lg:p-12">
              {/* Mock Dashboard Preview */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Activity" size={24} color="white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{t('career_analysis_dashboard')}</h3>
                    <p className="text-sm text-text-secondary">{t('ai_insights')}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-success-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="TrendingUp" size={16} color="var(--color-success)" />
                      <span className="text-sm font-medium text-success">{t('career_growth')}</span>
                    </div>
                    <div className="text-2xl font-bold text-success">87%</div>
                  </div>
                  
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Target" size={16} color="var(--color-primary)" />
                      <span className="text-sm font-medium text-primary">{t('skill_match')}</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">92%</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">{t('cardiology')}</span>
                    <span className="text-sm font-medium text-text-primary">85%</span>
                  </div>
                  <div className="w-full bg-secondary-100 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">{t('emergency_medicine_short')}</span>
                    <span className="text-sm font-medium text-text-primary">78%</span>
                  </div>
                  <div className="w-full bg-secondary-100 rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground p-3 rounded-full medical-shadow-floating animate-bounce">
              <Icon name="Brain" size={20} />
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-success text-success-foreground p-3 rounded-full medical-shadow-floating animate-pulse">
              <Icon name="Award" size={20} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;