import React from 'react';
import Icon from '../../../components/AppIcon';
import { useI18n } from '../../../contexts/I18nContext';

const TechnologyStackSection = () => {
  const { t } = useI18n();

  const technologies = [
    {
      name: 'React',
      category: 'Frontend',
      icon: 'Code',
      description: 'Современный пользовательский интерфейс',
      color: 'bg-blue-500'
    },
    {
      name: 'D3.js',
      category: 'Visualization',
      icon: 'BarChart3',
      description: 'Интерактивная визуализация данных',
      color: 'bg-orange-500'
    },
    {
      name: 'FastAPI',
      category: 'Backend',
      icon: 'Server',
      description: 'Высокопроизводительный API',
      color: 'bg-green-500'
    },
    {
      name: 'spaCy',
      category: 'NLP',
      icon: 'Brain',
      description: 'Обработка естественного языка',
      color: 'bg-purple-500'
    },
    {
      name: 'OpenAI API',
      category: 'AI/ML',
      icon: 'Sparkles',
      description: 'Генеративный искусственный интеллект',
      color: 'bg-emerald-500'
    },
    {
      name: 'PostgreSQL',
      category: 'Database',
      icon: 'Database',
      description: 'Надежное хранение данных',
      color: 'bg-blue-600'
    },
    {
      name: 'FHIR Client',
      category: 'Integration',
      icon: 'GitMerge',
      description: 'Медицинская интеграция',
      color: 'bg-red-500'
    },
    {
      name: 'Docker',
      category: 'DevOps',
      icon: 'Container',
      description: 'Контейнеризация приложений',
      color: 'bg-blue-400'
    }
  ];

  const categories = {
    'Frontend': 'Фронтенд',
    'Backend': 'Бэкенд',
    'AI/ML': 'ИИ/МО',
    'Database': 'База данных',
    'Integration': 'Интеграция',
    'Visualization': 'Визуализация',
    'NLP': 'NLP',
    'DevOps': 'DevOps'
  };

  return (
    <section className="py-20 lg:py-32 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* ИЗМЕНЕНО: Плашка стала основным заголовком */}
          <div className="inline-flex items-center space-x-3 bg-primary-100 text-primary px-6 py-3 rounded-full text-xl lg:text-2xl font-semibold mb-8">
            <Icon name="Cpu" size={24} />
            <span>Технологии</span>
          </div>
          
          {/* ИЗМЕНЕНО: Черный заголовок h2 удален */}
          
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            {t('tech_stack_description')}
          </p>
        </div>

        {/* Technology Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {technologies.map((tech, index) => (
            <div 
              key={tech.name}
              className="bg-surface border border-border rounded-2xl p-6 medical-shadow-card hover:medical-shadow-floating medical-transition group hover:border-primary/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-12 h-12 ${tech.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 medical-transition`}>
                  <Icon name={tech.icon} size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary group-hover:text-primary medical-transition">
                    {tech.name}
                  </h3>
                  <span className="text-xs px-2 py-1 bg-secondary-100 text-text-secondary rounded-full">
                    {categories[tech.category]}
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-text-secondary leading-relaxed">
                {tech.description}
              </p>
              
              {/* Hover Effect */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 medical-transition">
                <div className="h-1 bg-gradient-to-r from-primary to-accent rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologyStackSection;
