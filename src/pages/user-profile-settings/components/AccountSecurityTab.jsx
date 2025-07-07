import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { showSuccess, showError, showDevNotification } from '../../../utils/notifications';
import { tabContent } from '../../../utils/animations';

const AccountSecurityTab = () => {
  const [loading, setLoading] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessions, setSessions] = useState([
    {
      id: 1,
      device: 'MacBook Pro',
      browser: 'Chrome', 
      location: 'New York, NY',
      ipAddress: '192.168.1.100',
      lastActivity: '2024-01-15 14:30:00',
      current: true
    },
    {
      id: 2,
      device: 'iPhone',
      browser: 'Safari',
      location: 'New York, NY', 
      ipAddress: '192.168.1.101',
      lastActivity: '2024-01-15 12:15:00',
      current: false
    }
  ]);

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const watchPassword = watch('newPassword');

  const onSubmitPasswordChange = async (data) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (data.newPassword !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      console.log('Password changed successfully');
      showSuccess('Password updated successfully!');
      reset();
    } catch (error) {
      showError(error.message || 'Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTwoFactor = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTwoFactorEnabled(!twoFactorEnabled);
      showSuccess(`Two-factor authentication ${!twoFactorEnabled ? 'enabled' : 'disabled'} successfully!`);
    } catch (error) {
      showError('Failed to update two-factor authentication settings.');
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeSession = (sessionId) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId));
    showSuccess('Session revoked successfully!');
  };

  const handleRevokeAllSessions = () => {
    setSessions(prev => prev.filter(session => session.current));
    showSuccess('All other sessions revoked successfully!');
  };

  const handleDownloadData = () => {
    showDevNotification('Data export functionality');
  };

  const handleDeleteAccount = () => {
    showDevNotification('Account deletion functionality');
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: 'No password' };
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/[a-z]/)) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 1;
    
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return { strength, label: labels[strength] };
  };

  const passwordStrength = getPasswordStrength(watchPassword);

  return (
    <motion.div
      variants={tabContent}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="space-y-6">
        {/* Password Change */}
        <div className="bg-surface rounded-medical-card border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-text-primary flex items-center">
              <Icon name="Lock" size={20} className="mr-2" />
              Password & Authentication
            </h2>
            <p className="text-text-secondary mt-1">
              Manage your account password and security settings
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmitPasswordChange)} className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Current Password *
                </label>
                <input
                  {...register('currentPassword', { required: 'Current password is required' })}
                  type="password"
                  className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {errors.currentPassword && (
                  <p className="text-error text-sm mt-1">{errors.currentPassword.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  New Password *
                </label>
                <input
                  {...register('newPassword', { 
                    required: 'New password is required',
                    minLength: { value: 8, message: 'Password must be at least 8 characters' }
                  })}
                  type="password"
                  className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {errors.newPassword && (
                  <p className="text-error text-sm mt-1">{errors.newPassword.message}</p>
                )}
                
                {/* Password Strength Indicator */}
                {watchPassword && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            passwordStrength.strength <= 1 ? 'bg-red-500' :
                            passwordStrength.strength <= 2 ? 'bg-yellow-500' :
                            passwordStrength.strength <= 3 ? 'bg-blue-500': 'bg-green-500'
                          }`}
                          style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-text-muted">{passwordStrength.label}</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Confirm New Password *
                </label>
                <input
                  {...register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: (value) => value === watchPassword || 'Passwords do not match'
                  })}
                  type="password"
                  className="w-full px-3 py-2 border border-border rounded-medical focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {errors.confirmPassword && (
                  <p className="text-error text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="flex items-center justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                >
                  Update Password
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-surface rounded-medical-card border border-border">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-medium text-text-primary flex items-center">
              <Icon name="Shield" size={20} className="mr-2" />
              Two-Factor Authentication
            </h3>
            <p className="text-text-secondary mt-1">
              Add an extra layer of security to your account
            </p>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-medical flex items-center justify-center ${
                  twoFactorEnabled ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <Icon
                    name={twoFactorEnabled ? "CheckCircle" : "AlertCircle"}
                    size={24}
                    color={twoFactorEnabled ? "var(--color-success)" : "var(--color-text-muted)"}
                  />
                </div>
                <div>
                  <h4 className="font-medium text-text-primary">
                    {twoFactorEnabled ? 'Two-Factor Authentication Enabled' : 'Two-Factor Authentication Disabled'}
                  </h4>
                  <p className="text-sm text-text-secondary">
                    {twoFactorEnabled 
                      ? 'Your account is protected with 2FA' :'Enable 2FA to secure your account'
                    }
                  </p>
                </div>
              </div>
              <Button
                variant={twoFactorEnabled ? "outline" : "primary"}
                onClick={handleToggleTwoFactor}
                loading={loading}
              >
                {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
              </Button>
            </div>

            {twoFactorEnabled && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-medical">
                <div className="flex items-center space-x-2">
                  <Icon name="Smartphone" size={16} color="var(--color-success)" />
                  <span className="text-sm font-medium text-green-800">
                    Authentication app configured
                  </span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Your account is secured with Google Authenticator
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-surface rounded-medical-card border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-text-primary flex items-center">
                  <Icon name="Monitor" size={20} className="mr-2" />
                  Active Sessions
                </h3>
                <p className="text-text-secondary mt-1">
                  Manage devices that are currently logged into your account
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleRevokeAllSessions}
                disabled={sessions.length <= 1}
              >
                Revoke All Other Sessions
              </Button>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {sessions.map(session => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 border border-border rounded-medical"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-secondary-50 rounded-medical flex items-center justify-center">
                      <Icon
                        name={session.device.includes('iPhone') ? 'Smartphone' : 'Monitor'}
                        size={20}
                        color="var(--color-text-muted)"
                      />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-text-primary">
                          {session.device} • {session.browser}
                        </h4>
                        {session.current && (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-text-muted">
                        {session.location} • {session.ipAddress}
                      </div>
                      <div className="text-sm text-text-muted">
                        Last active: {new Date(session.lastActivity).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {!session.current && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRevokeSession(session.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Revoke
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-surface rounded-medical-card border border-border">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-medium text-text-primary flex items-center">
              <Icon name="Settings" size={20} className="mr-2" />
              Account Actions
            </h3>
            <p className="text-text-secondary mt-1">
              Export your data or delete your account
            </p>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-medical">
              <div>
                <h4 className="font-medium text-text-primary">Export Account Data</h4>
                <p className="text-sm text-text-secondary">
                  Download a copy of your account data and activity
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleDownloadData}
              >
                <Icon name="Download" size={16} className="mr-2" />
                Export Data
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border border-red-200 rounded-medical bg-red-50">
              <div>
                <h4 className="font-medium text-red-800">Delete Account</h4>
                <p className="text-sm text-red-700">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <Button
                variant="danger"
                onClick={handleDeleteAccount}
              >
                <Icon name="Trash2" size={16} className="mr-2" />
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AccountSecurityTab;