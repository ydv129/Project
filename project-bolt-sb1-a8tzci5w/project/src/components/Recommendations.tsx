import React from 'react';
import { Shield, Key, Lock, Eye, AlertTriangle, Database, DivideIcon as LucideIcon } from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  priority: 'high' | 'medium' | 'low';
  action: string;
}

const Recommendations: React.FC = () => {
  const recommendations: Recommendation[] = [
    {
      id: '1',
      title: 'Enable 2FA',
      description: 'Add two-factor authentication to your accounts',
      icon: Shield,
      priority: 'high',
      action: 'Setup Now'
    },
    {
      id: '2',
      title: 'Update Passwords',
      description: 'Some passwords are weak or compromised',
      icon: Key,
      priority: 'high',
      action: 'Generate New'
    },
    {
      id: '3',
      title: 'Review App Permissions',
      description: '12 apps have excessive permissions',
      icon: Eye,
      priority: 'medium',
      action: 'Review'
    },
    {
      id: '4',
      title: 'Encrypt Data',
      description: 'Add sensitive files to secure vault',
      icon: Lock,
      priority: 'medium',
      action: 'Add Files'
    },
    {
      id: '5',
      title: 'Check Breaches',
      description: 'Scan for data breaches affecting you',
      icon: AlertTriangle,
      priority: 'low',
      action: 'Scan Now'
    },
    {
      id: '6',
      title: 'Backup Data',
      description: 'Create encrypted backup of vault',
      icon: Database,
      priority: 'low',
      action: 'Backup'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-risk-high bg-risk-high/10';
      case 'medium': return 'border-risk-medium bg-risk-medium/10';
      default: return 'border-risk-low bg-risk-low/10';
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-text-primary mb-4">Privacy Recommendations</h3>
      
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {recommendations.map((rec) => {
          const Icon = rec.icon;
          return (
            <div
              key={rec.id}
              className={`flex-none w-64 p-4 rounded-lg border ${getPriorityColor(rec.priority)} 
                hover:scale-105 transition-transform duration-300 cursor-pointer`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <Icon className="w-5 h-5 text-accent-primary" />
                <h4 className="font-semibold text-text-primary">{rec.title}</h4>
              </div>
              
              <p className="text-text-secondary text-sm mb-3">
                {rec.description}
              </p>
              
              <button className="glow-button w-full text-sm">
                {rec.action}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recommendations;