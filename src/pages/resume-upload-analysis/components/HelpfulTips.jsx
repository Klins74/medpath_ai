import React from 'react';
import Icon from '../../../components/AppIcon';

const HelpfulTips = () => {
  const tips = [
    {
      icon: 'FileText',
      title: 'Optimal Format',
      description: 'Use PDF format for best text extraction and analysis accuracy.',
      color: 'primary'
    },
    {
      icon: 'Layout',
      title: 'Clear Structure',
      description: 'Organize your resume with clear sections: experience, education, skills.',
      color: 'success'
    },
    {
      icon: 'Award',
      title: 'Include Certifications',
      description: 'List all medical certifications, licenses, and continuing education.',
      color: 'accent'
    },
    {
      icon: 'Target',
      title: 'Quantify Achievements',
      description: 'Include specific metrics: patient volumes, success rates, team sizes.',
      color: 'warning'
    },
    {
      icon: 'Clock',
      title: 'Recent Experience',
      description: 'Emphasize recent roles and responsibilities for better career mapping.',
      color: 'primary'
    },
    {
      icon: 'Users',
      title: 'Team Leadership',
      description: 'Highlight leadership roles, mentoring, and collaborative experiences.',
      color: 'success'
    }
  ];

  const analysisFactors = [
    'Medical terminology recognition',
    'Career progression patterns',
    'Skill gap identification',
    'Specialization alignment',
    'Experience level assessment',
    'Growth potential analysis'
  ];

  return (
    <div className="space-y-6">
      {/* Tips Section */}
      <div className="bg-surface border border-border rounded-medical-card p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-primary-50 rounded-medical flex items-center justify-center">
            <Icon name="Lightbulb" size={16} color="var(--color-primary)" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">
            Resume Tips
          </h3>
        </div>

        <div className="space-y-4">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-medical flex items-center justify-center flex-shrink-0 ${
                tip.color === 'primary' ? 'bg-primary-50 text-primary' :
                tip.color === 'success' ? 'bg-success-50 text-success' :
                tip.color === 'accent'? 'bg-accent-50 text-accent' : 'bg-warning-50 text-warning'
              }`}>
                <Icon name={tip.icon} size={14} />
              </div>
              <div>
                <h4 className="font-medium text-text-primary text-sm">
                  {tip.title}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Factors */}
      <div className="bg-surface border border-border rounded-medical-card p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-accent-50 rounded-medical flex items-center justify-center">
            <Icon name="Brain" size={16} color="var(--color-accent)" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">
            AI Analysis Factors
          </h3>
        </div>

        <div className="space-y-2">
          {analysisFactors.map((factor, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Check" size={14} color="var(--color-success)" />
              <span className="text-sm text-text-secondary">{factor}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-accent-50 rounded-medical">
          <p className="text-xs text-accent">
            <Icon name="Info" size={12} className="inline mr-1" />
            Our AI analyzes over 50 data points to provide comprehensive career insights.
          </p>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-surface border border-border rounded-medical-card p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-secondary-100 rounded-medical flex items-center justify-center">
            <Icon name="Shield" size={16} color="var(--color-secondary)" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">
            Privacy & Security
          </h3>
        </div>

        <div className="space-y-2 text-sm text-text-secondary">
          <p>• Your resume is processed securely and encrypted</p>
          <p>• Data is used only for analysis and career guidance</p>
          <p>• Documents are automatically deleted after 30 days</p>
          <p>• No personal information is shared with third parties</p>
        </div>
      </div>
    </div>
  );
};

export default HelpfulTips;