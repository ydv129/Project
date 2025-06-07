import React from 'react';
import { Shield, User, LogOut } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user?: any;
  onAuthClick: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, user, onAuthClick, onLogout }) => {
  const navItems = ['Dashboard', 'Tools', 'Vault', 'Settings'];

  return (
    <nav className="sticky top-0 z-50 bg-bg-navbar border-b border-gray-700 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-accent-primary" />
          <div>
            <h1 className="text-xl font-bold text-accent-primary">MOBICURE</h1>
            <p className="text-xs text-text-muted">Your Privacy Matters</p>
          </div>
        </div>
        
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item.toLowerCase())}
              className={`nav-link ${activeTab === item.toLowerCase() ? 'text-accent-primary' : ''}`}
            >
              {item}
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border border-accent-primary"
                />
                <span className="text-text-primary hidden sm:block">{user.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="text-text-muted hover:text-accent-primary transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onAuthClick}
              className="glow-button flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;