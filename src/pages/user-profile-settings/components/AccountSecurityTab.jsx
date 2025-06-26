import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountSecurityTab = () => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [backupCodes, setBackupCodes] = useState([]);
  const [loginSessions] = useState([
    {
      id: 1,
      device: 'MacBook Pro - Chrome',
      location: 'New York, NY',
      ipAddress: '192.168.1.100',
      lastActive: '2024-01-15 14:30',
      isCurrent: true
    },
    {
      id: 2,
      device: 'iPhone 15 - Safari',
      location: 'New York, NY',
      ipAddress: '192.168.1.101',
      lastActive: '2024-01-15 09:15',
      isCurrent: false
    },
    {
      id: 3,
      device: 'iPad Air - Safari',
      location: 'Boston, MA',
      ipAddress: '10.0.0.45',
      lastActive: '2024-01-14 18:45',
      isCurrent: false
    }
  ]);

  const [securitySettings, setSecuritySettings] = useState({
    emailNotifications: true,
    loginAlerts: true,
    suspiciousActivityAlerts: true,
    passwordExpiry: false,
    sessionTimeout: '30'
  });

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordSubmit = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Password change submitted');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleTwoFactorToggle = () => {
    if (!twoFactorEnabled) {
      setShowQRCode(true);
      generateBackupCodes();
    } else {
      setTwoFactorEnabled(false);
      setShowQRCode(false);
      setBackupCodes([]);
    }
  };

  const generateBackupCodes = () => {
    const codes = Array.from({ length: 8 }, () => 
      Math.random().toString(36).substring(2, 8).toUpperCase()
    );
    setBackupCodes(codes);
  };

  const handleSessionTerminate = (sessionId) => {
    console.log('Terminating session:', sessionId);
  };

  const handleSecuritySettingChange = (setting, value) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 25, label: 'Weak', color: 'text-error' };
    if (password.length < 8) return { strength: 50, label: 'Fair', color: 'text-warning' };
    if (password.length < 12) return { strength: 75, label: 'Good', color: 'text-primary' };
    return { strength: 100, label: 'Strong', color: 'text-success' };
  };

  const passwordStrength = getPasswordStrength(passwordForm.newPassword);

  return (
    <div className="space-y-6">
      {/* Password Management */}
      <div className="bg-surface rounded-medical-card border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-primary-50 rounded-medical flex items-center justify-center">
            <Icon name="Lock" size={16} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Password Management</h3>
            <p className="text-sm text-text-secondary">Update your account password</p>
          </div>
        </div>

        <div className="max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Current Password
            </label>
            <Input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              New Password
            </label>
            <Input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
              placeholder="Enter new password"
            />
            {passwordForm.newPassword && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-text-secondary">Password Strength</span>
                  <span className={passwordStrength.color}>{passwordStrength.label}</span>
                </div>
                <div className="w-full bg-secondary-100 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full medical-transition ${
                      passwordStrength.strength <= 25 ? 'bg-error' :
                      passwordStrength.strength <= 50 ? 'bg-warning' :
                      passwordStrength.strength <= 75 ? 'bg-primary' : 'bg-success'
                    }`}
                    style={{ width: `${passwordStrength.strength}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Confirm New Password
            </label>
            <Input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
              placeholder="Confirm new password"
            />
          </div>

          <Button
            variant="primary"
            onClick={handlePasswordSubmit}
            disabled={!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
          >
            Update Password
          </Button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-surface rounded-medical-card border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-success-50 rounded-medical flex items-center justify-center">
              <Icon name="Shield" size={16} color="var(--color-success)" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Two-Factor Authentication</h3>
              <p className="text-sm text-text-secondary">
                Add an extra layer of security to your account
              </p>
            </div>
          </div>
          <Button
            variant={twoFactorEnabled ? "danger" : "success"}
            onClick={handleTwoFactorToggle}
          >
            {twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
          </Button>
        </div>

        {showQRCode && !twoFactorEnabled && (
          <div className="bg-secondary-50 rounded-medical p-6 mb-6">
            <div className="text-center">
              <div className="w-48 h-48 bg-white border-2 border-border rounded-medical mx-auto mb-4 flex items-center justify-center">
                <div className="text-center">
                  <Icon name="QrCode" size={64} color="var(--color-text-muted)" />
                  <p className="text-sm text-text-muted mt-2">QR Code</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Scan this QR code with your authenticator app
              </p>
              <div className="flex justify-center space-x-2">
                <Button
                  variant="primary"
                  onClick={() => {
                    setTwoFactorEnabled(true);
                    setShowQRCode(false);
                  }}
                >
                  I've Added the Account
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowQRCode(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {twoFactorEnabled && (
          <div className="bg-success-50 rounded-medical p-4 border border-success-200">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} color="var(--color-success)" />
              <span className="text-sm font-medium text-success">
                Two-factor authentication is enabled
              </span>
            </div>
          </div>
        )}

        {backupCodes.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium text-text-primary mb-3">Backup Codes</h4>
            <div className="bg-warning-50 rounded-medical p-4 border border-warning-200 mb-4">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="mt-0.5" />
                <div className="text-sm text-warning">
                  <p className="font-medium">Save these backup codes</p>
                  <p>Use these codes to access your account if you lose your authenticator device.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {backupCodes.map((code, index) => (
                <div
                  key={index}
                  className="bg-surface border border-border rounded-medical p-2 text-center font-mono text-sm"
                >
                  {code}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <Button variant="outline" iconName="Download">
                Download Codes
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Active Sessions */}
      <div className="bg-surface rounded-medical-card border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-accent-50 rounded-medical flex items-center justify-center">
            <Icon name="Monitor" size={16} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Active Sessions</h3>
            <p className="text-sm text-text-secondary">
              Manage devices that are currently signed in to your account
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {loginSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 border border-border rounded-medical hover:bg-secondary-50 medical-transition"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-secondary-100 rounded-medical flex items-center justify-center">
                  <Icon 
                    name={session.device.includes('iPhone') ? 'Smartphone' : 
                          session.device.includes('iPad') ? 'Tablet' : 'Monitor'} 
                    size={18} 
                    color="var(--color-secondary)" 
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-text-primary">{session.device}</span>
                    {session.isCurrent && (
                      <span className="px-2 py-1 bg-success-50 text-success text-xs rounded-full border border-success-200">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {session.location} • {session.ipAddress}
                  </div>
                  <div className="text-xs text-text-muted">
                    Last active: {session.lastActive}
                  </div>
                </div>
              </div>
              
              {!session.isCurrent && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSessionTerminate(session.id)}
                >
                  Terminate
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <Button variant="danger" iconName="LogOut">
            Sign Out All Other Sessions
          </Button>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-surface rounded-medical-card border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-warning-50 rounded-medical flex items-center justify-center">
            <Icon name="Settings" size={16} color="var(--color-warning)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Security Settings</h3>
            <p className="text-sm text-text-secondary">Configure additional security options</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-text-primary">Notifications</h4>
              
              <label className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-text-primary">Email Security Alerts</div>
                  <div className="text-xs text-text-muted">Get notified of security events</div>
                </div>
                <input
                  type="checkbox"
                  checked={securitySettings.emailNotifications}
                  onChange={(e) => handleSecuritySettingChange('emailNotifications', e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </label>

              <label className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-text-primary">Login Alerts</div>
                  <div className="text-xs text-text-muted">Alert on new device logins</div>
                </div>
                <input
                  type="checkbox"
                  checked={securitySettings.loginAlerts}
                  onChange={(e) => handleSecuritySettingChange('loginAlerts', e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </label>

              <label className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-text-primary">Suspicious Activity</div>
                  <div className="text-xs text-text-muted">Alert on unusual account activity</div>
                </div>
                <input
                  type="checkbox"
                  checked={securitySettings.suspiciousActivityAlerts}
                  onChange={(e) => handleSecuritySettingChange('suspiciousActivityAlerts', e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </label>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-text-primary">Account Security</h4>
              
              <label className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-text-primary">Password Expiry</div>
                  <div className="text-xs text-text-muted">Require password change every 90 days</div>
                </div>
                <input
                  type="checkbox"
                  checked={securitySettings.passwordExpiry}
                  onChange={(e) => handleSecuritySettingChange('passwordExpiry', e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </label>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Session Timeout (minutes)
                </label>
                <select
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => handleSecuritySettingChange('sessionTimeout', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-medical focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                  <option value="never">Never</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Button variant="primary" iconName="Save">
              Save Security Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSecurityTab;