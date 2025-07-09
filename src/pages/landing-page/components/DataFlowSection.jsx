    import React from 'react';
    import Icon from '../../../components/AppIcon';
    import { useI18n } from '../../../contexts/I18nContext';

    const DataFlowSection = () => {
    const { t } = useI18n();

    const flowSteps = [
        {
        id: 1,
        title: 'Резюме',
        icon: 'FileText',
        description: 'Загрузка CV/резюме',
        color: 'bg-blue-500'
        },
        {
        id: 2,
        title: 'Нормализация',
        icon: 'Settings',
        description: 'Обработка и структуризация',
        color: 'bg-green-500'
        },
        {
        id: 3,
        title: 'NLP',
        icon: 'Brain',
        description: 'Анализ естественного языка',
        color: 'bg-purple-500'
        },
        {
        id: 4,
        title: 'ML',
        icon: 'Zap',
        description: 'Машинное обучение',
        color: 'bg-orange-500'
        },
        {
        id: 5,
        title: 'LLM-план',
        icon: 'Target',
        description: 'Генерация плана развития',
        color: 'bg-pink-500'
        },
        {
        id: 6,
        title: 'UI',
        icon: 'Monitor',
        description: 'Визуализация результатов',
        color: 'bg-cyan-500'
        },
        {
        id: 7,
        title: 'Мониторинг',
        icon: 'Eye',
        description: 'Отслеживание прогресса',
        color: 'bg-teal-500'
        }
    ];

    return (
        <section className="py-20 lg:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 bg-accent-100 text-accent px-6 py-3 rounded-full text-xl lg:text-2xl font-semibold mb-8">
                <Icon name="GitBranch" size={24} />
                <span>Поток данных</span>
            </div>
            
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                {t('data_flow_description')}
            </p>
            </div>

            {/* Timeline Visualization */}
            <div className="relative">
            {/* Desktop Timeline */}
            <div className="hidden lg:block">
                <div className="relative">
                {/* Timeline Line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary transform -translate-y-1/2"></div>
                
                {/* Flow Steps */}
                <div className="flex justify-between items-center">
                    {flowSteps.map((step, index) => (
                    <div key={step.id} className="relative flex flex-col items-center group">
                        {/* Step Circle */}
                        <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-white relative z-10 group-hover:scale-110 medical-transition medical-shadow-floating`}>
                        <Icon name={step.icon} size={24} />
                        </div>
                        
                        {/* Step Info */}
                        <div className="mt-4 text-center max-w-24">
                        <h3 className="text-sm font-semibold text-text-primary mb-1">
                            {step.title}
                        </h3>
                        <p className="text-xs text-text-secondary">
                            {step.description}
                        </p>
                        </div>

                        {/* Step Number */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-text-primary text-surface rounded-full flex items-center justify-center text-xs font-bold z-20">
                        {step.id}
                        </div>

                        {/* Arrow */}
                        {index < flowSteps.length - 1 && (
                        <div className="absolute top-8 left-full transform translate-x-4 opacity-0 group-hover:opacity-100 medical-transition">
                            <Icon name="ArrowRight" size={16} color="var(--color-primary)" />
                        </div>
                        )}
                    </div>
                    ))}
                </div>
                </div>
            </div>

            {/* Mobile Timeline */}
            <div className="lg:hidden">
                <div className="space-y-6">
                {flowSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center space-x-4">
                    {/* Step Circle */}
                    <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center text-white flex-shrink-0 relative`}>
                        <Icon name={step.icon} size={20} />
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-text-primary text-surface rounded-full flex items-center justify-center text-xs font-bold">
                        {step.id}
                        </div>
                    </div>
                    
                    {/* Step Info */}
                    <div className="flex-1">
                        <h3 className="text-base font-semibold text-text-primary mb-1">
                        {step.title}
                        </h3>
                        <p className="text-sm text-text-secondary">
                        {step.description}
                        </p>
                    </div>

                    {/* Arrow */}
                    {index < flowSteps.length - 1 && (
                        <div className="flex-shrink-0">
                        <Icon name="ArrowDown" size={16} color="var(--color-text-secondary)" />
                        </div>
                    )}
                    </div>
                ))}
                </div>
            </div>
            </div>

            {/* Process Metrics */}
            <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-primary-50 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={24} color="white" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Быстрая обработка</h3>
                <p className="text-text-secondary text-sm">Анализ резюме менее чем за 5 минут</p>
            </div>
            
            <div className="bg-success-50 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={24} color="white" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Безопасность данных</h3>
                <p className="text-text-secondary text-sm">HIPAA-совместимое шифрование</p>
            </div>
            
            <div className="bg-accent-50 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Target" size={24} color="white" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Точность анализа</h3>
                <p className="text-text-secondary text-sm">95% точность рекомендаций</p>
            </div>
            </div>
        </div>
        </section>
    );
    };

    export default DataFlowSection;
