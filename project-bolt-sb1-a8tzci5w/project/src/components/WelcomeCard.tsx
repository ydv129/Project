import React from 'react';
import { User, Calendar, Shield } from 'lucide-react';

interface WelcomeCardProps {
  user?: any;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ user }) => {
  const currentTime = new Date().toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-gradient-to-r from-bg-card to-bg-navbar rounded-xl p-6 mb-8 border border-gray-700 hover:border-accent-primary transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-accent-primary/20 p-3 rounded-full">
            {user ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-6 h-6 rounded-full"
              />
            ) : (
              <User className="w-6 h-6 text-accent-primary" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary">
              Welcome back{user ? `, ${user.name}` : ''}!
            </h2>
            <p className="text-text-secondary mt-1">
              {user ? 'Your privacy dashboard is secure and ready' : 'Sign in to access your personalized privacy dashboard'}
            </p>
          </div>
        </div>
        
        <div className="text-right hidden sm:block">
          <div className="flex items-center space-x-2 text-text-muted">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{currentDate}</span>
          </div>
          <p className="text-accent-primary font-mono text-lg mt-1">{currentTime}</p>
        </div>
      </div>
      
      {user && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-risk-low" />
              <span className="text-text-muted">Account Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-risk-low rounded-full"></div>
              <span className="text-text-muted">All systems operational</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeCard;