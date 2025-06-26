import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalysisResults = ({ analysisData, isAnalyzing }) => {
  const [expandedSection, setExpandedSection] = useState('summary');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (isAnalyzing) {
    return (
      <div className="bg-surface border border-border rounded-medical-card p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Analyzing Your Resume
            </h3>
            <p className="text-text-secondary">
              Our AI is processing your document and generating insights...
            </p>
          </div>
          <div className="text-sm text-text-muted">
            Estimated time: 30-60 seconds
          </div>
        </div>
      </div>
    );
  }

  if (!analysisData) {
    return null;
  }

  const sections = [
    {
      id: 'summary',
      title: 'Professional Summary',
      icon: 'User',
      content: analysisData.summary,
      color: 'primary'
    },
    {
      id: 'experience',
      title: 'Experience Highlights',
      icon: 'Briefcase',
      content: analysisData.experience,
      color: 'success'
    },
    {
      id: 'skills',
      title: 'Key Skills',
      icon: 'Award',
      content: analysisData.skills,
      color: 'accent'
    },
    {
      id: 'gaps',
      title: 'Skill Gaps & Recommendations',
      icon: 'Target',
      content: analysisData.gaps,
      color: 'warning'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
          <Icon name="CheckCircle" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">
            Analysis Complete
          </h3>
          <p className="text-sm text-text-secondary">
            AI-powered insights from your resume
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-surface border border-border rounded-medical-card overflow-hidden"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary-50 medical-transition"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-medical flex items-center justify-center ${
                  section.color === 'primary' ? 'bg-primary-50 text-primary' :
                  section.color === 'success' ? 'bg-success-50 text-success' :
                  section.color === 'accent'? 'bg-accent-50 text-accent' : 'bg-warning-50 text-warning'
                }`}>
                  <Icon name={section.icon} size={16} />
                </div>
                <span className="font-medium text-text-primary">
                  {section.title}
                </span>
              </div>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`text-text-secondary medical-transition ${
                  expandedSection === section.id ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedSection === section.id && (
              <div className="px-4 pb-4">
                <div className="bg-secondary-50 rounded-medical p-4">
                  {Array.isArray(section.content) ? (
                    <ul className="space-y-2">
                      {section.content.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="ArrowRight" size={14} className="text-text-muted mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-text-secondary">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {section.content}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="text-sm text-text-muted">
          Analysis completed at {new Date().toLocaleTimeString()}
        </div>
        <Button variant="outline" iconName="Download" iconPosition="left">
          Download Report
        </Button>
      </div>
    </div>
  );
};

export default AnalysisResults;