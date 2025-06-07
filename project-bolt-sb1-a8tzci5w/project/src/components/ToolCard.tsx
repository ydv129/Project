import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  category?: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  onClick,
  category 
}) => {
  return (
    <div 
      className="card-glow cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-center space-x-3 mb-3">
        <div className="bg-accent-primary/20 p-2 rounded-lg group-hover:bg-accent-primary/30 transition-colors">
          <Icon className="w-6 h-6 text-accent-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-text-primary group-hover:text-accent-primary transition-colors">
            {title}
          </h3>
          {category && (
            <span className="text-xs text-text-muted bg-gray-700 px-2 py-1 rounded">
              {category}
            </span>
          )}
        </div>
      </div>
      
      <p className="text-text-secondary text-sm mb-4">
        {description}
      </p>
      
      <button className="glow-button w-full text-sm">
        Launch Tool
      </button>
    </div>
  );
};

export default ToolCard;