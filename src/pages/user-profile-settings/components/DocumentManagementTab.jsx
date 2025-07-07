import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { showSuccess, showDevNotification } from '../../../utils/notifications';
import { tabContent, cardHover } from '../../../utils/animations';

const DocumentManagementTab = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Medical Resume - 2024.pdf',
      type: 'resume',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      status: 'active',
      url: '#'
    },
    {
      id: 2,
      name: 'Medical License - NY.pdf',
      type: 'license',
      size: '1.2 MB',
      uploadDate: '2024-01-10',
      status: 'active',
      url: '#'
    },
    {
      id: 3,
      name: 'Board Certification - Internal Medicine.pdf',
      type: 'certification',
      size: '900 KB',
      uploadDate: '2024-01-08',
      status: 'active',
      url: '#'
    },
    {
      id: 4,
      name: 'CV - Academic.pdf',
      type: 'cv',
      size: '3.1 MB',
      uploadDate: '2024-01-05',
      status: 'inactive',
      url: '#'
    }
  ]);

  const [uploadingFiles, setUploadingFiles] = useState([]);

  const handleFileUpload = (event, documentType) => {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
      const uploadId = Date.now() + Math.random();
      setUploadingFiles(prev => [...prev, {
        id: uploadId,
        name: file.name,
        type: documentType,
        progress: 0
      }]);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadingFiles(prev => prev.map(item => 
          item.id === uploadId 
            ? { ...item, progress: Math.min(item.progress + 10, 100) }
            : item
        ));
      }, 200);

      // Simulate upload completion
      setTimeout(() => {
        clearInterval(progressInterval);
        setUploadingFiles(prev => prev.filter(item => item.id !== uploadId));
        
        const newDocument = {
          id: Date.now(),
          name: file.name,
          type: documentType,
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          uploadDate: new Date().toISOString().split('T')[0],
          status: 'active',
          url: '#'
        };
        
        setDocuments(prev => [...prev, newDocument]);
        showSuccess(`${file.name} uploaded successfully!`);
      }, 2000);
    });

    // Reset file input
    event.target.value = '';
  };

  const handleDeleteDocument = (documentId) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    showSuccess('Document deleted successfully!');
  };

  const handleDownloadDocument = (document) => {
    showDevNotification(`Document download for ${document.name}`);
  };

  const handleViewDocument = (document) => {
    showDevNotification(`Document viewer for ${document.name}`);
  };

  const handleSetPrimary = (documentId) => {
    setDocuments(prev => prev.map(doc => ({
      ...doc,
      status: doc.id === documentId ? 'active' : 'inactive'
    })));
    showSuccess('Primary document updated!');
  };

  const getDocumentIcon = (type) => {
    switch (type) {
      case 'resume': case'cv':
        return 'FileText';
      case 'license':
        return 'Award';
      case 'certification':
        return 'Shield';
      default:
        return 'File';
    }
  };

  const getDocumentTypeLabel = (type) => {
    switch (type) {
      case 'resume':
        return 'Resume';
      case 'cv':
        return 'CV';
      case 'license':
        return 'Medical License';
      case 'certification':
        return 'Certification';
      default:
        return 'Document';
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
        {/* Upload Section */}
        <div className="bg-surface rounded-medical-card border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">Document Management</h2>
              <p className="text-text-secondary mt-1">
                Upload and manage your professional documents
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Resume Upload */}
            <div className="border-2 border-dashed border-border rounded-medical p-4 text-center hover:border-primary transition-colors">
              <Icon name="FileText" size={32} className="mx-auto mb-2 text-text-muted" />
              <h3 className="text-sm font-medium text-text-primary mb-1">Resume</h3>
              <p className="text-xs text-text-muted mb-3">PDF, DOC, DOCX</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('resume-upload').click()}
              >
                <Icon name="Upload" size={14} className="mr-1" />
                Upload
              </Button>
              <input
                id="resume-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'resume')}
              />
            </div>

            {/* CV Upload */}
            <div className="border-2 border-dashed border-border rounded-medical p-4 text-center hover:border-primary transition-colors">
              <Icon name="FileText" size={32} className="mx-auto mb-2 text-text-muted" />
              <h3 className="text-sm font-medium text-text-primary mb-1">CV</h3>
              <p className="text-xs text-text-muted mb-3">PDF, DOC, DOCX</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('cv-upload').click()}
              >
                <Icon name="Upload" size={14} className="mr-1" />
                Upload
              </Button>
              <input
                id="cv-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'cv')}
              />
            </div>

            {/* License Upload */}
            <div className="border-2 border-dashed border-border rounded-medical p-4 text-center hover:border-primary transition-colors">
              <Icon name="Award" size={32} className="mx-auto mb-2 text-text-muted" />
              <h3 className="text-sm font-medium text-text-primary mb-1">License</h3>
              <p className="text-xs text-text-muted mb-3">PDF, JPG, PNG</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('license-upload').click()}
              >
                <Icon name="Upload" size={14} className="mr-1" />
                Upload
              </Button>
              <input
                id="license-upload"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'license')}
              />
            </div>

            {/* Certification Upload */}
            <div className="border-2 border-dashed border-border rounded-medical p-4 text-center hover:border-primary transition-colors">
              <Icon name="Shield" size={32} className="mx-auto mb-2 text-text-muted" />
              <h3 className="text-sm font-medium text-text-primary mb-1">Certification</h3>
              <p className="text-xs text-text-muted mb-3">PDF, JPG, PNG</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('cert-upload').click()}
              >
                <Icon name="Upload" size={14} className="mr-1" />
                Upload
              </Button>
              <input
                id="cert-upload"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'certification')}
              />
            </div>
          </div>
        </div>

        {/* Upload Progress */}
        {uploadingFiles.length > 0 && (
          <div className="bg-surface rounded-medical-card border border-border p-6">
            <h3 className="text-lg font-medium text-text-primary mb-4">Uploading Files</h3>
            <div className="space-y-3">
              {uploadingFiles.map(file => (
                <div key={file.id} className="flex items-center space-x-3">
                  <Icon name="FileText" size={20} className="text-text-muted" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-text-primary">{file.name}</span>
                      <span className="text-xs text-text-muted">{file.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${file.progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documents List */}
        <div className="bg-surface rounded-medical-card border border-border">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-medium text-text-primary">Your Documents</h3>
            <p className="text-text-secondary mt-1">
              Manage your uploaded documents and certifications
            </p>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {documents.map(document => (
                <motion.div
                  key={document.id}
                  className="flex items-center justify-between p-4 border border-border rounded-medical hover:bg-secondary-25 transition-colors"
                  whileHover={cardHover}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-medical flex items-center justify-center ${
                      document.status === 'active' ? 'bg-primary-50' : 'bg-gray-50'
                    }`}>
                      <Icon
                        name={getDocumentIcon(document.type)}
                        size={20}
                        color={document.status === 'active' ? 'var(--color-primary)' : 'var(--color-text-muted)'}
                      />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-text-primary">{document.name}</h4>
                        {document.status === 'active' && (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                            Primary
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-text-muted">
                        <span>{getDocumentTypeLabel(document.type)}</span>
                        <span>•</span>
                        <span>{document.size}</span>
                        <span>•</span>
                        <span>Uploaded {document.uploadDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDocument(document)}
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownloadDocument(document)}
                    >
                      <Icon name="Download" size={16} />
                    </Button>
                    {document.status !== 'active' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSetPrimary(document.id)}
                      >
                        <Icon name="Star" size={16} />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteDocument(document.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {documents.length === 0 && (
              <div className="text-center py-8">
                <Icon name="FileText" size={48} className="mx-auto mb-4 text-text-muted" />
                <h3 className="text-lg font-medium text-text-primary mb-2">No documents uploaded</h3>
                <p className="text-text-secondary">
                  Upload your professional documents to get started with AI-powered analysis
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentManagementTab;