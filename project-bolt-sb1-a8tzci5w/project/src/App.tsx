import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import Dashboard from './pages/Dashboard';
import Tools from './pages/Tools';
import Vault from './pages/Vault';
import Settings from './pages/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Check for existing user session
    const storedUser = localStorage.getItem('mobicure-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error loading user session:', error);
      }
    }
  }, []);

  const handleAuth = (userData: any) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('mobicure-user');
    setUser(null);
    setActiveTab('dashboard');
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'tools':
        return <Tools />;
      case 'vault':
        return <Vault />;
      case 'settings':
        return <Settings user={user} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-main">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        user={user}
        onAuthClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      />
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuth}
      />
      
      <main className="pt-4">
        {renderActiveTab()}
      </main>
    </div>
  );
}

export default App;