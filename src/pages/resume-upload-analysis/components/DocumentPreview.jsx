import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentPreview = ({ file, onRemove }) => {
  if (!file) return null;

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return 'FileText';
    if (fileType.includes('word') || fileType.includes('document')) return 'FileText';
    return 'File';
  };

  const getFileTypeColor = (fileType) => {
    if (fileType.includes('pdf')) return 'text-red-600 bg-red-50';
    if (fileType.includes('word') || fileType.includes('document')) return 'text-blue-600 bg-blue-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="bg-surface border border-border rounded-medical-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Document Preview
        </h3>
        <Button
          variant="ghost"
          iconName="X"
          onClick={onRemove}
          className="text-text-muted hover:text-error"
        />
      </div>

      <div className="flex items-start space-x-4">
        {/* File Icon */}
        <div className={`w-16 h-20 rounded-medical flex items-center justify-center ${getFileTypeColor(file.type)}`}>
          <Icon name={getFileIcon(file.type)} size={32} />
        </div>

        {/* File Details */}
        <div className="flex-1 min-w-0">
          <div className="space-y-2">
            <div>
              <h4 className="font-medium text-text-primary truncate" title={file.name}>
                {file.name}
              </h4>
              <p className="text-sm text-text-secondary">
                {formatFileSize(file.size)} • {file.type.includes('pdf') ? 'PDF Document' : 'Word Document'}
              </p>
            </div>

            <div className="flex items-center space-x-4 text-sm text-text-muted">
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} />
                <span>Uploaded {new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            {/* File Status */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-success">
                <Icon name="CheckCircle" size={14} />
                <span className="text-sm font-medium">Ready for Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* File Actions */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="text-xs text-text-muted">
          File validated successfully
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Eye" iconPosition="left">
            Preview
          </Button>
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;