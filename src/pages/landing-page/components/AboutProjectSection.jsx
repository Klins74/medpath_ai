import React from 'react';
import Icon from '../../../components/AppIcon';

const AboutProjectSection = () => {
  const features = [
    {
      icon: 'UserCheck',
      title: 'Персонализация',
      text: 'Все рекомендации и планы строятся на основе ваших уникальных данных, а не на общих советах.',
    },
    {
      icon: 'DatabaseZap',
      title: 'Объективность и данные',
      text: 'ИИ обеспечивает непредвзятый, основанный на данных взгляд на ваши карьерные возможности.',
    },
    {
      icon: 'Clock',
      title: 'Экономия времени',
      text: 'Платформа автоматизирует трудоемкий процесс сбора информации, анализа и планирования.',
    },
    {
      icon: 'BarChart3',
      title: 'Наглядность и структура',
      text: 'Сложная карьерная информация представлена в виде понятных дорожных карт и задач.',
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Левая колонка с текстом */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Icon name="Rocket" size={16} />
                <span>О проекте MedPath AI</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Для чего был сделан проект?
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                Основная цель MedPath AI — помочь медицинским работникам принимать более осознанные и стратегические решения о своем профессиональном развитии, решая проблемы выбора специализации, недостатка менторства и планирования долгосрочного роста.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Ключевые возможности
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <Icon name="FileScan" size={20} className="text-primary mt-1 flex-shrink-0" />
                  <p className="text-text-secondary">
                    <strong>Анализ резюме:</strong> ИИ идентифицирует сильные стороны и пробелы в навыках.
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon name="GitBranch" size={20} className="text-primary mt-1 flex-shrink-0" />
                  <p className="text-text-secondary">
                    <strong>Дорожная карта карьеры:</strong> Генерация детализированного плана с конкретными этапами и сроками.
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon name="MessageSquare" size={20} className="text-primary mt-1 flex-shrink-0" />
                  <p className="text-text-secondary">
                    <strong>ИИ-Консультант:</strong> Чат в реальном времени для ответов на любые карьерные вопросы.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Правая колонка с преимуществами */}
          <div className="bg-surface p-8 rounded-2xl border border-border medical-shadow-card space-y-6">
            <h3 className="text-2xl font-bold text-text-primary text-center">
              Преимущества MedPath AI
            </h3>
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={feature.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">{feature.title}</h4>
                  <p className="text-sm text-text-secondary">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- ВОТ ЭТА СТРОКА САМАЯ ВАЖНАЯ ---
export default AboutProjectSection;