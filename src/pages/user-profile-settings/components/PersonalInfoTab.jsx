import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { showSuccess, showError, showDevNotification } from '../../../utils/notifications';
import { tabContent } from '../../../utils/animations';
import { useI18n } from '../../../contexts/I18nContext';

const PersonalInfoTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useI18n();
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      firstName: 'Dr.Aigerim',
      lastName: 'Mukan',
      email: 'dr.aigerim.mukan@example.com',
      phone: '+7 747 293 06 23',
      dateOfBirth: '1990-05-15',
      gender: 'female',
      address: '123 Medical Center Dr',
      city: 'Almaty',
      state: 'Almaty',
      zipCode: '10001',
      country: 'Kazakhstan',
      medicalLicenseNumber: 'NY123456789',
      licenseState: 'NY',
      licenseExpiry: '2025-12-31',
      deaNumber: 'BJ1234567',
      npiNumber: '1234567890',
      hospitalAffiliation: 'Almaty Medical University',
      department: 'Internal Medicine',
      yearsOfExperience: '8',
      currentPosition: 'Attending Physician',
      bio: 'Experienced internal medicine physician with a passion for patient care and medical education.',
      linkedinUrl: 'https://linkedin.com/in/dr-aigerim-mukan',
      orcidId: '0000-0000-0000-0000'
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Profile updated:', data);
      showSuccess(t('profile_updated_success'));
      setIsEditing(false);
    } catch (error) {
      showError(t('profile_update_error'));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form would go here in real implementation
    showDevNotification('Form reset functionality');
  };

  return (
    <motion.div
      variants={tabContent}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="bg-surface rounded-medical-card border border-border">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">{t('personal_information')}</h2>
              <p className="text-text-secondary mt-1">
                {t('manage_basic_professional_info')}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {!isEditing && (
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  icon={<Icon name="Edit" size={16} />}
                >
                  {t('edit_profile')}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {/* Basic Information */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-text-primary mb-4 flex items-center">
              <Icon name="User" size={20} className="mr-2" />
              {t('basic_information')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t('first_name')} *
                </label>
                <input
                  {...register('firstName', { required: t('first_name_required') })}
                  type="text"
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
                {errors.firstName && (
                  <p className="text-error text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t('last_name')} *
                </label>
                <input
                  {...register('lastName', { required: t('last_name_required') })}
                  type="text"
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
                {errors.lastName && (
                  <p className="text-error text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t('email_address')} *
                </label>
                <input
                  {...register('email', { 
                    required: t('email_required'),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t('invalid_email')
                    }
                  })}
                  type="email"
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
                {errors.email && (
                  <p className="text-error text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t('phone_number')}
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t('date_of_birth')}
                </label>
                <input
                  {...register('dateOfBirth')}
                  type="date"
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t('gender')}
                </label>
                <select
                  {...register('gender')}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                >
                  <option value="">{t('select_gender')}</option>
                  <option value="male">{t('male')}</option>
                  <option value="female">{t('female')}</option>
                  <option value="other">{t('other')}</option>
                  <option value="prefer-not-to-say">{t('prefer_not_to_say')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-text-primary mb-4 flex items-center">
              <Icon name="Briefcase" size={20} className="mr-2" />
              {t('professional_information')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t('medical_license_number')} *
                </label>
                <input
                  {...register('medicalLicenseNumber', { required: t('license_number_required') })}
                  type="text"
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
                {errors.medicalLicenseNumber && (
                  <p className="text-error text-sm mt-1">{errors.medicalLicenseNumber.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t('license_state')}
                </label>
                <input
                  {...register('licenseState')}
                  type="text"
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t('license_expiry_date')}
                </label>
                <input
                  {...register('licenseExpiry')}
                  type="date"
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t('dea_number')}
                </label>
                <input
                  {...register('deaNumber')}
                  type="text"
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t('npi_number')}
                </label>
                <input
                  {...register('npiNumber')}
                  type="text"
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t('years_of_experience')}
                </label>
                <input
                  {...register('yearsOfExperience')}
                  type="number"
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t('hospital_affiliation')}
                </label>
                <input
                  {...register('hospitalAffiliation')}
                  type="text"
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t('department')}
                </label>
                <input
                  {...register('department')}
                  type="text"
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t('current_position')}
                </label>
                <input
                  {...register('currentPosition')}
                  type="text"
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Bio and Links */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-text-primary mb-4 flex items-center">
              <Icon name="FileText" size={20} className="mr-2" />
              {t('professional_bio_links')}
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {t('professional_bio')}
                </label>
                <textarea
                  {...register('bio')}
                  rows={4}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                  placeholder={t('bio_placeholder')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    {t('linkedin_url')}
                  </label>
                  <input
                    {...register('linkedinUrl')}
                    type="url"
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    {t('orcid_id')}
                  </label>
                  <input
                    {...register('orcidId')}
                    type="text"
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <motion.div
              className="flex items-center justify-end space-x-4 pt-6 border-t border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={loading}
              >
                {t('cancel')}
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                disabled={!isDirty}
              >
                {t('save_changes')}
              </Button>
            </motion.div>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default PersonalInfoTab;