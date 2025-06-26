import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileCompletionCard = ({ completionPercentage = 75 }) => {
  const completionItems = [
    {
      id: 'basic-info',
      label: 'Basic Information',
      completed: true,
      description: 'Name, email, and contact details'
    },
    {
      id: 'professional-info',
      label: 'Professional Information',
      completed: true,
      description: 'Current position and experience'
    },
    {
      id: 'specializations',
      label: 'Medical Specializations',
      completed: true,
      description: 'Areas of medical expertise'
    },
    {
      id: 'career-objectives',
      label: 'Career Objectives',
      completed: true,
      description: 'Professional goals and aspirations'
    },
    {
      id: 'documents',
      label: 'Document Upload',
      completed: false,
      description: 'Resume and certificates'
    },
    {
      id: 'preferences',
      label: 'Career Preferences',
      completed: true,
      description: 'Notification and recommendation settings'
    },
    {
      id: 'security',
      label: 'Security Setup',
      completed: false,
      description: 'Two-factor authentication'
    },
    {
      id: 'integrations',
      label: 'System Integrations',
      completed: false,
      description: 'EHR/EMR and professional networks'
    }
  ];

  const completedCount = completionItems.filter(item => item.completed).length;
  const totalCount = completionItems.length;
  const actualPercentage = Math.round((completedCount / totalCount) * 100);

  const getCompletionColor = (percentage) => {
    if (percentage >= 90) return 'text-success bg-success';
    if (percentage >= 70) return 'text-primary bg-primary';
    if (percentage >= 50) return 'text-warning bg-warning';
    return 'text-error bg-error';
  };

  const getCompletionMessage = (percentage) => {
    if (percentage >= 90) return 'Excellent! Your profile is nearly complete.';
    if (percentage >= 70) return 'Good progress! A few more steps to go.';
    if (percentage >= 50) return 'You\'re halfway there! Keep going.';
    return 'Let\'s get started on completing your profile.';
  };

  return (
    <div className="bg-surface rounded-medical-card border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-primary-50 rounded-medical flex items-center justify-center">
          <Icon name="User" size={16} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Profile Completion</h3>
          <p className="text-sm text-text-secondary">
            Complete your profile for better AI recommendations
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-text-primary">
            {completedCount} of {totalCount} sections completed
          </span>
          <span className={`text-sm font-semibold ${getCompletionColor(actualPercentage).split(' ')[0]}`}>
            {actualPercentage}%
          </span>
        </div>
        
        <div className="w-full bg-secondary-100 rounded-full h-3">
          <div 
            className={`h-3 rounded-full medical-transition-normal ${getCompletionColor(actualPercentage).split(' ')[1]}`}
            style={{ width: `${actualPercentage}%` }}
          />
        </div>
        
        <p className="text-sm text-text-secondary mt-2">
          {getCompletionMessage(actualPercentage)}
        </p>
      </div>

      {/* Completion Items */}
      <div className="space-y-3 mb-6">
        {completionItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center space-x-3 p-3 rounded-medical border medical-transition ${
              item.completed 
                ? 'bg-success-50 border-success-200' :'bg-secondary-50 border-border hover:border-primary-200'
            }`}
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
              item.completed 
                ? 'bg-success text-success-foreground' 
                : 'bg-secondary-200 text-text-muted'
            }`}>
              {item.completed ? (
                <Icon name="Check" size={12} color="currentColor" strokeWidth={2.5} />
              ) : (
                <div className="w-2 h-2 bg-current rounded-full opacity-50" />
              )}
            </div>
            
            <div className="flex-1">
              <div className={`text-sm font-medium ${
                item.completed ? 'text-success' : 'text-text-primary'
              }`}>
                {item.label}
              </div>
              <div className="text-xs text-text-muted">
                {item.description}
              </div>
            </div>
            
            {!item.completed && (
              <Icon name="ChevronRight" size={14} color="var(--color-text-muted)" />
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="primary"
          iconName="ArrowRight"
          iconPosition="right"
          className="flex-1"
        >
          Complete Missing Sections
        </Button>
        <Button
          variant="outline"
          iconName="Eye"
          className="flex-1"
        >
          Preview Profile
        </Button>
      </div>

      {/* Benefits Section */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-text-primary mb-3">Benefits of Complete Profile</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={14} color="var(--color-accent)" />
            <span className="text-sm text-text-secondary">More accurate recommendations</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={14} color="var(--color-accent)" />
            <span className="text-sm text-text-secondary">Better career insights</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={14} color="var(--color-accent)" />
            <span className="text-sm text-text-secondary">Enhanced networking</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={14} color="var(--color-accent)" />
            <span className="text-sm text-text-secondary">Faster AI analysis</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletionCard;