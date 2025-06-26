import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CareerPreferencesTab = () => {
  const [preferences, setPreferences] = useState({
    notificationFrequency: 'weekly',
    recommendationTypes: ['career-paths', 'skill-development', 'networking'],
    languagePreference: 'en',
    profileVisibility: 'professional',
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    careerAlerts: true,
    mentorshipInterest: true,
    researchOpportunities: false,
    leadershipRoles: true,
    continuingEducation: true
  });

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleArrayToggle = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }));
  };

  const notificationOptions = [
    { value: 'daily', label: 'Daily', description: 'Receive updates every day' },
    { value: 'weekly', label: 'Weekly', description: 'Weekly summary of activities' },
    { value: 'monthly', label: 'Monthly', description: 'Monthly career insights' },
    { value: 'never', label: 'Never', description: 'No automated notifications' }
  ];

  const recommendationOptions = [
    { value: 'career-paths', label: 'Career Paths', icon: 'TrendingUp' },
    { value: 'skill-development', label: 'Skill Development', icon: 'BookOpen' },
    { value: 'networking', label: 'Networking', icon: 'Users' },
    { value: 'certifications', label: 'Certifications', icon: 'Award' },
    { value: 'job-opportunities', label: 'Job Opportunities', icon: 'Briefcase' },
    { value: 'research', label: 'Research Opportunities', icon: 'Search' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'ru', label: 'Русский', flag: '🇷🇺' },
    { value: 'kz', label: 'Қазақша', flag: '🇰🇿' }
  ];

  const visibilityOptions = [
    { value: 'public', label: 'Public', description: 'Visible to all users', icon: 'Globe' },
    { value: 'professional', label: 'Professional Network', description: 'Visible to verified professionals', icon: 'Users' },
    { value: 'private', label: 'Private', description: 'Only visible to you', icon: 'Lock' }
  ];

  return (
    <div className="space-y-6">
      {/* Notification Preferences */}
      <div className="bg-surface rounded-medical-card border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-primary-50 rounded-medical flex items-center justify-center">
            <Icon name="Bell" size={16} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Notification Preferences</h3>
            <p className="text-sm text-text-secondary">Control how and when you receive updates</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Notification Frequency
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {notificationOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center p-3 border rounded-medical cursor-pointer medical-transition ${
                    preferences.notificationFrequency === option.value
                      ? 'border-primary bg-primary-50' :'border-border hover:border-primary-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="notificationFrequency"
                    value={option.value}
                    checked={preferences.notificationFrequency === option.value}
                    onChange={(e) => handlePreferenceChange('notificationFrequency', e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-text-primary">{option.label}</div>
                    <div className="text-sm text-text-secondary">{option.description}</div>
                  </div>
                  {preferences.notificationFrequency === option.value && (
                    <Icon name="Check" size={16} color="var(--color-primary)" />
                  )}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-text-primary">Email Notifications</h4>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={preferences.emailNotifications}
                  onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">Enable email notifications</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={preferences.weeklyDigest}
                  onChange={(e) => handlePreferenceChange('weeklyDigest', e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">Weekly career digest</span>
              </label>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-text-primary">Push Notifications</h4>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={preferences.pushNotifications}
                  onChange={(e) => handlePreferenceChange('pushNotifications', e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">Enable push notifications</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={preferences.careerAlerts}
                  onChange={(e) => handlePreferenceChange('careerAlerts', e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">Career opportunity alerts</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation Types */}
      <div className="bg-surface rounded-medical-card border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-accent-50 rounded-medical flex items-center justify-center">
            <Icon name="Target" size={16} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Recommendation Types</h3>
            <p className="text-sm text-text-secondary">Choose what types of recommendations you want to receive</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {recommendationOptions.map((option) => (
            <label
              key={option.value}
              className={`flex items-center p-3 border rounded-medical cursor-pointer medical-transition ${
                preferences.recommendationTypes.includes(option.value)
                  ? 'border-accent bg-accent-50' :'border-border hover:border-accent-200'
              }`}
            >
              <input
                type="checkbox"
                checked={preferences.recommendationTypes.includes(option.value)}
                onChange={() => handleArrayToggle('recommendationTypes', option.value)}
                className="sr-only"
              />
              <Icon 
                name={option.icon} 
                size={16} 
                color={preferences.recommendationTypes.includes(option.value) ? 'var(--color-accent)' : 'var(--color-text-muted)'} 
                className="mr-3"
              />
              <span className={`text-sm ${
                preferences.recommendationTypes.includes(option.value) 
                  ? 'text-accent font-medium' :'text-text-secondary'
              }`}>
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Language & Privacy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Language Preference */}
        <div className="bg-surface rounded-medical-card border border-border p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-secondary-100 rounded-medical flex items-center justify-center">
              <Icon name="Globe" size={16} color="var(--color-secondary)" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Language</h3>
              <p className="text-sm text-text-secondary">Select your preferred language</p>
            </div>
          </div>

          <div className="space-y-2">
            {languageOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-center p-3 border rounded-medical cursor-pointer medical-transition ${
                  preferences.languagePreference === option.value
                    ? 'border-primary bg-primary-50' :'border-border hover:border-primary-200'
                }`}
              >
                <input
                  type="radio"
                  name="languagePreference"
                  value={option.value}
                  checked={preferences.languagePreference === option.value}
                  onChange={(e) => handlePreferenceChange('languagePreference', e.target.value)}
                  className="sr-only"
                />
                <span className="text-lg mr-3">{option.flag}</span>
                <span className="text-sm text-text-secondary flex-1">{option.label}</span>
                {preferences.languagePreference === option.value && (
                  <Icon name="Check" size={16} color="var(--color-primary)" />
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-surface rounded-medical-card border border-border p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-warning-50 rounded-medical flex items-center justify-center">
              <Icon name="Shield" size={16} color="var(--color-warning)" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Privacy</h3>
              <p className="text-sm text-text-secondary">Control your profile visibility</p>
            </div>
          </div>

          <div className="space-y-2">
            {visibilityOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-center p-3 border rounded-medical cursor-pointer medical-transition ${
                  preferences.profileVisibility === option.value
                    ? 'border-warning bg-warning-50' :'border-border hover:border-warning-200'
                }`}
              >
                <input
                  type="radio"
                  name="profileVisibility"
                  value={option.value}
                  checked={preferences.profileVisibility === option.value}
                  onChange={(e) => handlePreferenceChange('profileVisibility', e.target.value)}
                  className="sr-only"
                />
                <Icon 
                  name={option.icon} 
                  size={16} 
                  color={preferences.profileVisibility === option.value ? 'var(--color-warning)' : 'var(--color-text-muted)'} 
                  className="mr-3"
                />
                <div className="flex-1">
                  <div className={`text-sm font-medium ${
                    preferences.profileVisibility === option.value ? 'text-warning' : 'text-text-primary'
                  }`}>
                    {option.label}
                  </div>
                  <div className="text-xs text-text-muted">{option.description}</div>
                </div>
                {preferences.profileVisibility === option.value && (
                  <Icon name="Check" size={16} color="var(--color-warning)" />
                )}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Career Interests */}
      <div className="bg-surface rounded-medical-card border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-success-50 rounded-medical flex items-center justify-center">
            <Icon name="Heart" size={16} color="var(--color-success)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Career Interests</h3>
            <p className="text-sm text-text-secondary">Select areas of professional interest</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={preferences.mentorshipInterest}
                onChange={(e) => handlePreferenceChange('mentorshipInterest', e.target.checked)}
                className="rounded border-border text-success focus:ring-success"
              />
              <div>
                <div className="text-sm font-medium text-text-primary">Mentorship Opportunities</div>
                <div className="text-xs text-text-muted">Connect with mentors and mentees</div>
              </div>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={preferences.researchOpportunities}
                onChange={(e) => handlePreferenceChange('researchOpportunities', e.target.checked)}
                className="rounded border-border text-success focus:ring-success"
              />
              <div>
                <div className="text-sm font-medium text-text-primary">Research Opportunities</div>
                <div className="text-xs text-text-muted">Clinical and academic research</div>
              </div>
            </label>
          </div>

          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={preferences.leadershipRoles}
                onChange={(e) => handlePreferenceChange('leadershipRoles', e.target.checked)}
                className="rounded border-border text-success focus:ring-success"
              />
              <div>
                <div className="text-sm font-medium text-text-primary">Leadership Roles</div>
                <div className="text-xs text-text-muted">Management and administrative positions</div>
              </div>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={preferences.continuingEducation}
                onChange={(e) => handlePreferenceChange('continuingEducation', e.target.checked)}
                className="rounded border-border text-success focus:ring-success"
              />
              <div>
                <div className="text-sm font-medium text-text-primary">Continuing Education</div>
                <div className="text-xs text-text-muted">Professional development courses</div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          variant="primary"
          iconName="Save"
          iconPosition="left"
          onClick={() => console.log('Preferences saved:', preferences)}
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default CareerPreferencesTab;