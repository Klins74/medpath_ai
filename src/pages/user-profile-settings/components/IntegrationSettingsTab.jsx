import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const IntegrationSettingsTab = () => {
  const [integrations, setIntegrations] = useState([
    {
      id: 'epic',
      name: 'Epic EHR',
      description: 'Connect with Epic Electronic Health Records system',
      icon: 'Database',
      status: 'connected',
      lastSync: '2024-01-15 10:30',
      features: ['Patient Data', 'Clinical Notes', 'Scheduling'],
      isActive: true
    },
    {
      id: 'cerner',
      name: 'Cerner PowerChart',
      description: 'Integration with Cerner healthcare information system',
      icon: 'Activity',
      status: 'disconnected',
      lastSync: null,
      features: ['Medical Records', 'Lab Results', 'Medications'],
      isActive: false
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Professional',
      description: 'Sync professional profile and network connections',
      icon: 'Users',
      status: 'connected',
      lastSync: '2024-01-14 16:45',
      features: ['Profile Sync', 'Network Analysis', 'Job Opportunities'],
      isActive: true
    },
    {
      id: 'orcid',
      name: 'ORCID',
      description: 'Connect your research and publication profile',
      icon: 'BookOpen',
      status: 'connected',
      lastSync: '2024-01-13 09:20',
      features: ['Publications', 'Research Profile', 'Citations'],
      isActive: true
    },
    {
      id: 'pubmed',
      name: 'PubMed',
      description: 'Access medical literature and research papers',
      icon: 'Search',
      status: 'available',
      lastSync: null,
      features: ['Literature Search', 'Research Tracking', 'Citation Management'],
      isActive: false
    },
    {
      id: 'medscape',
      name: 'Medscape',
      description: 'Medical news, education, and professional resources',
      icon: 'Newspaper',
      status: 'available',
      lastSync: null,
      features: ['Medical News', 'CME Credits', 'Drug Information'],
      isActive: false
    }
  ]);

  const [apiKeys, setApiKeys] = useState({
    openai: '••••••••••••••••••••••••••••••••sk-1234',
    fhir: '••••••••••••••••••••••••••••••••fhir-5678',
    custom: ''
  });

  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'text-success bg-success-50 border-success-200';
      case 'disconnected':
        return 'text-error bg-error-50 border-error-200';
      case 'syncing':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'available':
        return 'text-secondary bg-secondary-50 border-secondary-200';
      default:
        return 'text-text-muted bg-secondary-50 border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return 'CheckCircle';
      case 'disconnected':
        return 'XCircle';
      case 'syncing':
        return 'RefreshCw';
      case 'available':
        return 'Plus';
      default:
        return 'Circle';
    }
  };

  const handleIntegrationToggle = (integrationId) => {
    setIntegrations(prev => prev.map(integration => {
      if (integration.id === integrationId) {
        const newStatus = integration.status === 'connected' ? 'disconnected' : 'connected';
        return {
          ...integration,
          status: newStatus,
          isActive: newStatus === 'connected',
          lastSync: newStatus === 'connected' ? new Date().toISOString().slice(0, 16).replace('T', ' ') : null
        };
      }
      return integration;
    }));
  };

  const handleSync = (integrationId) => {
    setIntegrations(prev => prev.map(integration => {
      if (integration.id === integrationId) {
        return {
          ...integration,
          status: 'syncing',
          lastSync: new Date().toISOString().slice(0, 16).replace('T', ' ')
        };
      }
      return integration;
    }));

    // Simulate sync completion
    setTimeout(() => {
      setIntegrations(prev => prev.map(integration => {
        if (integration.id === integrationId) {
          return {
            ...integration,
            status: 'connected'
          };
        }
        return integration;
      }));
    }, 2000);
  };

  const handleApiKeyUpdate = (key, value) => {
    setApiKeys(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleConfigureIntegration = (integration) => {
    setSelectedIntegration(integration);
    setShowApiKeyModal(true);
  };

  return (
    <div className="space-y-6">
      {/* EHR/EMR Integrations */}
      <div className="bg-surface rounded-medical-card border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-primary-50 rounded-medical flex items-center justify-center">
            <Icon name="Database" size={16} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">EHR/EMR Systems</h3>
            <p className="text-sm text-text-secondary">
              Connect with Electronic Health Record systems for enhanced analysis
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {integrations.filter(integration => ['epic', 'cerner'].includes(integration.id)).map((integration) => (
            <div
              key={integration.id}
              className="border border-border rounded-medical p-4 hover:bg-secondary-50 medical-transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary-100 rounded-medical flex items-center justify-center">
                    <Icon name={integration.icon} size={18} color="var(--color-secondary)" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">{integration.name}</h4>
                    <p className="text-sm text-text-secondary">{integration.description}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(integration.status)}`}>
                  <Icon 
                    name={getStatusIcon(integration.status)} 
                    size={12} 
                    className="inline mr-1" 
                  />
                  {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                </span>
              </div>

              <div className="mb-4">
                <div className="text-xs text-text-muted mb-2">Features:</div>
                <div className="flex flex-wrap gap-1">
                  {integration.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {integration.lastSync && (
                <div className="text-xs text-text-muted mb-3">
                  Last sync: {integration.lastSync}
                </div>
              )}

              <div className="flex space-x-2">
                <Button
                  variant={integration.status === 'connected' ? 'danger' : 'primary'}
                  size="sm"
                  onClick={() => handleIntegrationToggle(integration.id)}
                >
                  {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                </Button>
                {integration.status === 'connected' && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="RefreshCw"
                    onClick={() => handleSync(integration.id)}
                  >
                    Sync
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Settings"
                  onClick={() => handleConfigureIntegration(integration)}
                >
                  Configure
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Networks */}
      <div className="bg-surface rounded-medical-card border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-accent-50 rounded-medical flex items-center justify-center">
            <Icon name="Users" size={16} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Professional Networks</h3>
            <p className="text-sm text-text-secondary">
              Connect with professional platforms for career insights
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {integrations.filter(integration => ['linkedin', 'orcid'].includes(integration.id)).map((integration) => (
            <div
              key={integration.id}
              className="border border-border rounded-medical p-4 hover:bg-secondary-50 medical-transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary-100 rounded-medical flex items-center justify-center">
                    <Icon name={integration.icon} size={18} color="var(--color-secondary)" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">{integration.name}</h4>
                    <p className="text-sm text-text-secondary">{integration.description}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(integration.status)}`}>
                  <Icon 
                    name={getStatusIcon(integration.status)} 
                    size={12} 
                    className="inline mr-1" 
                  />
                  {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                </span>
              </div>

              <div className="mb-4">
                <div className="text-xs text-text-muted mb-2">Features:</div>
                <div className="flex flex-wrap gap-1">
                  {integration.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-accent-50 text-accent text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {integration.lastSync && (
                <div className="text-xs text-text-muted mb-3">
                  Last sync: {integration.lastSync}
                </div>
              )}

              <div className="flex space-x-2">
                <Button
                  variant={integration.status === 'connected' ? 'danger' : 'primary'}
                  size="sm"
                  onClick={() => handleIntegrationToggle(integration.id)}
                >
                  {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                </Button>
                {integration.status === 'connected' && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="RefreshCw"
                    onClick={() => handleSync(integration.id)}
                  >
                    Sync
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Research & Medical Resources */}
      <div className="bg-surface rounded-medical-card border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-success-50 rounded-medical flex items-center justify-center">
            <Icon name="BookOpen" size={16} color="var(--color-success)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Research & Medical Resources</h3>
            <p className="text-sm text-text-secondary">
              Access medical literature and professional resources
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {integrations.filter(integration => ['pubmed', 'medscape'].includes(integration.id)).map((integration) => (
            <div
              key={integration.id}
              className="border border-border rounded-medical p-4 hover:bg-secondary-50 medical-transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary-100 rounded-medical flex items-center justify-center">
                    <Icon name={integration.icon} size={18} color="var(--color-secondary)" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">{integration.name}</h4>
                    <p className="text-sm text-text-secondary">{integration.description}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(integration.status)}`}>
                  <Icon 
                    name={getStatusIcon(integration.status)} 
                    size={12} 
                    className="inline mr-1" 
                  />
                  {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                </span>
              </div>

              <div className="mb-4">
                <div className="text-xs text-text-muted mb-2">Features:</div>
                <div className="flex flex-wrap gap-1">
                  {integration.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-success-50 text-success text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleIntegrationToggle(integration.id)}
                >
                  Connect
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ExternalLink"
                >
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Configuration */}
      <div className="bg-surface rounded-medical-card border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-warning-50 rounded-medical flex items-center justify-center">
            <Icon name="Key" size={16} color="var(--color-warning)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">API Configuration</h3>
            <p className="text-sm text-text-secondary">
              Manage API keys and external service connections
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                OpenAI API Key
              </label>
              <div className="flex space-x-2">
                <Input
                  type="password"
                  value={apiKeys.openai}
                  onChange={(e) => handleApiKeyUpdate('openai', e.target.value)}
                  placeholder="Enter OpenAI API key"
                  className="flex-1"
                />
                <Button variant="outline" size="sm" iconName="Eye">
                  Show
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                FHIR Client Key
              </label>
              <div className="flex space-x-2">
                <Input
                  type="password"
                  value={apiKeys.fhir}
                  onChange={(e) => handleApiKeyUpdate('fhir', e.target.value)}
                  placeholder="Enter FHIR client key"
                  className="flex-1"
                />
                <Button variant="outline" size="sm" iconName="Eye">
                  Show
                </Button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Custom Integration Endpoint
            </label>
            <Input
              type="url"
              value={apiKeys.custom}
              onChange={(e) => handleApiKeyUpdate('custom', e.target.value)}
              placeholder="https://your-custom-api.com/endpoint"
            />
          </div>

          <div className="bg-warning-50 rounded-medical p-4 border border-warning-200">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="mt-0.5" />
              <div className="text-sm text-warning">
                <p className="font-medium">Security Notice</p>
                <p>API keys are encrypted and stored securely. Never share your API keys with unauthorized parties.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline">
              Test Connections
            </Button>
            <Button variant="primary" iconName="Save">
              Save API Configuration
            </Button>
          </div>
        </div>
      </div>

      {/* Integration Configuration Modal */}
      {showApiKeyModal && selectedIntegration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-900/50 backdrop-blur-sm">
          <div className="bg-surface rounded-medical-card border border-border p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Configure {selectedIntegration.name}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => {
                  setShowApiKeyModal(false);
                  setSelectedIntegration(null);
                }}
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Connection URL
                </label>
                <Input
                  type="url"
                  placeholder="https://api.example.com"
                  defaultValue="https://api.epic.com/fhir"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Client ID
                </label>
                <Input
                  type="text"
                  placeholder="Enter client ID"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Client Secret
                </label>
                <Input
                  type="password"
                  placeholder="Enter client secret"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowApiKeyModal(false);
                    setSelectedIntegration(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setShowApiKeyModal(false);
                    setSelectedIntegration(null);
                  }}
                >
                  Save Configuration
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationSettingsTab;