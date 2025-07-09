import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const RecommendationsPanel = ({ onBookmark, isCollapsed, onToggleCollapse }) => {
  const [activeTab, setActiveTab] = useState('certifications');
  const [bookmarkedItems, setBookmarkedItems] = useState(new Set());

  const mockRecommendations = {
    certifications: [
      {
        id: 1,
        title: "Advanced Cardiac Life Support (ACLS)",
        provider: "American Heart Association",
        priority: "high",
        timeToComplete: "2-3 недели",
        cost: "$350",
        icon: "Award"
      },
      {
        id: 2,
        title: "Board Certification in Cardiology",
        provider: "American Board of Internal Medicine",
        priority: "critical",
        timeToComplete: "6 мес. подготовки",
        cost: "$2,500",
        icon: "ShieldCheck"
      },
    ],
    skills: [
      {
        id: 4,
        title: "Interventional Cardiology",
        provider: "Fellowship Training",
        priority: "high",
        timeToComplete: "12-18 месяцев",
        cost: "N/A",
        icon: "Activity"
      },
      {
        id: 5,
        title: "Healthcare Leadership",
        provider: "Online Courses / MBA",
        priority: "medium",
        timeToComplete: "6 месяцев",
        cost: "$1,000+",
        icon: "Users"
      },
    ],
    // Вкладка "Нетворкинг" удалена отсюда
  };

  // И отсюда
  const tabs = [
    { id: 'certifications', label: 'Сертификаты', icon: 'Award', count: mockRecommendations.certifications.length },
    { id: 'skills', label: 'Навыки', icon: 'TrendingUp', count: mockRecommendations.skills.length },
  ];

  const handleBookmarkClick = (itemId) => {
    const newBookmarked = new Set(bookmarkedItems);
    if (newBookmarked.has(itemId)) {
      newBookmarked.delete(itemId);
    } else {
      newBookmarked.add(itemId);
    }
    setBookmarkedItems(newBookmarked);
    onBookmark?.(itemId, !bookmarkedItems.has(itemId));
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'medium': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (isCollapsed) {
    return (
      <div className="bg-surface border-l border-border h-full flex flex-col items-center py-4 w-16 transition-all duration-300">
        <button onClick={onToggleCollapse} className="p-3 hover:bg-secondary-50 rounded-medical medical-transition" title="Развернуть рекомендации">
          <Icon name="PanelLeftOpen" size={20} />
        </button>
        <div className="mt-4 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
          {Object.values(mockRecommendations).flat().length}
        </div>
      </div>
    );
  }

  return (
    <div className="w-96 bg-surface border-l border-border h-full flex flex-col transition-all duration-300">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Рекомендации</h2>
          <button onClick={onToggleCollapse} className="p-2 hover:bg-secondary-50 rounded-medical medical-transition" title="Свернуть рекомендации">
            <Icon name="PanelRightClose" size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between bg-secondary-100 rounded-medical p-1 space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-grow flex items-center justify-center space-x-2 px-2 py-2 rounded-medical text-sm font-medium medical-transition ${
                activeTab === tab.id
                  ? 'bg-surface text-primary medical-shadow-card'
                  : 'text-text-secondary hover:text-primary'
              }`}
            >
              <Icon name={tab.icon} size={14} />
              <span className="truncate">{tab.label}</span>
              <span className={`text-xs rounded-full w-5 h-5 flex items-center justify-center ${activeTab === tab.id ? 'bg-primary text-white' : 'bg-secondary-200 text-secondary-600'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {mockRecommendations[activeTab]?.map((item) => (
              <motion.div
                key={item.id}
                className="bg-surface border border-border rounded-lg p-4 medical-shadow-card hover:border-primary hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -2 }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name={item.icon} size={20} className="text-primary"/>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-text-primary text-sm leading-tight">{item.title}</h3>
                        <p className="text-xs text-text-secondary">{item.provider}</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => handleBookmarkClick(item.id)}
                    className={`p-2 rounded-full transition-colors ${
                      bookmarkedItems.has(item.id)
                        ? 'bg-yellow-100 text-yellow-500' :'bg-secondary-100 text-secondary-400 hover:bg-yellow-100 hover:text-yellow-500'
                    }`}
                    whileTap={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Icon name="Bookmark" size={16} fill={bookmarkedItems.has(item.id) ? 'currentColor' : 'none'} />
                  </motion.button>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs mt-4 pt-3 border-t border-border">
                    <div className="text-text-secondary">Приоритет</div>
                    <div className={`font-medium text-right px-2 py-0.5 rounded-full inline-block justify-self-end ${getPriorityStyles(item.priority)}`}>{item.priority}</div>
                    
                    <div className="text-text-secondary">Время</div>
                    <div className="font-medium text-right text-text-primary">{item.timeToComplete}</div>

                    <div className="text-text-secondary">Стоимость</div>
                    <div className="font-medium text-right text-text-primary">{item.cost}</div>
                </div>

                {/* Actions */}
                <div className="mt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        fullWidth
                        iconName="ArrowRight"
                        iconPosition="right"
                    >
                        Подробнее
                    </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecommendationsPanel;
