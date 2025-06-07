import React, { useState, useEffect } from 'react';
import { Smartphone, AlertTriangle, Vault, Activity } from 'lucide-react';
import WelcomeCard from '../components/WelcomeCard';
import StatCard from '../components/StatCard';
import RiskMeter from '../components/RiskMeter';
import Recommendations from '../components/Recommendations';

interface DashboardProps {
  user?: any;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [stats, setStats] = useState({
    trackedApps: 45,
    breachesAffected: 3,
    vaultItems: 28,
    riskLevel: 65
  });

  useEffect(() => {
    // Load user-specific data if authenticated
    if (user) {
      const vaultData = localStorage.getItem('mobicure-vault');
      const vaultItems = vaultData ? JSON.parse(vaultData).length : 0;
      
      setStats(prev => ({
        ...prev,
        vaultItems,
        riskLevel: Math.max(20, prev.riskLevel - (vaultItems * 2)) // Lower risk with more vault items
      }));
    }

    // Simulate loading data
    const timer = setTimeout(() => {
      setStats(prev => ({
        trackedApps: Math.floor(Math.random() * 60) + 20,
        breachesAffected: Math.floor(Math.random() * 8) + 1,
        vaultItems: prev.vaultItems,
        riskLevel: user ? prev.riskLevel : Math.floor(Math.random() * 100)
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <WelcomeCard user={user} />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatCard
              title="Tracked Apps"
              value={stats.trackedApps}
              icon={Smartphone}
              trend="neutral"
              description="Apps with monitored permissions"
            />
            <StatCard
              title="Affected by Breaches"
              value={stats.breachesAffected}
              icon={AlertTriangle}
              trend="down"
              description="Known data breaches"
            />
            <StatCard
              title="Vault Items"
              value={stats.vaultItems}
              icon={Vault}
              trend="up"
              description="Secured items in vault"
            />
          </div>
        </div>
        
        <div>
          <RiskMeter riskLevel={stats.riskLevel} />
        </div>
      </div>
      
      <Recommendations />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="card-glow">
          <div className="flex items-center space-x-3 mb-3">
            <Activity className="w-6 h-6 text-accent-primary" />
            <h3 className="font-semibold text-text-primary">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {user ? (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Account created</span>
                  <span className="text-text-muted">Today</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Privacy scan initiated</span>
                  <span className="text-text-muted">1h ago</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Dashboard accessed</span>
                  <span className="text-text-muted">Now</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Demo mode active</span>
                  <span className="text-text-muted">Now</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Sample data loaded</span>
                  <span className="text-text-muted">1m ago</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Privacy tools available</span>
                  <span className="text-text-muted">Ready</span>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="card-glow">
          <h3 className="font-semibold text-text-primary mb-3">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-text-secondary">Active Scans</span>
              <span className="text-accent-primary">{user ? '4' : '0'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Secure Connections</span>
              <span className="text-risk-low">12/12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Last Backup</span>
              <span className="text-text-muted">{user ? 'Today' : 'Never'}</span>
            </div>
          </div>
        </div>
        
        <div className="card-glow">
          <h3 className="font-semibold text-text-primary mb-3">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-risk-low rounded-full"></div>
              <span className="text-text-secondary text-sm">All systems operational</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-risk-low rounded-full"></div>
              <span className="text-text-secondary text-sm">Vault encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-risk-low rounded-full"></div>
              <span className="text-text-secondary text-sm">Privacy shield active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;