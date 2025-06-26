import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  isCollapsed = false, 
  onToggleCollapse 
}) => {
  const [activeFilters, setActiveFilters] = useState({
    timeframe: 'all',
    specialization: 'all',
    careerTrack: 'all',
    status: 'all'
  });

  const timeframeOptions = [
    { value: 'all', label: 'All Time', icon: 'Calendar' },
    { value: '1year', label: 'Next Year', icon: 'Clock' },
    { value: '3years', label: 'Next 3 Years', icon: 'TrendingUp' },
    { value: '5years', label: 'Next 5 Years', icon: 'Target' }
  ];

  const specializationOptions = [
    { value: 'all', label: 'All Specializations', icon: 'Stethoscope' },
    { value: 'cardiology', label: 'Cardiology', icon: 'Heart' },
    { value: 'neurology', label: 'Neurology', icon: 'Brain' },
    { value: 'oncology', label: 'Oncology', icon: 'Shield' },
    { value: 'pediatrics', label: 'Pediatrics', icon: 'Baby' },
    { value: 'surgery', label: 'Surgery', icon: 'Scissors' },
    { value: 'radiology', label: 'Radiology', icon: 'Scan' }
  ];

  const careerTrackOptions = [
    { value: 'all', label: 'All Tracks', icon: 'Map' },
    { value: 'clinical', label: 'Clinical Practice', icon: 'UserCheck' },
    { value: 'research', label: 'Research & Academia', icon: 'Microscope' },
    { value: 'administration', label: 'Healthcare Administration', icon: 'Building' },
    { value: 'education', label: 'Medical Education', icon: 'GraduationCap' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses', icon: 'List' },
    { value: 'completed', label: 'Completed', icon: 'CheckCircle' },
    { value: 'current', label: 'In Progress', icon: 'Clock' },
    { value: 'upcoming', label: 'Upcoming', icon: 'Calendar' },
    { value: 'future', label: 'Future Goals', icon: 'Target' }
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      timeframe: 'all',
      specialization: 'all',
      careerTrack: 'all',
      status: 'all'
    };
    setActiveFilters(clearedFilters);
    onFilterChange?.(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(value => value !== 'all').length;
  };

  if (isCollapsed) {
    return (
      <div className="w-16 bg-surface border-r border-border h-full flex flex-col items-center py-4 space-y-4">
        <button
          onClick={onToggleCollapse}
          className="p-3 hover:bg-secondary-50 rounded-medical medical-transition"
          title="Expand Filters"
        >
          <Icon name="SlidersHorizontal" size={20} />
        </button>
        {getActiveFilterCount() > 0 && (
          <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
            {getActiveFilterCount()}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-80 bg-surface border-r border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
          <button
            onClick={onToggleCollapse}
            className="p-2 hover:bg-secondary-50 rounded-medical medical-transition"
            title="Collapse Filters"
          >
            <Icon name="PanelLeftClose" size={16} />
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">
            {getActiveFilterCount()} active filter{getActiveFilterCount() !== 1 ? 's' : ''}
          </span>
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Timeframe Filter */}
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-3">Timeframe</h3>
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

        {/* Specialization Filter */}
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-3">Specialization Focus</h3>
          <div className="space-y-2">
            {specializationOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleFilterChange('specialization', option.value)}
                className={`w-full flex items-center space-x-3 p-3 rounded-medical text-left medical-transition ${
                  activeFilters.specialization === option.value
                    ? 'bg-primary-50 text-primary border border-primary-200' :'hover:bg-secondary-50 text-text-secondary'
                }`}
              >
                <Icon name={option.icon} size={16} />
                <span className="text-sm">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Career Track Filter */}
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-3">Career Track</h3>
          <div className="space-y-2">
            {careerTrackOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleFilterChange('careerTrack', option.value)}
                className={`w-full flex items-center space-x-3 p-3 rounded-medical text-left medical-transition ${
                  activeFilters.careerTrack === option.value
                    ? 'bg-primary-50 text-primary border border-primary-200' :'hover:bg-secondary-50 text-text-secondary'
                }`}
              >
                <Icon name={option.icon} size={16} />
                <span className="text-sm">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <h3 className="text-sm font-medium text-text-primary mb-3">Status</h3>
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

      {/* Footer */}
      <div className="p-6 border-t border-border">
        <Button
          variant="primary"
          fullWidth
          iconName="Filter"
          onClick={() => console.log('Apply filters:', activeFilters)}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;