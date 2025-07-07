import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { showSuccess, showError, showDevNotification } from '../../../utils/notifications';
import { tabContent, cardHover } from '../../../utils/animations';

const IntegrationSettingsTab = () => {
  const [integrations, setIntegrations] = useState([
    {
      id: 'epic',
      name: 'Epic EMR',
      description: 'Sync your Epic EMR data for personalized career insights',
      icon: 'Database',
      connected: true,
      lastSync: '2024-01-15 14:30:00',
      status: 'active'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description: 'Import your professional network and career history',
      icon: 'Linkedin',
      connected: true,
      lastSync: '2024-01-15 12:00:00',
      status: 'active'
    },
    {
      id: 'orcid',
      name: 'ORCID',
      description: 'Connect your research profile and publications',
      icon: 'Award',
      connected: false,
      lastSync: null,
      status: 'inactive'
    },
    {
      id: 'pubmed',
      name: 'PubMed',
      description: 'Track your research publications and citations',
      icon: 'BookOpen',
      connected: false,
      lastSync: null,
      status: 'inactive'
    },
    {
      id: 'doximity',
      name: 'Doximity',
      description: 'Sync your medical network and professional updates',
      icon: 'Users',
      connected: false,
      lastSync: null,
      status: 'inactive'
    },
    {
      id: 'google-scholar',
      name: 'Google Scholar',
      description: 'Import your academic publications and citations',
      icon: 'GraduationCap',
      connected: false,
      lastSync: null,
      status: 'inactive'
    }
  ]);

  const [apiSettings, setApiSettings] = useState({
    openai: {
      enabled: true,
      model: 'gpt-4o',
      temperature: 0.7,
      maxTokens: 1000
    },
    webhooks: {
      enabled: false,
      url: '',
      events: ['profile_update', 'document_upload', 'analysis_complete']
    }
  });

  const handleToggleIntegration = (integrationId) => {
    setIntegrations(prev => prev.map(integration => {
      if (integration.id === integrationId) {
        const newStatus = !integration.connected;
        if (newStatus) {
          // Simulate connection success
          showSuccess(`${integration.name} connected successfully!`);
          return {
            ...integration,
            connected: true,
            status: 'active',
            lastSync: new Date().toISOString()
          };
        } else {
          showSuccess(`${integration.name} disconnected successfully!`);
          return {
            ...integration,
            connected: false,
            status: 'inactive',
            lastSync: null
          };
        }
      }
      return integration;
    }));
  };

  const handleSyncIntegration = (integrationId) => {
    setIntegrations(prev => prev.map(integration => {
      if (integration.id === integrationId && integration.connected) {
        showSuccess(`${integration.name} synced successfully!`);
        return {
          ...integration,
          lastSync: new Date().toISOString()
        };
      }
      return integration;
    }));
  };

  const handleConfigureIntegration = (integrationId) => {
    showDevNotification(`Configuration for ${integrations.find(i => i.id === integrationId)?.name}`);
  };

  const handleUpdateApiSettings = () => {
    showDevNotification('API settings update');
  };

  const handleTestWebhook = () => {
    showDevNotification('Webhook testing');
  };

  const handleSyncAll = () => {
    const connectedIntegrations = integrations.filter(i => i.connected);
    if (connectedIntegrations.length === 0) {
      showError('No connected integrations to sync');
      return;
    }

    connectedIntegrations.forEach(integration => {
      handleSyncIntegration(integration.id);
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-600';
      case 'inactive':
        return 'text-gray-400';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return 'CheckCircle';
      case 'inactive':
        return 'Circle';
      case 'error':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <motion.div
      variants={tabContent}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="space-y-6">
        {/* Integration Overview */}
        <div className="bg-surface rounded-medical-card border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-text-primary">Integration Settings</h2>
                <p className="text-text-secondary mt-1">
                  Connect external services to enhance your career insights
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleSyncAll}
                icon={<Icon name="RefreshCw" size={16} />}
              >
                Sync All
              </Button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrations.map(integration => (
                <motion.div
                  key={integration.id}
                  className="border border-border rounded-medical p-4 hover:bg-secondary-25 transition-colors"
                  whileHover={cardHover}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-medical flex items-center justify-center ${
                        integration.connected ? 'bg-primary-50' : 'bg-gray-50'
                      }`}>
                        <Icon
                          name={integration.icon}
                          size={20}
                          color={integration.connected ? 'var(--color-primary)' : 'var(--color-text-muted)'}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-text-primary">{integration.name}</h3>
                          <Icon
                            name={getStatusIcon(integration.status)}
                            size={16}
                            className={getStatusColor(integration.status)}
                          />
                        </div>
                        <p className="text-sm text-text-secondary mt-1">
                          {integration.description}
                        </p>
                        {integration.connected && integration.lastSync && (
                          <p className="text-xs text-text-muted mt-2">
                            Last sync: {new Date(integration.lastSync).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={integration.connected ? "outline" : "primary"}
                        size="sm"
                        onClick={() => handleToggleIntegration(integration.id)}
                      >
                        {integration.connected ? 'Disconnect' : 'Connect'}
                      </Button>
                      {integration.connected && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSyncIntegration(integration.id)}
                        >
                          <Icon name="RefreshCw" size={14} />
                        </Button>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleConfigureIntegration(integration.id)}
                    >
                      <Icon name="Settings" size={14} />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* API Settings */}
        <div className="bg-surface rounded-medical-card border border-border">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-medium text-text-primary flex items-center">
              <Icon name="Code" size={20} className="mr-2" />
              API Settings
            </h3>
            <p className="text-text-secondary mt-1">
              Configure API endpoints and AI model settings
            </p>
          </div>

          <div className="p-6 space-y-6">
            {/* OpenAI Configuration */}
            <div>
              <h4 className="font-medium text-text-primary mb-4">OpenAI Configuration</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Model
                  </label>
                  <select
                    value={apiSettings.openai.model}
                    onChange={(e) => setApiSettings(prev => ({
                      ...prev,
                      openai: { ...prev.openai, model: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="gpt-4o">GPT-4o</option>
                    <option value="gpt-4o-mini">GPT-4o Mini</option>
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Temperature
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={apiSettings.openai.temperature}
                    onChange={(e) => setApiSettings(prev => ({
                      ...prev,
                      openai: { ...prev.openai, temperature: parseFloat(e.target.value) }
                    }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-text-muted mt-1">
                    <span>Precise (0)</span>
                    <span>{apiSettings.openai.temperature}</span>
                    <span>Creative (2)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Max Tokens
                  </label>
                  <input
                    type="number"
                    min="100"
                    max="4000"
                    value={apiSettings.openai.maxTokens}
                    onChange={(e) => setApiSettings(prev => ({
                      ...prev,
                      openai: { ...prev.openai, maxTokens: parseInt(e.target.value) }
                    }))}
                    className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={apiSettings.openai.enabled}
                      onChange={(e) => setApiSettings(prev => ({
                        ...prev,
                        openai: { ...prev.openai, enabled: e.target.checked }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    <span className="ml-3 text-sm font-medium text-text-primary">
                      Enable AI Analysis
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Webhooks Configuration */}
            <div>
              <h4 className="font-medium text-text-primary mb-4">Webhooks</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-text-primary">Enable Webhooks</label>
                    <p className="text-xs text-text-muted">Receive real-time notifications about account events</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={apiSettings.webhooks.enabled}
                      onChange={(e) => setApiSettings(prev => ({
                        ...prev,
                        webhooks: { ...prev.webhooks, enabled: e.target.checked }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                {apiSettings.webhooks.enabled && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Webhook URL
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="url"
                          value={apiSettings.webhooks.url}
                          onChange={(e) => setApiSettings(prev => ({
                            ...prev,
                            webhooks: { ...prev.webhooks, url: e.target.value }
                          }))}
                          placeholder="https://your-app.com/webhook"
                          className="flex-1 px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        <Button
                          variant="outline"
                          onClick={handleTestWebhook}
                        >
                          Test
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Events
                      </label>
                      <div className="space-y-2">
                        {['profile_update', 'document_upload', 'analysis_complete', 'integration_sync'].map(event => (
                          <label key={event} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={apiSettings.webhooks.events.includes(event)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setApiSettings(prev => ({
                                    ...prev,
                                    webhooks: {
                                      ...prev.webhooks,
                                      events: [...prev.webhooks.events, event]
                                    }
                                  }));
                                } else {
                                  setApiSettings(prev => ({
                                    ...prev,
                                    webhooks: {
                                      ...prev.webhooks,
                                      events: prev.webhooks.events.filter(e => e !== event)
                                    }
                                  }));
                                }
                              }}
                              className="rounded border-border text-primary focus:ring-primary-500"
                            />
                            <span className="text-sm text-text-primary">
                              {event.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-border">
              <Button
                variant="primary"
                onClick={handleUpdateApiSettings}
              >
                Save API Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IntegrationSettingsTab;