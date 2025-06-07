import React, { useState } from 'react';
import { 
  Shield, 
  Bell, 
  Moon, 
  Sun, 
  Download, 
  Upload, 
  Trash2, 
  User,
  Lock,
  Database
} from 'lucide-react';

interface SettingsProps {
  user?: any;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    autoBackup: true,
    biometricLock: false,
    dataRetention: '1year',
    riskAlerts: true
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    // Save to localStorage
    localStorage.setItem('mobicure-settings', JSON.stringify({
      ...settings,
      [key]: value
    }));
  };

  const exportData = () => {
    const vaultData = localStorage.getItem('mobicure-vault');
    const settingsData = localStorage.getItem('mobicure-settings');
    const userData = localStorage.getItem('mobicure-user');
    
    const exportObj = {
      vault: vaultData ? JSON.parse(vaultData) : [],
      settings: settingsData ? JSON.parse(settingsData) : settings,
      user: userData ? JSON.parse(userData) : null,
      exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(exportObj, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'mobicure-backup.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.removeItem('mobicure-vault');
      localStorage.removeItem('mobicure-settings');
      localStorage.removeItem('mobicure-user');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Settings</h2>
        <p className="text-text-secondary">Customize your privacy dashboard experience</p>
      </div>

      <div className="space-y-6">
        {/* Privacy & Security */}
        <div className="card-glow">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-6 h-6 text-accent-primary" />
            <h3 className="text-lg font-semibold text-text-primary">Privacy & Security</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-primary">Biometric Lock</p>
                <p className="text-text-muted text-sm">Use fingerprint/face ID to unlock vault</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.biometricLock}
                  onChange={(e) => updateSetting('biometricLock', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-primary">Risk Alerts</p>
                <p className="text-text-muted text-sm">Get notified about security risks</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.riskAlerts}
                  onChange={(e) => updateSetting('riskAlerts', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-primary"></div>
              </label>
            </div>

            <div>
              <p className="text-text-primary mb-2">Data Retention Period</p>
              <select
                value={settings.dataRetention}
                onChange={(e) => updateSetting('dataRetention', e.target.value)}
                className="bg-bg-main border border-gray-700 rounded p-2 text-text-primary"
              >
                <option value="6months">6 Months</option>
                <option value="1year">1 Year</option>
                <option value="2years">2 Years</option>
                <option value="forever">Forever</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card-glow">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="w-6 h-6 text-accent-primary" />
            <h3 className="text-lg font-semibold text-text-primary">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-primary">Push Notifications</p>
                <p className="text-text-muted text-sm">Receive security alerts and updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => updateSetting('notifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-primary">Auto Backup</p>
                <p className="text-text-muted text-sm">Automatically backup vault data</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoBackup}
                  onChange={(e) => updateSetting('autoBackup', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-primary"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="card-glow">
          <div className="flex items-center space-x-3 mb-4">
            <Database className="w-6 h-6 text-accent-primary" />
            <h3 className="text-lg font-semibold text-text-primary">Data Management</h3>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={exportData}
              className="glow-button w-full flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export All Data</span>
            </button>

            <div className="border-t border-gray-700 pt-4">
              <h4 className="text-text-primary font-semibold mb-2">Danger Zone</h4>
              <button
                onClick={clearAllData}
                className="bg-risk-high hover:bg-risk-high/80 text-white px-4 py-2 rounded-md 
                  transition-colors duration-300 flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All Data</span>
              </button>
              <p className="text-text-muted text-sm mt-2">
                This will permanently delete all vault items and settings
              </p>
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="card-glow">
          <div className="flex items-center space-x-3 mb-4">
            <User className="w-6 h-6 text-accent-primary" />
            <h3 className="text-lg font-semibold text-text-primary">Account Information</h3>
          </div>
          
          <div className="space-y-3">
            {user ? (
              <>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Email</span>
                  <span className="text-text-primary">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Name</span>
                  <span className="text-text-primary">{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Account Created</span>
                  <span className="text-text-muted">Today</span>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-text-muted">Sign in to view account information</p>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-text-secondary">Version</span>
              <span className="text-accent-primary">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Vault Items</span>
              <span className="text-text-muted">
                {JSON.parse(localStorage.getItem('mobicure-vault') || '[]').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Data Usage</span>
              <span className="text-text-muted">
                {Math.round((JSON.stringify(localStorage).length / 1024) * 100) / 100} KB
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;