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
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Cpu" size={16} />
            <span>Технологии</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-text-primary mb-6">
            {t('tech_stack_title')}
          </h2>
          
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

        {/* Architecture Diagram */}
        <div className="bg-surface border border-border rounded-2xl p-8 medical-shadow-card">
          <h3 className="text-xl font-semibold text-text-primary mb-8 text-center">
            Архитектура технологического стека
          </h3>
          
          {/* Layers */}
          <div className="space-y-6">
            {/* Frontend Layer */}
            <div className="flex items-center justify-center">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg px-6 py-3">
                <div className="flex items-center space-x-4">
                  <Icon name="Monitor" size={20} color="var(--color-blue-500)" />
                  <span className="font-medium text-blue-700">Frontend Layer</span>
                  <div className="flex space-x-2">
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">React</span>
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">D3.js</span>
                  </div>
                </div>
              </div>
            </div>

            {/* API Layer */}
            <div className="flex items-center justify-center">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg px-6 py-3">
                <div className="flex items-center space-x-4">
                  <Icon name="Server" size={20} color="var(--color-green-500)" />
                  <span className="font-medium text-green-700">API Layer</span>
                  <div className="flex space-x-2">
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">FastAPI</span>
                    <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded">OpenAI</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Processing Layer */}
            <div className="flex items-center justify-center">
              <div className="bg-purple-50 border-2 border-purple-200 rounded-lg px-6 py-3">
                <div className="flex items-center space-x-4">
                  <Icon name="Brain" size={20} color="var(--color-purple-500)" />
                  <span className="font-medium text-purple-700">AI/ML Layer</span>
                  <div className="flex space-x-2">
                    <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">spaCy</span>
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">FHIR</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Layer */}
            <div className="flex items-center justify-center">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg px-6 py-3">
                <div className="flex items-center space-x-4">
                  <Icon name="Database" size={20} color="var(--color-blue-600)" />
                  <span className="font-medium text-blue-700">Data Layer</span>
                  <div className="flex space-x-2">
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">PostgreSQL</span>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Docker</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Connection Lines */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-text-secondary)" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyStackSection;