import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ 
  currentStep = 1, 
  totalSteps = 4, 
  steps = [],
  className = "",
  showLabels = true,
  variant = "default" // default, compact, minimal
}) => {
  const defaultSteps = [
    { label: 'Upload Resume', description: 'Provide your professional background' },
    { label: 'AI Analysis', description: 'Processing your career profile' },
    { label: 'Career Mapping', description: 'Generating personalized roadmap' },
    { label: 'Complete', description: 'Ready to explore your path' }
  ];

  const progressSteps = steps.length > 0 ? steps : defaultSteps.slice(0, totalSteps);
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const getStepStatus = (stepIndex) => {
    const stepNumber = stepIndex + 1;
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepIcon = (stepIndex, status) => {
    if (status === 'completed') return 'CheckCircle';
    if (status === 'current') return 'Circle';
    return 'Circle';
  };

  if (variant === 'minimal') {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-text-secondary">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        <div className="w-full bg-secondary-100 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full medical-transition-normal"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {progressSteps.map((step, index) => {
              const status = getStepStatus(index);
              return (
                <div key={index} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center medical-transition ${
                    status === 'completed' 
                      ? 'bg-success text-success-foreground' 
                      : status === 'current' ?'bg-primary text-primary-foreground' :'bg-secondary-200 text-text-muted'
                  }`}>
                    <Icon 
                      name={getStepIcon(index, status)} 
                      size={16} 
                      color="currentColor"
                    />
                  </div>
                  {index < progressSteps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-2 medical-transition ${
                      status === 'completed' ? 'bg-success' : 'bg-secondary-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-text-primary">
              {progressSteps[currentStep - 1]?.label}
            </div>
            <div className="text-xs text-text-secondary">
              {progressSteps[currentStep - 1]?.description}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-6 right-6 h-0.5 bg-secondary-200">
          <div 
            className="h-full bg-primary medical-transition-normal"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {progressSteps.map((step, index) => {
            const status = getStepStatus(index);
            return (
              <div key={index} className="flex flex-col items-center max-w-32">
                {/* Step Circle */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 medical-transition ${
                  status === 'completed' 
                    ? 'bg-success border-success text-success-foreground medical-shadow-card' 
                    : status === 'current' ?'bg-primary border-primary text-primary-foreground medical-shadow-card' :'bg-surface border-secondary-200 text-text-muted'
                }`}>
                  {status === 'completed' ? (
                    <Icon name="Check" size={20} color="currentColor" strokeWidth={2.5} />
                  ) : status === 'current' ? (
                    <div className="w-3 h-3 bg-current rounded-full animate-pulse" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>

                {/* Step Content */}
                {showLabels && (
                  <div className="mt-3 text-center">
                    <div className={`text-sm font-medium medical-transition ${
                      status === 'current' ?'text-primary' 
                        : status === 'completed' ?'text-success' :'text-text-secondary'
                    }`}>
                      {step.label}
                    </div>
                    <div className="text-xs text-text-muted mt-1 leading-tight">
                      {step.description}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Summary */}
      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="text-text-secondary">
          Progress: {currentStep} of {totalSteps} steps completed
        </span>
        <span className="font-medium text-primary">
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>
    </div>
  );
};

export default ProgressIndicator;