import React from 'react';
import Icon from '../../../components/AppIcon';
import { motion } from 'framer-motion';

const TimelineVisualization = ({ onMilestoneClick }) => {
  const timelineData = [
    {
      id: 1,
      title: "Окончание мед. вуза",
      date: "Июнь 2020",
      status: "completed",
      type: "education",
      description: "Получена степень MD по специальности 'Внутренние болезни'.",
      icon: "GraduationCap"
    },
    {
      id: 2,
      title: "Резидентура",
      date: "Июль 2020 - Июнь 2023",
      status: "completed",
      type: "training",
      description: "Резидентура по внутренним болезням в госпитале Johns Hopkins.",
      icon: "Stethoscope"
    },
    {
      id: 3,
      title: "Сертификация",
      date: "Август 2023",
      status: "current",
      type: "certification",
      description: "Процесс получения сертификации Американского совета по внутренним болезням.",
      icon: "Award"
    },
    {
      id: 4,
      title: "Ординатура (Кардиология)",
      date: "Июль 2024 (План)",
      status: "upcoming",
      type: "specialization",
      description: "Планируется поступление в ординатуру по кардиологии в клинике Mayo.",
      icon: "HeartPulse"
    },
    {
      id: 5,
      title: "Должность лечащего врача",
      date: "Июль 2026 (Цель)",
      status: "future",
      type: "career",
      description: "Цель - получить должность старшего кардиолога в крупном академическом медицинском центре.",
      icon: "Briefcase"
    }
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case 'completed':
        return {
          ring: 'ring-success',
          bg: 'bg-success',
          text: 'text-success',
          iconBg: 'bg-success/10'
        };
      case 'current':
        return {
          ring: 'ring-primary',
          bg: 'bg-primary',
          text: 'text-primary',
          iconBg: 'bg-primary/10'
        };
      case 'upcoming':
        return {
          ring: 'ring-warning',
          bg: 'bg-warning',
          text: 'text-warning',
          iconBg: 'bg-warning/10'
        };
      default: // future
        return {
          ring: 'ring-secondary-300',
          bg: 'bg-secondary-300',
          text: 'text-secondary-500',
          iconBg: 'bg-secondary-100'
        };
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto p-4">
      <div className="relative pl-8">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 h-full w-0.5 bg-border" aria-hidden="true"></div>

        <ul className="space-y-8">
          {timelineData.map((item, index) => {
            const styles = getStatusStyles(item.status);
            return (
              <motion.li 
                key={item.id}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Dot on the line */}
                <div className="absolute -left-10 top-1.5">
                  <div className={`h-4 w-4 rounded-full ${styles.bg} ring-4 ${styles.ring} ring-opacity-30`}></div>
                </div>

                <div 
                  className="p-4 bg-surface rounded-lg border border-border hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => onMilestoneClick(item)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                       <div className={`w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center ${styles.iconBg}`}>
                          <Icon name={item.icon} className={styles.text} size={24} />
                       </div>
                       <div>
                          <h4 className="font-semibold text-text-primary">{item.title}</h4>
                          <p className={`text-sm font-medium ${styles.text}`}>{item.date}</p>
                       </div>
                    </div>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${styles.bg}/10 ${styles.text}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-text-secondary pl-16">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TimelineVisualization;
