import React from 'react';
import { AlertTriangle, Shield, AlertCircle } from 'lucide-react';

interface RiskMeterProps {
  riskLevel: number; // 0-100
}

const RiskMeter: React.FC<RiskMeterProps> = ({ riskLevel }) => {
  const getRiskColor = () => {
    if (riskLevel <= 30) return 'text-risk-low';
    if (riskLevel <= 70) return 'text-risk-medium';
    return 'text-risk-high';
  };

  const getRiskLabel = () => {
    if (riskLevel <= 30) return 'Low Risk';
    if (riskLevel <= 70) return 'Medium Risk';
    return 'High Risk';
  };

  const getRiskIcon = () => {
    if (riskLevel <= 30) return Shield;
    if (riskLevel <= 70) return AlertCircle;
    return AlertTriangle;
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (riskLevel / 100) * circumference;

  const Icon = getRiskIcon();

  return (
    <div className="card-glow text-center">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Privacy Risk Level</h3>
      
      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-700"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-1000 ${getRiskColor()}`}
            strokeLinecap="round"
          />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Icon className={`w-6 h-6 mx-auto mb-1 ${getRiskColor()}`} />
            <span className={`text-xl font-bold ${getRiskColor()}`}>
              {riskLevel}%
            </span>
          </div>
        </div>
      </div>
      
      <p className={`font-semibold mb-3 ${getRiskColor()}`}>
        {getRiskLabel()}
      </p>
      
      <div className="space-y-2 text-left">
        <p className="text-text-secondary text-sm">Quick Actions:</p>
        <button className="glow-button w-full text-sm">
          Add Items to Vault
        </button>
        <button className="glow-button w-full text-sm">
          Check App Permissions
        </button>
      </div>
    </div>
  );
};

export default RiskMeter;