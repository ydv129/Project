import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  trend = 'neutral',
  description 
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-risk-low';
      case 'down': return 'text-risk-high';
      default: return 'text-accent-primary';
    }
  };

  return (
    <div className="card-glow">
      <div className="flex items-center justify-between mb-3">
        <Icon className="w-8 h-8 text-accent-primary" />
        <span className={`text-2xl font-bold ${getTrendColor()}`}>
          {value.toLocaleString()}
        </span>
      </div>
      
      <h3 className="text-text-primary font-semibold mb-1">{title}</h3>
      {description && (
        <p className="text-text-muted text-sm">{description}</p>
      )}
      
      <div className="mt-3 h-1 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-accent-primary rounded-full transition-all duration-1000"
          style={{ width: `${Math.min((value / 100) * 100, 100)}%` }}
        />
      </div>
    </div>
  );
};

export default StatCard;