import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentManagementTab = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Resume_Sarah_Johnson_2024.pdf',
      type: 'resume',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      status: 'analyzed',
      analysisScore: 92,
      version: '1.2',
      isActive: true
    },
    {
      id: 2,
      name: 'CV_Detailed_2023.docx',
      type: 'cv',
      size: '1.8 MB',
      uploadDate: '2023-12-20',
      status: 'archived',
      analysisScore: 88,
      version: '1.1',
      isActive: false
    },
    {
      id: 3,
      name: 'Medical_License_Certificate.pdf',
      type: 'certificate',
      size: '0.9 MB',
      uploadDate: '2024-01-10',
      status: 'verified',
      analysisScore: null,
      version: '1.0',
      isActive: true
    },
    {
      id: 4,
      name: 'Cardiology_Board_Certification.pdf',
      type: 'certificate',
      size: '1.2 MB',
      uploadDate: '2024-01-08',
      status: 'verified',
      analysisScore: null,
      version: '1.0',
      isActive: true
    }
  ]);

  const [storageUsage] = useState({
    used: 6.3,
    total: 100,
    percentage: 6.3
  });

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const getDocumentIcon = (type) => {
    switch (type) {
      case 'resume': case'cv':
        return 'FileText';
      case 'certificate':
        return 'Award';
      default:
        return 'File';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'analyzed':
        return 'text-success bg-success-50 border-success-200';
      case 'verified':
        return 'text-primary bg-primary-50 border-primary-200';
      case 'archived':
        return 'text-secondary bg-secondary-50 border-secondary-200';
      case 'processing':
        return 'text-warning bg-warning-50 border-warning-200';
      default:
        return 'text-text-muted bg-secondary-50 border-border';
    }
  };

  const handleDocumentAction = (action, documentId) => {
    switch (action) {
      case 'download':
        console.log('Downloading document:', documentId);
        break;
      case 'delete':
        setDocuments(prev => prev.filter(doc => doc.id !== documentId));
        break;
      case 'reanalyze': console.log('Reanalyzing document:', documentId);
        break;
      case 'view':
        setSelectedDocument(documents.find(doc => doc.id === documentId));
        break;
      default:
        break;
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const newDocument = {
        id: Date.now() + Math.random(),
        name: file.name,
        type: file.name.toLowerCase().includes('resume') ? 'resume' : 'document',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'processing',
        analysisScore: null,
        version: '1.0',
        isActive: true
      };
      setDocuments(prev => [...prev, newDocument]);
    });
    setShowUploadModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Storage Usage */}
      <div className="bg-surface rounded-medical-card border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-50 rounded-medical flex items-center justify-center">
              <Icon name="HardDrive" size={16} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Storage Usage</h3>
              <p className="text-sm text-text-secondary">
                {storageUsage.used} MB of {storageUsage.total} MB used
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            iconName="Upload"
            iconPosition="left"
            onClick={() => setShowUploadModal(true)}
          >
            Upload Document
          </Button>
        </div>

        <div className="w-full bg-secondary-100 rounded-full h-3">
          <div 
            className="bg-primary h-3 rounded-full medical-transition-normal"
            style={{ width: `${storageUsage.percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-text-muted mt-2">
          <span>0 MB</span>
          <span>{storageUsage.total} MB</span>
        </div>
      </div>

      {/* Document List */}
      <div className="bg-surface rounded-medical-card border border-border">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">My Documents</h3>
              <p className="text-sm text-text-secondary">
                Manage your uploaded documents and analysis results
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" iconName="Download" size="sm">
                Export All
              </Button>
              <Button variant="ghost" iconName="RefreshCw" size="sm">
                Refresh
              </Button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-border">
          {documents.map((document) => (
            <div key={document.id} className="p-6 hover:bg-secondary-50 medical-transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-medical flex items-center justify-center">
                    <Icon 
                      name={getDocumentIcon(document.type)} 
                      size={20} 
                      color="var(--color-secondary)" 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-text-primary">{document.name}</h4>
                      {document.isActive && (
                        <span className="px-2 py-1 bg-success-50 text-success text-xs rounded-full border border-success-200">
                          Active
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(document.status)}`}>
                        {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-1 text-sm text-text-secondary">
                      <span>{document.size}</span>
                      <span>•</span>
                      <span>Uploaded {document.uploadDate}</span>
                      <span>•</span>
                      <span>Version {document.version}</span>
                      {document.analysisScore && (
                        <>
                          <span>•</span>
                          <span className="text-success font-medium">
                            Analysis Score: {document.analysisScore}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    onClick={() => handleDocumentAction('view', document.id)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Download"
                    onClick={() => handleDocumentAction('download', document.id)}
                  />
                  {document.type === 'resume' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="RefreshCw"
                      onClick={() => handleDocumentAction('reanalyze', document.id)}
                    />
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Trash2"
                    onClick={() => handleDocumentAction('delete', document.id)}
                  />
                </div>
              </div>

              {document.analysisScore && (
                <div className="mt-4 p-4 bg-success-50 rounded-medical border border-success-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-success">AI Analysis Results</span>
                    <span className="text-sm text-success">{document.analysisScore}% Match</span>
                  </div>
                  <div className="w-full bg-success-100 rounded-full h-2">
                    <div 
                      className="bg-success h-2 rounded-full medical-transition"
                      style={{ width: `${document.analysisScore}%` }}
                    />
                  </div>
                  <p className="text-xs text-success-600 mt-2">
                    Strong alignment with cardiology career path. Excellent clinical experience and research background.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Analysis History */}
      <div className="bg-surface rounded-medical-card border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-accent-50 rounded-medical flex items-center justify-center">
            <Icon name="BarChart3" size={16} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Analysis History</h3>
            <p className="text-sm text-text-secondary">Track your document analysis over time</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-primary-50 rounded-medical border border-primary-200">
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="text-sm text-primary">Total Analyses</div>
          </div>
          <div className="text-center p-4 bg-success-50 rounded-medical border border-success-200">
            <div className="text-2xl font-bold text-success">89%</div>
            <div className="text-sm text-success">Average Score</div>
          </div>
          <div className="text-center p-4 bg-accent-50 rounded-medical border border-accent-200">
            <div className="text-2xl font-bold text-accent">3</div>
            <div className="text-sm text-accent">Career Paths</div>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <Button variant="outline" iconName="TrendingUp">
            View Detailed Analytics
          </Button>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-900/50 backdrop-blur-sm">
          <div className="bg-surface rounded-medical-card border border-border p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Upload Document</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setShowUploadModal(false)}
              />
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-medical p-8 text-center">
                <Icon name="Upload" size={32} color="var(--color-text-muted)" className="mx-auto mb-4" />
                <p className="text-text-secondary mb-2">Drag and drop your files here</p>
                <p className="text-sm text-text-muted mb-4">or</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="primary" as="span">
                    Choose Files
                  </Button>
                </label>
              </div>
              
              <p className="text-xs text-text-muted text-center">
                Supported formats: PDF, DOC, DOCX (Max 10MB per file)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Document Viewer Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-900/50 backdrop-blur-sm">
          <div className="bg-surface rounded-medical-card border border-border p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">{selectedDocument.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setSelectedDocument(null)}
              />
            </div>
            
            <div className="bg-secondary-50 rounded-medical p-8 text-center">
              <Icon name="FileText" size={48} color="var(--color-text-muted)" className="mx-auto mb-4" />
              <p className="text-text-secondary">Document preview not available</p>
              <p className="text-sm text-text-muted mt-2">
                Click download to view the full document
              </p>
              <Button
                variant="primary"
                iconName="Download"
                className="mt-4"
                onClick={() => handleDocumentAction('download', selectedDocument.id)}
              >
                Download Document
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManagementTab;