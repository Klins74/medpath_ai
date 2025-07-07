import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { showSuccess, showError } from '../../../utils/notifications';
import { tabContent } from '../../../utils/animations';

const CareerPreferencesTab = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { isDirty }, watch } = useForm({
    defaultValues: {
      preferredSpecializations: ['internal-medicine', 'cardiology'],
      careerGoals: ['clinical-excellence', 'research', 'teaching'],
      workLifeBalance: 'balanced',
      salaryExpectation: '250000-350000',
      geographicPreference: ['new-york', 'california'],
      practiceType: 'hospital',
      workSchedule: 'full-time',
      patientPopulation: ['adults', 'elderly'],
      notifications: {
        jobAlerts: true,
        careerTips: true,
        industryNews: true,
        networkingEvents: false,
        continualEducation: true
      },
      aiRecommendations: {
        personalizedSuggestions: true,
        automatedAnalysis: true,
        careerPathPrediction: false
      }
    }
  });

  const watchedValues = watch();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Career preferences updated:', data);
      showSuccess('Career preferences updated successfully!');
    } catch (error) {
      showError('Failed to update preferences. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const specializations = [
    'internal-medicine',
    'cardiology',
    'neurology',
    'oncology',
    'pediatrics',
    'surgery',
    'psychiatry',
    'radiology',
    'emergency-medicine',
    'family-medicine',
    'dermatology',
    'orthopedics'
  ];

  const careerGoalOptions = [
    'clinical-excellence',
    'research',
    'teaching',
    'administration',
    'entrepreneurship',
    'public-health',
    'policy-making',
    'consulting'
  ];

  const geographicOptions = [
    'new-york',
    'california',
    'texas',
    'florida',
    'illinois',
    'pennsylvania',
    'ohio',
    'michigan',
    'massachusetts',
    'washington'
  ];

  return (
    <motion.div
      variants={tabContent}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="bg-surface rounded-medical-card border border-border">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">Career Preferences</h2>
              <p className="text-text-secondary mt-1">
                Customize your career goals and notification preferences
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
          {/* Specialization Preferences */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4 flex items-center">
              <Icon name="Target" size={20} className="mr-2" />
              Specialization Preferences
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {specializations.map((spec) => (
                <label key={spec} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    {...register('preferredSpecializations')}
                    type="checkbox"
                    value={spec}
                    className="rounded border-border text-primary focus:ring-primary-500"
                  />
                  <span className="text-sm text-text-primary capitalize">
                    {spec.replace('-', ' ')}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Career Goals */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4 flex items-center">
              <Icon name="TrendingUp" size={20} className="mr-2" />
              Career Goals
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {careerGoalOptions.map((goal) => (
                <label key={goal} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    {...register('careerGoals')}
                    type="checkbox"
                    value={goal}
                    className="rounded border-border text-primary focus:ring-primary-500"
                  />
                  <span className="text-sm text-text-primary capitalize">
                    {goal.replace('-', ' ')}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Work Preferences */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4 flex items-center">
              <Icon name="Clock" size={20} className="mr-2" />
              Work Preferences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Work-Life Balance Priority
                </label>
                <select
                  {...register('workLifeBalance')}
                  className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="work-focused">Work-Focused</option>
                  <option value="balanced">Balanced</option>
                  <option value="life-focused">Life-Focused</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Salary Expectation
                </label>
                <select
                  {...register('salaryExpectation')}
                  className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="150000-250000">$150,000 - $250,000</option>
                  <option value="250000-350000">$250,000 - $350,000</option>
                  <option value="350000-450000">$350,000 - $450,000</option>
                  <option value="450000-550000">$450,000 - $550,000</option>
                  <option value="550000+">$550,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Practice Type
                </label>
                <select
                  {...register('practiceType')}
                  className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="hospital">Hospital/Health System</option>
                  <option value="private-practice">Private Practice</option>
                  <option value="academic">Academic Medical Center</option>
                  <option value="research">Research Institution</option>
                  <option value="government">Government/VA</option>
                  <option value="telemedicine">Telemedicine</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Work Schedule
                </label>
                <select
                  {...register('workSchedule')}
                  className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                  <option value="locum">Locum Tenens</option>
                  <option value="consulting">Consulting</option>
                  <option value="per-diem">Per Diem</option>
                </select>
              </div>
            </div>
          </div>

          {/* Geographic Preferences */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4 flex items-center">
              <Icon name="MapPin" size={20} className="mr-2" />
              Geographic Preferences
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {geographicOptions.map((location) => (
                <label key={location} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    {...register('geographicPreference')}
                    type="checkbox"
                    value={location}
                    className="rounded border-border text-primary focus:ring-primary-500"
                  />
                  <span className="text-sm text-text-primary capitalize">
                    {location.replace('-', ' ')}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Notification Preferences */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4 flex items-center">
              <Icon name="Bell" size={20} className="mr-2" />
              Notification Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-text-primary">Job Alerts</label>
                  <p className="text-xs text-text-muted">Receive notifications about relevant job opportunities</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    {...register('notifications.jobAlerts')}
                    type="checkbox"
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-text-primary">Career Tips</label>
                  <p className="text-xs text-text-muted">Weekly career development tips and insights</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    {...register('notifications.careerTips')}
                    type="checkbox"
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-text-primary">Industry News</label>
                  <p className="text-xs text-text-muted">Updates on medical industry trends and news</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    {...register('notifications.industryNews')}
                    type="checkbox"
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-text-primary">Networking Events</label>
                  <p className="text-xs text-text-muted">Invitations to professional networking events</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    {...register('notifications.networkingEvents')}
                    type="checkbox"
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-text-primary">Continuing Education</label>
                  <p className="text-xs text-text-muted">CME opportunities and educational resources</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    {...register('notifications.continualEducation')}
                    type="checkbox"
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4 flex items-center">
              <Icon name="Brain" size={20} className="mr-2" />
              AI Recommendations
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-text-primary">Personalized Suggestions</label>
                  <p className="text-xs text-text-muted">Get AI-powered career recommendations based on your profile</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    {...register('aiRecommendations.personalizedSuggestions')}
                    type="checkbox"
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-text-primary">Automated Analysis</label>
                  <p className="text-xs text-text-muted">Allow AI to automatically analyze your career progress</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    {...register('aiRecommendations.automatedAnalysis')}
                    type="checkbox"
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-text-primary">Career Path Prediction</label>
                  <p className="text-xs text-text-muted">AI-powered predictions about your career trajectory</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    {...register('aiRecommendations.careerPathPrediction')}
                    type="checkbox"
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-end pt-6 border-t border-border">
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              disabled={!isDirty}
            >
              Save Preferences
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CareerPreferencesTab;