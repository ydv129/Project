import React, { useState } from 'react';
import { X, User, Lock, Mail, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuth: (user: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Simulate authentication
    const user = {
      id: Date.now().toString(),
      email: formData.email,
      name: formData.name || formData.email.split('@')[0],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`
    };

    localStorage.setItem('mobicure-user', JSON.stringify(user));
    onAuth(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-bg-card border border-gray-700 rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-accent-primary"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="bg-accent-primary/20 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Lock className="w-8 h-8 text-accent-primary" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-text-secondary">
            {isLogin ? 'Sign in to your privacy dashboard' : 'Join Mobicure for enhanced privacy'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-bg-main border border-gray-700 rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:outline-none"
                required={!isLogin}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full pl-10 pr-4 py-3 bg-bg-main border border-gray-700 rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:outline-none"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full pl-10 pr-12 py-3 bg-bg-main border border-gray-700 rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-accent-primary"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {!isLogin && (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-bg-main border border-gray-700 rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:outline-none"
                required={!isLogin}
              />
            </div>
          )}

          <button type="submit" className="glow-button w-full">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-text-muted">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-accent-primary hover:underline ml-1"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;