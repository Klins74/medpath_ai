import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useI18n } from '../../../contexts/I18nContext';
// ИСПРАВЛЕНИЕ: Убираем импорт analyzeResume
// import { analyzeResume } from '../../../services/openaiService';

const CTASection = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const specializations = [
    { value: 'cardiology', label: t('cardiology') },
    { value: 'neurology', label: t('neurology') },
    { value: 'pediatrics', label: t('pediatrics') },
    { value: 'surgery', label: t('surgery') },
    { value: 'internal_medicine', label: t('internal_medicine') },
    { value: 'emergency_medicine', label: t('emergency_medicine') }
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.type.includes('document')) {
        setSelectedFile(file);
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf' || file.type.includes('document')) {
        setSelectedFile(file);
      }
    }
  };

  // ИСПРАВЛЕНИЕ: Упрощаем функцию, чтобы она просто перенаправляла на другую страницу
  const handleAnalysis = () => {
    if (!selectedFile || !selectedSpecialization) return;
    // Просто переходим на страницу анализа, передавая информацию о файле
    navigate('/resume-upload-analysis', { 
      state: { 
        file: selectedFile.name,
        specialization: selectedSpecialization 
      } 
    });
  };

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-50 via-surface to-accent-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 bg-accent-100 text-accent px-6 py-3 rounded-full text-xl lg:text-2xl font-semibold mb-8">
            <Icon name="Upload" size={24} />
            <span>Начать анализ</span>
          </div>
          
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            {t('cta_description')}
          </p>
        </div>

        {/* CTA Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-surface border border-border rounded-2xl p-8 medical-shadow-elevated">
            <div className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  {t('upload_resume')} (PDF/DOCX)
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center medical-transition ${
                    dragActive 
                      ? 'border-primary bg-primary-50' 
                      : selectedFile 
                        ? 'border-success bg-success-50' :'border-border bg-secondary-25 hover:border-primary hover:bg-primary-25'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  {selectedFile ? (
                    <div className="space-y-2">
                      <Icon name="CheckCircle" size={48} color="var(--color-success)" />
                      <p className="text-success font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-text-secondary">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Icon name="Upload" size={48} color="var(--color-text-secondary)" />
                      <div>
                        <p className="text-text-primary font-medium mb-1">
                          Перетащите файл или нажмите для выбора
                        </p>
                        <p className="text-sm text-text-secondary">
                          Поддерживаются форматы PDF, DOC, DOCX (до 10 МБ)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Specialization Selector */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  {t('select_specialization')}
                </label>
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl bg-surface text-text-primary focus:border-primary focus:ring-2 focus:ring-primary-100 medical-transition"
                >
                  <option value="">Выберите специализацию...</option>
                  {specializations.map((spec) => (
                    <option key={spec.value} value={spec.value}>
                      {spec.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Analysis Button */}
              <Button
                onClick={handleAnalysis}
                disabled={!selectedFile || !selectedSpecialization || isUploading}
                variant="primary"
                size="lg"
                className="w-full"
                iconName={isUploading ? "Loader" : "ArrowRight"}
                iconPosition="right"
              >
                {isUploading ? t('loading') : t('get_analysis')}
              </Button>

              {/* Security Features */}
              <div className="flex flex-wrap justify-center gap-6 pt-4 border-t border-border">
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="Shield" size={16} color="var(--color-success)" />
                  <span>HIPAA соответствие</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="Lock" size={16} color="var(--color-success)" />
                  <span>Шифрование данных</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="Clock" size={16} color="var(--color-success)" />
                  <span>Анализ за 5 минут</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
