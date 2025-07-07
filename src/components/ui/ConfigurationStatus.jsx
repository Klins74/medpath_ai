import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Settings, ExternalLink } from 'lucide-react';
import { getOpenAIConfigStatus, testOpenAIConnection } from '../../utils/openaiClient';

const ConfigurationStatus = ({ onClose }) => {
  const [status, setStatus] = useState(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionResult, setConnectionResult] = useState(null);

  useEffect(() => {
    const configStatus = getOpenAIConfigStatus();
    setStatus(configStatus);
  }, []);

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    setConnectionResult(null);
    
    try {
      const result = await testOpenAIConnection();
      setConnectionResult(result);
    } catch (error) {
      setConnectionResult(false);
    } finally {
      setIsTestingConnection(false);
    }
  };

  if (!status) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold">OpenAI Configuration</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            {status.hasApiKey ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
            <span className="text-sm">
              API Key Present: {status.hasApiKey ? 'Yes' : 'No'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {status.hasValidFormat ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
            <span className="text-sm">
              Valid Format: {status.hasValidFormat ? 'Yes' : 'No'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {status.isInitialized ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
            <span className="text-sm">
              Client Initialized: {status.isInitialized ? 'Yes' : 'No'}
            </span>
          </div>

          {connectionResult !== null && (
            <div className="flex items-center gap-3">
              {connectionResult ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="text-sm">
                Connection Test: {connectionResult ? 'Success' : 'Failed'}
              </span>
            </div>
          )}
        </div>

        {!status.isConfigured && (
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              To configure OpenAI API key:
            </p>
            <ol className="text-sm text-yellow-700 mt-2 list-decimal list-inside space-y-1">
              <li>Create a <code className="bg-yellow-100 px-1 rounded">.env</code> file in your project root</li>
              <li>Add: <code className="bg-yellow-100 px-1 rounded">VITE_OPENAI_API_KEY=your_key_here</code></li>
              <li>Restart your development server</li>
            </ol>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleTestConnection}
            disabled={!status.isConfigured || isTestingConnection}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
          >
            {isTestingConnection ? 'Testing...' : 'Test Connection'}
          </button>
          
          <a
            href="https://platform.openai.com/account/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm"
          >
            Get API Key
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationStatus;