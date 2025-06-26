import React from 'react';
import Icon from '../../../components/AppIcon';
import { useI18n } from '../../../contexts/I18nContext';

const HowItWorksSection = () => {
  const { t } = useI18n();

  const steps = [
    {
      id: 1,
      icon: "Database",
      title: t('step_1_title'),
      description: t('step_1_description')
    },
    {
      id: 2,
      icon: "Brain",
      title: t('step_2_title'),
      description: t('step_2_description')
    },
    {
      id: 3,
      icon: "Zap",
      title: t('step_3_title'),
      description: t('step_3_description')
    },
    {
      id: 4,
      icon: "GitMerge",
      title: t('step_4_title'),
      description: t('step_4_description')
    },
    {
      id: 5,
      icon: "BarChart3",
      title: t('step_5_title'),
      description: t('step_5_description')
    },
    {
      id: 6,
      icon: "Eye",
      title: t('step_6_title'),
      description: t('step_6_description')
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent-100 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Workflow" size={16} />
            <span>{t('how_it_works_subtitle')}</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-text-primary mb-6">
            {t('how_it_works_title')}
          </h2>
          
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            {t('how_it_works_description')}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.id} className="relative group">
              {/* Connection Line (Desktop) */}
              {index < steps.length - 1 && index % 3 !== 2 && (
                <div className="hidden lg:block absolute top-12 left-full w-12 h-0.5 bg-gradient-to-r from-primary to-transparent transform translate-x-6 z-10">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
                </div>
              )}
              
              <div className="bg-surface border border-border rounded-2xl p-8 medical-shadow-card hover:medical-shadow-floating medical-transition group-hover:border-primary/20">
                {/* Step Number */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground medical-transition">
                    <Icon name={step.icon} size={24} />
                  </div>
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.id}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-primary medical-transition">
                  {step.title}
                </h3>
                
                <p className="text-text-secondary leading-relaxed">
                  {step.description}
                </p>
                
                {/* Hover Arrow */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 medical-transition">
                  <div className="flex items-center text-primary text-sm font-medium">
                    <span>Подробнее</span>
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-primary-50 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Готовы трансформировать свою медицинскую карьеру?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Присоединяйтесь к тысячам медицинских специалистов, которые уже открыли свой оптимальный карьерный путь с помощью нашего ИИ-анализа.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Shield" size={16} color="var(--color-success)" />
                <span>HIPAA Совместимо</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Clock" size={16} color="var(--color-success)" />
                <span>5-минутный анализ</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Award" size={16} color="var(--color-success)" />
                <span>Проверено экспертами</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;