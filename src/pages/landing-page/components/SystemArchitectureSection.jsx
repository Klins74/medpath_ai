import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { useI18n } from '../../../contexts/I18nContext';

const SystemArchitectureSection = () => {
  const { t } = useI18n();
  const [openModule, setOpenModule] = useState(null);

  const modules = [
    {
      id: 'data-collection',
      title: 'Модуль сбора данных',
      icon: 'Database',
      description: 'Безопасный сбор и нормализация данных из резюме, медицинских записей и профилей пользователей',
      details: [
        'Парсинг PDF/DOCX документов',
        'Извлечение структурированных данных',
        'Валидация и очистка данных',
        'Шифрование персональных данных'
      ]
    },
    {
      id: 'nlp-analysis',
      title: 'NLP-анализ профиля',
      icon: 'Brain',
      description: 'Обработка естественного языка для анализа профессионального опыта и навыков',
      details: [
        'Извлечение ключевых навыков',
        'Определение уровня опыта',
        'Анализ карьерных траекторий',
        'Семантическое сопоставление специализаций'
      ]
    },
    {
      id: 'ml-prediction',
      title: 'ML-прогноз',
      icon: 'Zap',
      description: 'Машинное обучение для прогнозирования карьерных возможностей и рекомендаций',
      details: [
        'Предсказание карьерного роста',
        'Анализ пробелов в навыках',
        'Рекомендации по развитию',
        'Оценка совместимости специализаций'
      ]
    },
    {
      id: 'llm-planning',
      title: 'LLM-генерация плана',
      icon: 'FileText',
      description: 'Большие языковые модели для создания персонализированных планов развития',
      details: [
        'Генерация карьерных планов',
        'Персонализированные рекомендации',
        'Создание обучающих программ',
        'Адаптивные советы по развитию'
      ]
    },
    {
      id: 'ehr-integration',
      title: 'EHR/EMR-интеграция (FHIR/HL7)',
      icon: 'GitMerge',
      description: 'Интеграция с электронными медицинскими системами через стандарты FHIR и HL7',
      details: [
        'FHIR API интеграция',
        'HL7 совместимость',
        'Синхронизация медицинских данных',
        'HIPAA соответствие'
      ]
    },
    {
      id: 'ui-visualization',
      title: 'UI-визуализация',
      icon: 'BarChart3',
      description: 'Интерактивные дашборды и визуализации для отображения карьерных инсайтов',
      details: [
        'Интерактивные графики',
        'Карьерные временные линии',
        'Дашборды прогресса',
        'Мобильная адаптивность'
      ]
    },
    {
      id: 'monitoring',
      title: 'Мониторинг & аналитика',
      icon: 'Eye',
      description: 'Система мониторинга прогресса и аналитики использования платформы',
      details: [
        'Отслеживание прогресса',
        'Аналитика поведения пользователей',
        'Метрики эффективности',
        'Обратная связь и улучшения'
      ]
    }
  ];

  const toggleModule = (moduleId) => {
    setOpenModule(openModule === moduleId ? null : moduleId);
  };

  return (
    <section className="py-20 lg:py-32 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 bg-primary-100 text-primary px-6 py-3 rounded-full text-xl lg:text-2xl font-semibold mb-8">
            <Icon name="Layers" size={24} />
            <span>Системная архитектура</span>
          </div>
          
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Модульная архитектура платформы, обеспечивающая масштабируемость, безопасность и высокую производительность
          </p>
        </div>

        {/* Interactive Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {modules.map((module) => (
              <div
                key={module.id}
                className="bg-surface border border-border rounded-2xl medical-shadow-card overflow-hidden"
              >
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary-50 medical-transition"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      openModule === module.id ? 'bg-primary text-primary-foreground' : 'bg-primary-50 text-primary'
                    } medical-transition`}>
                      <Icon name={module.icon} size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary mb-1">
                        {module.title}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {module.description}
                      </p>
                    </div>
                  </div>
                  <div className={`transform transition-transform duration-200 ${
                    openModule === module.id ? 'rotate-180' : ''
                  }`}>
                    <Icon name="ChevronDown" size={20} color="var(--color-text-secondary)" />
                  </div>
                </button>
                
                {openModule === module.id && (
                  <div className="px-6 pb-6 border-t border-border bg-secondary-25">
                    <div className="pt-4">
                      <h4 className="text-sm font-medium text-text-primary mb-3 uppercase tracking-wider">
                        Ключевые возможности
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {module.details.map((detail, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                            <span className="text-sm text-text-secondary">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemArchitectureSection;
