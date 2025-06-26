import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import Button from '../../components/ui/Button';
import FileUploadZone from './components/FileUploadZone';
import SpecializationSelector from './components/SpecializationSelector';
import AnalysisResults from './components/AnalysisResults';
import DocumentPreview from './components/DocumentPreview';
import HelpfulTips from './components/HelpfulTips';

const ResumeUploadAnalysis = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { label: 'Upload Resume', description: 'Provide your professional background' },
    { label: 'Select Specialization', description: 'Choose your medical field' },
    { label: 'AI Analysis', description: 'Processing your career profile' },
    { label: 'Review Results', description: 'Explore your career insights' }
  ];

  // Mock analysis data
  const mockAnalysisData = {
    summary: `Experienced healthcare professional with 8+ years in emergency medicine. Strong clinical skills with demonstrated leadership in high-pressure environments. Board-certified with excellent patient care record and team collaboration abilities.`,
    experience: [
      'Emergency Medicine Physician at Metro General Hospital (2018-2024)',
      'Resident Physician at City Medical Center (2015-2018)',
      'Medical Intern at Regional Healthcare System (2014-2015)',
      'Led trauma response team of 12 medical professionals',
      'Managed 200+ emergency cases monthly with 98% patient satisfaction'
    ],
    skills: [
      'Advanced Cardiac Life Support (ACLS) Certified',
      'Trauma Assessment and Management',
      'Electronic Health Records (Epic, Cerner)',
      'Team Leadership and Crisis Management',
      'Patient Communication and Family Counseling',
      'Medical Research and Documentation'
    ],
    gaps: [
      'Consider pursuing fellowship in Emergency Medicine subspecialty',
      'Develop skills in telemedicine and digital health platforms',
      'Enhance administrative and healthcare management experience',
      'Obtain additional certifications in pediatric emergency care',
      'Build expertise in quality improvement and patient safety initiatives'
    ]
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setCurrentStep(2);
    simulateUpload();
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleSpecializationChange = (specialization) => {
    setSelectedSpecialization(specialization);
  };

  const handleStartAnalysis = () => {
    if (!selectedFile || !selectedSpecialization) {
      alert('Please upload your resume and select a specialization');
      return;
    }

    setCurrentStep(3);
    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisData(mockAnalysisData);
      setCurrentStep(4);
    }, 3000);
  };

  const handleContinueToRoadmap = () => {
    navigate('/career-roadmap-dashboard');
  };

  const handleSaveAnalysis = () => {
    // Mock save functionality
    alert('Analysis saved successfully!');
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setAnalysisData(null);
    setCurrentStep(1);
    setUploadProgress(0);
  };

  const canProceedToAnalysis = selectedFile && selectedSpecialization && !isUploading;
  const canContinueToRoadmap = analysisData && !isAnalyzing;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-medical flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">
                Resume Upload & Analysis
              </h1>
              <p className="text-text-secondary">
                Upload your resume for AI-powered career analysis and personalized guidance
              </p>
            </div>
          </div>

          {/* Progress Indicator */}
          <ProgressIndicator 
            currentStep={currentStep}
            totalSteps={4}
            steps={steps}
            className="mb-8"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* File Upload Section */}
            <div className="bg-surface border border-border rounded-medical-card p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-primary-50 rounded-medical flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-text-primary">
                  Step 1: Upload Your Resume
                </h2>
              </div>

              <FileUploadZone
                onFileSelect={handleFileSelect}
                uploadProgress={uploadProgress}
                isUploading={isUploading}
                selectedFile={selectedFile}
              />
            </div>

            {/* Document Preview */}
            {selectedFile && (
              <DocumentPreview
                file={selectedFile}
                onRemove={handleRemoveFile}
              />
            )}

            {/* Specialization Selection */}
            {selectedFile && !isUploading && (
              <div className="bg-surface border border-border rounded-medical-card p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-accent-50 rounded-medical flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-text-primary">
                    Step 2: Select Your Specialization
                  </h2>
                </div>

                <SpecializationSelector
                  selectedSpecialization={selectedSpecialization}
                  onSpecializationChange={handleSpecializationChange}
                />

                {/* Analysis Action */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-text-primary">Ready for Analysis</h3>
                      <p className="text-sm text-text-secondary">
                        Start AI-powered analysis of your career profile
                      </p>
                    </div>
                    <Button
                      variant="primary"
                      iconName="Brain"
                      iconPosition="left"
                      onClick={handleStartAnalysis}
                      disabled={!canProceedToAnalysis}
                    >
                      Start Analysis
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Analysis Results */}
            {(isAnalyzing || analysisData) && (
              <div className="bg-surface border border-border rounded-medical-card p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-success-50 rounded-medical flex items-center justify-center">
                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-text-primary">
                    Step 3: AI Analysis Results
                  </h2>
                </div>

                <AnalysisResults
                  analysisData={analysisData}
                  isAnalyzing={isAnalyzing}
                />
              </div>
            )}

            {/* Action Buttons */}
            {canContinueToRoadmap && (
              <div className="bg-surface border border-border rounded-medical-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      Analysis Complete!
                    </h3>
                    <p className="text-text-secondary">
                      Continue to explore your personalized career roadmap
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      iconName="Save"
                      iconPosition="left"
                      onClick={handleSaveAnalysis}
                    >
                      Save Analysis
                    </Button>
                    <Button
                      variant="primary"
                      iconName="ArrowRight"
                      iconPosition="right"
                      onClick={handleContinueToRoadmap}
                    >
                      Continue to Career Roadmap
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <HelpfulTips />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUploadAnalysis;