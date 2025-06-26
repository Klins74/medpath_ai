import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SpecializationSelector = ({ selectedSpecialization, onSpecializationChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const specializations = [
    { id: 'general', name: 'General Medicine', description: 'Primary care and general practice' },
    { id: 'cardiology', name: 'Cardiology', description: 'Heart and cardiovascular system' },
    { id: 'neurology', name: 'Neurology', description: 'Brain and nervous system disorders' },
    { id: 'orthopedics', name: 'Orthopedics', description: 'Musculoskeletal system' },
    { id: 'pediatrics', name: 'Pediatrics', description: 'Medical care for infants and children' },
    { id: 'psychiatry', name: 'Psychiatry', description: 'Mental health and behavioral disorders' },
    { id: 'radiology', name: 'Radiology', description: 'Medical imaging and diagnostics' },
    { id: 'surgery', name: 'Surgery', description: 'Surgical procedures and operations' },
    { id: 'dermatology', name: 'Dermatology', description: 'Skin, hair, and nail conditions' },
    { id: 'oncology', name: 'Oncology', description: 'Cancer diagnosis and treatment' },
    { id: 'emergency', name: 'Emergency Medicine', description: 'Acute care and emergency treatment' },
    { id: 'anesthesiology', name: 'Anesthesiology', description: 'Anesthesia and pain management' },
    { id: 'pathology', name: 'Pathology', description: 'Disease diagnosis through lab analysis' },
    { id: 'nursing', name: 'Nursing', description: 'Patient care and medical support' },
    { id: 'pharmacy', name: 'Pharmacy', description: 'Medication management and dispensing' },
    { id: 'administration', name: 'Healthcare Administration', description: 'Healthcare management and operations' }
  ];

  const handleSelect = (specialization) => {
    onSpecializationChange(specialization);
    setIsOpen(false);
  };

  const selectedSpec = specializations.find(spec => spec.id === selectedSpecialization);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-text-primary mb-2">
        Medical Specialization
      </label>
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-4 py-3 bg-surface border border-border rounded-medical text-left medical-transition ${
            isOpen ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-50 rounded-medical flex items-center justify-center">
              <Icon name="Stethoscope" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <div className="font-medium text-text-primary">
                {selectedSpec ? selectedSpec.name : 'Select your specialization'}
              </div>
              {selectedSpec && (
                <div className="text-sm text-text-secondary">
                  {selectedSpec.description}
                </div>
              )}
            </div>
          </div>
          <Icon 
            name="ChevronDown" 
            size={20} 
            className={`text-text-secondary medical-transition ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-medical-card medical-shadow-floating z-50 max-h-80 overflow-y-auto">
            <div className="p-2">
              {specializations.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => handleSelect(spec.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-medical text-left medical-transition ${
                    selectedSpecialization === spec.id
                      ? 'bg-primary-50 text-primary' :'hover:bg-secondary-50 text-text-secondary'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-medical flex items-center justify-center ${
                    selectedSpecialization === spec.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary-100 text-text-muted'
                  }`}>
                    <Icon name="Stethoscope" size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{spec.name}</div>
                    <div className="text-sm opacity-75">{spec.description}</div>
                  </div>
                  {selectedSpecialization === spec.id && (
                    <Icon name="Check" size={16} color="var(--color-primary)" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecializationSelector;