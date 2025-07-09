import React from 'react';
import Icon from '../../../components/AppIcon';
import { useI18n } from '../../../contexts/I18nContext';
import { motion } from 'framer-motion';
import { stagger, slideUp } from '../../../utils/animations';

const HowItWorksSection = () => {
  const { t } = useI18n();

  const steps = [
    {
      id: 1,
      icon: "Database",
      title: "Сбор и нормализация данных",
      description: "Безопасно загрузите резюме в формате PDF или DOCX для комплексного анализа.",
      colors: {
        badge: "from-primary-600 to-primary-500",
        iconBg: "from-primary-100 to-primary-50",
        iconHover: "group-hover:from-primary-600 group-hover:to-primary-500",
        icon: "text-primary",
        titleHover: "group-hover:text-primary-500"
      }
    },
    {
      id: 2,
      icon: "Brain",
      title: "Анализ профиля (NLP)",
      description: "Наши продвинутые NLP-алгоритмы анализируют ваш опыт, навыки и карьерные траектории.",
      colors: {
        badge: "from-purple-600 to-purple-500",
        iconBg: "from-purple-100 to-purple-50",
        iconHover: "group-hover:from-purple-600 group-hover:to-purple-500",
        icon: "text-purple-600",
        titleHover: "group-hover:text-purple-500"
      }
    },
    {
      id: 3,
      icon: "Zap",
      title: "Прогноз и план (ML + LLM)",
      description: "Определяем пробелы в навыках и сильные стороны в медицинских специализациях.",
      colors: {
        badge: "from-accent-600 to-accent-500",
        iconBg: "from-accent-100 to-accent-50",
        iconHover: "group-hover:from-accent-600 group-hover:to-accent-500",
        icon: "text-accent",
        titleHover: "group-hover:text-accent-500"
      }
    },
    {
      id: 4,
      icon: "GitMerge",
      title: "Интеграция с EHR/EMR",
      description: "Интеграция с электронными медицинскими записями через FHIR/HL7 для более точного анализа.",
      colors: {
        badge: "from-red-600 to-red-500",
        iconBg: "from-red-100 to-red-50",
        iconHover: "group-hover:from-red-600 group-hover:to-red-500",
        icon: "text-red-600",
        titleHover: "group-hover:text-red-500"
      }
    },
    {
      id: 5,
      icon: "BarChart3",
      title: "Визуализация траектории",
      description: "Чат с нашим ИИ-консультантом по карьере для персонализированных советов и планов.",
      colors: {
        badge: "from-orange-600 to-orange-500",
        iconBg: "from-orange-100 to-orange-50",
        iconHover: "group-hover:from-orange-600 group-hover:to-orange-500",
        icon: "text-orange-600",
        titleHover: "group-hover:text-orange-500"
      }
    },
    {
      id: 6,
      icon: "Eye",
      title: "Мониторинг и обратная связь",
      description: "Отслеживайте прогресс развития карьеры и получайте обновленные рекомендации.",
      colors: {
        badge: "from-sky-600 to-sky-500",
        iconBg: "from-sky-100 to-sky-50",
        iconHover: "group-hover:from-sky-600 group-hover:to-sky-500",
        icon: "text-sky-600",
        titleHover: "group-hover:text-sky-500"
      }
    }
  ];
 
   return (
     <section className="py-20 lg:py-32 bg-surface">
       <div className="max-w-7xl mx-auto px-6 lg:px-8">
         {/* Section Header */}
         <div className="text-center mb-16">
           {/* Измененный заголовок */}
           <div className="flex justify-center items-center gap-4 mb-6">
             <Icon name="Workflow" size={40} className="text-primary" />
             <h2 className="text-3xl lg:text-5xl font-bold text-text-primary">
               {t('how_it_works_subtitle')}
             </h2>
           </div>
           
           <p className="text-lg text-text-secondary max-w-3xl mx-auto">
             {t('how_it_works_description')}
           </p>
         </div>
 
         {/* Process Flow Layout */}
         <div className="relative">
           <div className="absolute left-1/2 top-0 h-full w-0.5 bg-secondary-200 hidden lg:block" aria-hidden="true"></div>
 
           <motion.div 
             className="space-y-12 lg:space-y-0"
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, amount: 0.1 }}
             variants={stagger}
           >
             {steps.map((step, index) => (
               <motion.div 
                 key={step.id} 
                 className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-center"
                 variants={slideUp}
               >
                 <div className={`mb-6 lg:mb-0 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                   <div className="bg-surface border border-border rounded-2xl p-8 medical-shadow-card hover:medical-shadow-floating medical-transition hover:border-border-muted group relative">
                     <div className={`absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br ${step.colors.badge} text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold medical-shadow-floating`}>
                       {step.id}
                     </div>
                     
                     <div className="flex items-center gap-4 mb-4 mt-6">
                       <div className={`w-16 h-16 bg-gradient-to-br ${step.colors.iconBg} rounded-2xl flex items-center justify-center ${step.colors.icon} ${step.colors.iconHover} group-hover:text-primary-foreground medical-transition`}>
                         <Icon name={step.icon} size={32} />
                       </div>
                       <h3 className={`text-xl font-semibold text-text-primary ${step.colors.titleHover} medical-transition`}>
                         {step.title}
                       </h3>
                     </div>
                     
                     <p className="text-text-secondary leading-relaxed">
                       {step.description}
                     </p>
                   </div>
                 </div>
 
                 <div className="hidden lg:block">
                   <div className={`w-8 h-8 rounded-full bg-secondary-200 border-4 border-surface absolute left-1/2 -translate-x-1/2 flex items-center justify-center`}>
                     <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                   </div>
                 </div>
               </motion.div>
             ))}
           </motion.div>
         </div>
       </div>
     </section>
   );
 };
 
 export default HowItWorksSection;
