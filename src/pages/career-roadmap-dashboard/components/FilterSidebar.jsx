import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

// Добавляем onApplyFilters в пропсы
const FilterSidebar = ({ onApplyFilters, isCollapsed, onToggleCollapse }) => {
  const [activeFilters, setActiveFilters] = useState({
    timeframe: 'all',
    status: 'all'
  });

  const timeframeOptions = [
    { value: 'all', label: 'Все время', icon: 'Calendar' },
    { value: '1year', label: 'След. год', icon: 'Clock' },
    { value: '3years', label: 'След. 3 года', icon: 'TrendingUp' },
    { value: '5years', label: 'След. 5 лет', icon: 'Target' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Все статусы', icon: 'List' },
    { value: 'completed', label: 'Завершено', icon: 'CheckCircle' },
    { value: 'current', label: 'В процессе', icon: 'Clock' },
    { value: 'upcoming', label: 'Предстоит', icon: 'Calendar' },
    { value: 'future', label: 'Цели', icon: 'Target' }
  ];

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleApply = () => {
    onApplyFilters(activeFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(value => value !== 'all').length;
  };

  if (isCollapsed) {
    return (
      <div className="bg-surface border-r border-border h-full flex flex-col items-center py-4 w-16 transition-all duration-300">
        <button onClick={onToggleCollapse} className="p-3 hover:bg-secondary-50 rounded-medical medical-transition" title="Развернуть фильтры">
          <Icon name="PanelRightOpen" size={20} />
        </button>
        {getActiveFilterCount() > 0 && (
          <div className="mt-4 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
            {getActiveFilterCount()}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-80 bg-surface border-r border-border h-full flex flex-col transition-all duration-300">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Фильтры</h2>
          <button onClick={onToggleCollapse} className="p-2 hover:bg-secondary-50 rounded-medical medical-transition" title="Свернуть фильтры">
            <Icon name="PanelLeftClose" size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-3">Временной диапазон</h3>
          <div className="space-y-2">
            {timeframeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleFilterChange('timeframe', option.value)}
                className={`w-full flex items-center space-x-3 p-3 rounded-medical text-left medical-transition ${
                  activeFilters.timeframe === option.value
                    ? 'bg-primary-50 text-primary border border-primary-200' :'hover:bg-secondary-50 text-text-secondary'
                }`}
              >
                <Icon name={option.icon} size={16} />
                <span className="text-sm">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-3">Статус</h3>
          <div className="space-y-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleFilterChange('status', option.value)}
                className={`w-full flex items-center space-x-3 p-3 rounded-medical text-left medical-transition ${
                  activeFilters.status === option.value
                    ? 'bg-primary-50 text-primary border border-primary-200' :'hover:bg-secondary-50 text-text-secondary'
                }`}
              >
                <Icon name={option.icon} size={16} />
                <span className="text-sm">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <Button
          variant="primary"
          fullWidth
          iconName="Filter"
          onClick={handleApply}
        >
          Применить фильтры
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
