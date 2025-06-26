import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import PersonalInfoTab from './components/PersonalInfoTab';
import CareerPreferencesTab from './components/CareerPreferencesTab';
import DocumentManagementTab from './components/DocumentManagementTab';
import AccountSecurityTab from './components/AccountSecurityTab';
import IntegrationSettingsTab from './components/IntegrationSettingsTab';
import ProfileCompletionCard from './components/ProfileCompletionCard';

const UserProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    {
      id: 'personal',
      label: 'Personal Info',
      icon: 'User',
      description: 'Basic and professional information'
    },
    {
      id: 'preferences',
      label: 'Career Preferences',
      icon: 'Settings',
      description: 'Notifications and recommendations'
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: 'FileText',
      description: 'Resume and certificate management'
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield',
      description: 'Password and authentication'
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: 'Link',
      description: 'EHR/EMR and external services'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoTab />;
      case 'preferences':
        return <CareerPreferencesTab />;
      case 'documents':
        return <DocumentManagementTab />;
      case 'security':
        return <AccountSecurityTab />;
      case 'integrations':
        return <IntegrationSettingsTab />;
      default:
        return <PersonalInfoTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary-50 rounded-medical flex items-center justify-center">
              <Icon name="Settings" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Profile & Settings</h1>
              <p className="text-text-secondary mt-1">
                Manage your personal information, preferences, and account security
              </p>
            </div>
          </div>
          
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-text-secondary">
            <span>MedPath AI</span>
            <Icon name="ChevronRight" size={14} />
            <span className="text-primary font-medium">Profile & Settings</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="xl:col-span-1">
            <div className="space-y-6">
              {/* Profile Completion Card */}
              <ProfileCompletionCard completionPercentage={75} />
              
              {/* Tab Navigation */}
              <div className="bg-surface rounded-medical-card border border-border overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-text-primary">Settings</h3>
                </div>
                <nav className="p-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-3 rounded-medical text-left medical-transition ${
                        activeTab === tab.id
                          ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:bg-secondary-50 hover:text-primary'
                      }`}
                    >
                      <Icon 
                        name={tab.icon} 
                        size={16} 
                        color={activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-muted)'} 
                      />
                      <div className="flex-1">
                        <div className="font-medium">{tab.label}</div>
                        <div className="text-xs text-text-muted">{tab.description}</div>
                      </div>
                      {activeTab === tab.id && (
                        <Icon name="ChevronRight" size={14} color="var(--color-primary)" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Quick Actions */}
              <div className="bg-surface rounded-medical-card border border-border p-4">
                <h3 className="font-semibold text-text-primary mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:bg-secondary-50 hover:text-primary rounded-medical medical-transition">
                    <Icon name="Download" size={14} />
                    <span>Export Profile Data</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:bg-secondary-50 hover:text-primary rounded-medical medical-transition">
                    <Icon name="RefreshCw" size={14} />
                    <span>Sync All Integrations</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:bg-secondary-50 hover:text-primary rounded-medical medical-transition">
                    <Icon name="HelpCircle" size={14} />
                    <span>Get Help</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-3">
            {/* Mobile Tab Navigation */}
            <div className="xl:hidden mb-6">
              <div className="bg-surface rounded-medical-card border border-border p-2">
                <div className="flex overflow-x-auto space-x-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-medical text-sm font-medium whitespace-nowrap medical-transition ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-text-secondary hover:bg-secondary-50 hover:text-primary'
                      }`}
                    >
                      <Icon 
                        name={tab.icon} 
                        size={14} 
                        color={activeTab === tab.id ? 'currentColor' : 'var(--color-text-muted)'} 
                      />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[600px]">
              {renderTabContent()}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-sm text-text-secondary">
              Last updated: January 15, 2024 at 2:30 PM
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-sm text-error hover:text-error-600 medical-transition">
                Delete Account
              </button>
              <div className="w-px h-4 bg-border" />
              <button className="text-sm text-text-secondary hover:text-primary medical-transition">
                Privacy Policy
              </button>
              <button className="text-sm text-text-secondary hover:text-primary medical-transition">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSettings;