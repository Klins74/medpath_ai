import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PersonalInfoTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Dr. Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@medpath.ai',
    phone: '+1 (555) 123-4567',
    currentPosition: 'Senior Cardiologist',
    institution: 'Metropolitan Medical Center',
    yearsOfExperience: '12',
    medicalLicense: 'MD-2011-4567',
    specializations: ['Cardiology', 'Internal Medicine'],
    careerObjectives: 'Seeking leadership opportunities in cardiovascular research and patient care innovation.'
  });

  const [tempData, setTempData] = useState(formData);

  const specializations = [
    'Cardiology', 'Internal Medicine', 'Pediatrics', 'Surgery', 'Neurology',
    'Oncology', 'Radiology', 'Emergency Medicine', 'Anesthesiology', 'Psychiatry'
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(formData);
  };

  const handleSave = () => {
    setFormData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(formData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpecializationToggle = (specialization) => {
    setTempData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(specialization)
        ? prev.specializations.filter(s => s !== specialization)
        : [...prev.specializations, specialization]
    }));
  };

  return (
    <div className="bg-surface rounded-medical-card border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Personal Information</h3>
          <p className="text-sm text-text-secondary mt-1">
            Manage your professional profile and contact details
          </p>
        </div>
        {!isEditing ? (
          <Button
            variant="outline"
            iconName="Edit"
            iconPosition="left"
            onClick={handleEdit}
          >
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              iconName="Save"
              iconPosition="left"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h4 className="font-medium text-text-primary border-b border-border pb-2">
            Basic Information
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                First Name
              </label>
              {isEditing ? (
                <Input
                  type="text"
                  value={tempData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter first name"
                />
              ) : (
                <p className="text-text-secondary bg-secondary-50 px-3 py-2 rounded-medical">
                  {formData.firstName}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Last Name
              </label>
              {isEditing ? (
                <Input
                  type="text"
                  value={tempData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter last name"
                />
              ) : (
                <p className="text-text-secondary bg-secondary-50 px-3 py-2 rounded-medical">
                  {formData.lastName}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email Address
            </label>
            {isEditing ? (
              <Input
                type="email"
                value={tempData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter email address"
              />
            ) : (
              <p className="text-text-secondary bg-secondary-50 px-3 py-2 rounded-medical">
                {formData.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Phone Number
            </label>
            {isEditing ? (
              <Input
                type="tel"
                value={tempData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter phone number"
              />
            ) : (
              <p className="text-text-secondary bg-secondary-50 px-3 py-2 rounded-medical">
                {formData.phone}
              </p>
            )}
          </div>
        </div>

        {/* Professional Information */}
        <div className="space-y-4">
          <h4 className="font-medium text-text-primary border-b border-border pb-2">
            Professional Information
          </h4>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Current Position
            </label>
            {isEditing ? (
              <Input
                type="text"
                value={tempData.currentPosition}
                onChange={(e) => handleInputChange('currentPosition', e.target.value)}
                placeholder="Enter current position"
              />
            ) : (
              <p className="text-text-secondary bg-secondary-50 px-3 py-2 rounded-medical">
                {formData.currentPosition}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Institution
            </label>
            {isEditing ? (
              <Input
                type="text"
                value={tempData.institution}
                onChange={(e) => handleInputChange('institution', e.target.value)}
                placeholder="Enter institution name"
              />
            ) : (
              <p className="text-text-secondary bg-secondary-50 px-3 py-2 rounded-medical">
                {formData.institution}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Years of Experience
              </label>
              {isEditing ? (
                <Input
                  type="number"
                  value={tempData.yearsOfExperience}
                  onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                  placeholder="Years"
                />
              ) : (
                <p className="text-text-secondary bg-secondary-50 px-3 py-2 rounded-medical">
                  {formData.yearsOfExperience} years
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Medical License
              </label>
              {isEditing ? (
                <Input
                  type="text"
                  value={tempData.medicalLicense}
                  onChange={(e) => handleInputChange('medicalLicense', e.target.value)}
                  placeholder="License number"
                />
              ) : (
                <p className="text-text-secondary bg-secondary-50 px-3 py-2 rounded-medical">
                  {formData.medicalLicense}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Specializations */}
      <div className="mt-6">
        <h4 className="font-medium text-text-primary border-b border-border pb-2 mb-4">
          Medical Specializations
        </h4>
        
        {isEditing ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {specializations.map((specialization) => (
              <label
                key={specialization}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={tempData.specializations.includes(specialization)}
                  onChange={() => handleSpecializationToggle(specialization)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">{specialization}</span>
              </label>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {formData.specializations.map((specialization) => (
              <span
                key={specialization}
                className="px-3 py-1 bg-primary-50 text-primary text-sm rounded-full border border-primary-200"
              >
                {specialization}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Career Objectives */}
      <div className="mt-6">
        <h4 className="font-medium text-text-primary border-b border-border pb-2 mb-4">
          Career Objectives
        </h4>
        
        {isEditing ? (
          <textarea
            value={tempData.careerObjectives}
            onChange={(e) => handleInputChange('careerObjectives', e.target.value)}
            placeholder="Describe your career goals and objectives..."
            className="w-full px-3 py-2 border border-border rounded-medical focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows={4}
          />
        ) : (
          <p className="text-text-secondary bg-secondary-50 px-4 py-3 rounded-medical leading-relaxed">
            {formData.careerObjectives}
          </p>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoTab;