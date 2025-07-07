import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useI18n } from '../../../contexts/I18nContext';

const FileUploadZone = ({ onFileSelect, uploadProgress, isUploading, selectedFile }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const { t } = useI18n();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(t('file_type_error'));
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert(t('file_size_error'));
      return;
    }

    onFileSelect(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.doc"
        onChange={handleFileInputChange}
        className="hidden"
      />
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!selectedFile ? triggerFileInput : undefined}
        className={`relative border-2 border-dashed rounded-medical-card p-8 text-center medical-transition cursor-pointer ${
          isDragOver
            ? 'border-primary bg-primary-50'
            : selectedFile
            ? 'border-success bg-success-50' :'border-secondary-300 bg-secondary-50 hover:border-primary hover:bg-primary-50'
        }`}
      >
        {!selectedFile ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                isDragOver ? 'bg-primary text-primary-foreground' : 'bg-secondary-200 text-text-secondary'
              }`}>
                <Icon name="Upload" size={32} />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {t('upload_your_resume')}
              </h3>
              <p className="text-text-secondary mb-4">
                {t('drag_drop_resume')}
              </p>
              <p className="text-sm text-text-muted">
                {t('supports_pdf_docx')}
              </p>
            </div>
            
            <Button variant="primary" iconName="Upload" iconPosition="left">
              {t('choose_file')}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center">
                <Icon name="FileText" size={32} color="white" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-success mb-2">
                {t('file_uploaded_successfully')}
              </h3>
              <p className="text-text-primary font-medium">{selectedFile.name}</p>
              <p className="text-sm text-text-secondary">
                {formatFileSize(selectedFile.size)} • {selectedFile.type.includes('pdf') ? 'PDF' : 'DOCX'}
              </p>
            </div>
            
            {isUploading && (
              <div className="w-full max-w-md mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text-primary">{t('processing')}</span>
                  <span className="text-sm text-text-secondary">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full medical-transition-normal"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-center space-x-4">
              <Button 
                variant="outline" 
                iconName="RotateCcw" 
                iconPosition="left"
                onClick={triggerFileInput}
                disabled={isUploading}
              >
                {t('replace_file')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadZone;