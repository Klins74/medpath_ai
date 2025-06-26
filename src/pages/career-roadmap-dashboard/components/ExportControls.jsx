import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportControls = ({ onExport, roadmapData }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [showOptions, setShowOptions] = useState(false);

  const exportFormats = [
    {
      value: 'pdf',
      label: 'PDF Document',
      icon: 'FileText',
      description: 'Complete roadmap with visualizations'
    },
    {
      value: 'png',
      label: 'PNG Image',
      icon: 'Image',
      description: 'Timeline visualization only'
    },
    {
      value: 'json',
      label: 'JSON Data',
      icon: 'Code',
      description: 'Raw data for external tools'
    },
    {
      value: 'csv',
      label: 'CSV Spreadsheet',
      icon: 'Table',
      description: 'Milestone data in tabular format'
    }
  ];

  const handleExport = async (format = exportFormat) => {
    setIsExporting(true);
    setShowOptions(false);

    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock export data based on format
      const exportData = generateExportData(format);
      
      // Create and trigger download
      const blob = new Blob([exportData.content], { type: exportData.mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = exportData.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      onExport?.(format, exportData);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const generateExportData = (format) => {
    const timestamp = new Date().toISOString().split('T')[0];
    
    switch (format) {
      case 'pdf':
        return {
          content: '%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n\n2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [0 0 612 792]\n/Contents 4 0 R\n>>\nendobj\n\n4 0 obj\n<<\n/Length 44\n>>\nstream\nBT\n/F1 12 Tf\n72 720 Td\n(Career Roadmap Export) Tj\nET\nendstream\nendobj\n\nxref\n0 5\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000206 00000 n \ntrailer\n<<\n/Size 5\n/Root 1 0 R\n>>\nstartxref\n299\n%%EOF',
          mimeType: 'application/pdf',
          filename: `career-roadmap-${timestamp}.pdf`
        };
      
      case 'png':
        return {
          content: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
          mimeType: 'image/png',
          filename: `career-timeline-${timestamp}.png`
        };
      
      case 'json':
        const jsonData = {
          exportDate: new Date().toISOString(),
          careerRoadmap: {
            milestones: [
              {
                id: 1,
                title: "Medical School Graduate",
                date: "2020-06-15",
                status: "completed",
                type: "education"
              },
              {
                id: 2,
                title: "Residency Program",
                date: "2020-07-01",
                status: "completed",
                type: "training"
              },
              {
                id: 3,
                title: "Board Certification",
                date: "2023-08-15",
                status: "current",
                type: "certification"
              }
            ],
            progress: {
              overall: 68,
              completed: 12,
              total: 18
            }
          }
        };
        return {
          content: JSON.stringify(jsonData, null, 2),
          mimeType: 'application/json',
          filename: `career-roadmap-${timestamp}.json`
        };
      
      case 'csv':
        const csvData = `Title,Date,Status,Type,Description
Medical School Graduate,2020-06-15,completed,education,Completed MD degree with specialization in Internal Medicine
Residency Program,2020-07-01,completed,training,Internal Medicine Residency at Johns Hopkins Hospital
Board Certification,2023-08-15,current,certification,American Board of Internal Medicine Certification
Fellowship Training,2024-07-01,upcoming,specialization,Cardiology Fellowship at Mayo Clinic
Attending Physician,2026-07-01,future,career,Senior Cardiologist Position at Academic Medical Center`;
        return {
          content: csvData,
          mimeType: 'text/csv',
          filename: `career-milestones-${timestamp}.csv`
        };
      
      default:
        return {
          content: 'Export data',
          mimeType: 'text/plain',
          filename: `career-export-${timestamp}.txt`
        };
    }
  };

  return (
    <div className="relative">
      {/* Main Export Button */}
      <div className="flex items-center space-x-2">
        <Button
          variant="primary"
          onClick={() => handleExport()}
          disabled={isExporting}
          iconName={isExporting ? "Loader2" : "Download"}
          className={isExporting ? "animate-spin" : ""}
        >
          {isExporting ? 'Exporting...' : 'Export Roadmap'}
        </Button>

        <button
          onClick={() => setShowOptions(!showOptions)}
          className="p-2 border border-border rounded-medical hover:bg-secondary-50 medical-transition"
          title="Export Options"
        >
          <Icon name="ChevronDown" size={16} />
        </button>
      </div>

      {/* Export Options Dropdown */}
      {showOptions && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-surface border border-border rounded-medical-card medical-shadow-floating z-50">
          <div className="p-4">
            <h3 className="font-medium text-text-primary mb-3">Export Options</h3>
            
            <div className="space-y-2">
              {exportFormats.map((format) => (
                <button
                  key={format.value}
                  onClick={() => {
                    setExportFormat(format.value);
                    handleExport(format.value);
                  }}
                  disabled={isExporting}
                  className={`w-full flex items-start space-x-3 p-3 rounded-medical text-left medical-transition ${
                    exportFormat === format.value
                      ? 'bg-primary-50 border border-primary-200 text-primary' :'hover:bg-secondary-50 text-text-secondary'
                  } ${isExporting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Icon name={format.icon} size={20} className="mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium">{format.label}</div>
                    <div className="text-xs text-text-muted">{format.description}</div>
                  </div>
                  {isExporting && exportFormat === format.value && (
                    <Icon name="Loader2" size={16} className="animate-spin" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-2 text-xs text-text-muted">
                <Icon name="Info" size={12} />
                <span>Exports include your complete career roadmap data</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Status */}
      {isExporting && (
        <div className="absolute top-full left-0 mt-2 bg-surface border border-border rounded-medical p-3 medical-shadow-card">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Loader2" size={16} className="animate-spin" />
            <span>Preparing your {exportFormats.find(f => f.value === exportFormat)?.label.toLowerCase()}...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportControls;