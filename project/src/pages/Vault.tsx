import React, { useState, useEffect } from 'react';
import { Plus, Lock, FileText, Key, CreditCard, User, Eye, EyeOff, Trash2 } from 'lucide-react';

interface VaultItem {
  id: string;
  type: 'password' | 'note' | 'card' | 'identity';
  title: string;
  data: any;
  createdAt: Date;
}

const Vault: React.FC = () => {
  const [vaultItems, setVaultItems] = useState<VaultItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedType, setSelectedType] = useState<VaultItem['type']>('password');
  const [showPasswords, setShowPasswords] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    // Load vault items from localStorage
    const stored = localStorage.getItem('mobicure-vault');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setVaultItems(parsed.map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt)
        })));
      } catch (error) {
        console.error('Error loading vault items:', error);
      }
    }
  }, []);

  const saveToStorage = (items: VaultItem[]) => {
    localStorage.setItem('mobicure-vault', JSON.stringify(items));
  };

  const addVaultItem = (formData: any) => {
    const newItem: VaultItem = {
      id: Date.now().toString(),
      type: selectedType,
      title: formData.title,
      data: formData,
      createdAt: new Date()
    };

    const updatedItems = [...vaultItems, newItem];
    setVaultItems(updatedItems);
    saveToStorage(updatedItems);
    setShowAddForm(false);
  };

  const deleteVaultItem = (id: string) => {
    const updatedItems = vaultItems.filter(item => item.id !== id);
    setVaultItems(updatedItems);
    saveToStorage(updatedItems);
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getItemIcon = (type: VaultItem['type']) => {
    switch (type) {
      case 'password': return Key;
      case 'note': return FileText;
      case 'card': return CreditCard;
      case 'identity': return User;
      default: return Lock;
    }
  };

  const renderVaultItem = (item: VaultItem) => {
    const Icon = getItemIcon(item.type);
    const isPasswordVisible = showPasswords[item.id];

    return (
      <div key={item.id} className="card-glow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Icon className="w-5 h-5 text-accent-primary" />
            <h3 className="font-semibold text-text-primary">{item.title}</h3>
          </div>
          <button
            onClick={() => deleteVaultItem(item.id)}
            className="text-text-muted hover:text-risk-high transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 text-sm">
          {item.type === 'password' && (
            <>
              <div>
                <span className="text-text-muted">Username: </span>
                <span className="text-text-secondary">{item.data.username}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-text-muted">Password: </span>
                <span className="text-text-secondary font-mono">
                  {isPasswordVisible ? item.data.password : '••••••••'}
                </span>
                <button
                  onClick={() => togglePasswordVisibility(item.id)}
                  className="text-text-muted hover:text-accent-primary"
                >
                  {isPasswordVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {item.data.website && (
                <div>
                  <span className="text-text-muted">Website: </span>
                  <span className="text-text-secondary">{item.data.website}</span>
                </div>
              )}
            </>
          )}

          {item.type === 'note' && (
            <div>
              <span className="text-text-muted">Note: </span>
              <p className="text-text-secondary mt-1">{item.data.content}</p>
            </div>
          )}

          {item.type === 'card' && (
            <>
              <div>
                <span className="text-text-muted">Card Number: </span>
                <span className="text-text-secondary font-mono">••••••••••••{item.data.number?.slice(-4)}</span>
              </div>
              <div>
                <span className="text-text-muted">Expiry: </span>
                <span className="text-text-secondary">{item.data.expiry}</span>
              </div>
              <div>
                <span className="text-text-muted">Cardholder: </span>
                <span className="text-text-secondary">{item.data.name}</span>
              </div>
            </>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-700">
          <span className="text-xs text-text-muted">
            Added {item.createdAt.toLocaleDateString()}
          </span>
        </div>
      </div>
    );
  };

  const renderAddForm = () => {
    const [formData, setFormData] = useState<any>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (formData.title) {
        addVaultItem(formData);
        setFormData({});
      }
    };

    return (
      <div className="card-glow">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Add New Item</h3>
        
        <div className="flex space-x-2 mb-4">
          {(['password', 'note', 'card', 'identity'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                selectedType === type
                  ? 'bg-accent-primary text-black'
                  : 'bg-gray-700 text-text-secondary hover:bg-gray-600'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={formData.title || ''}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full p-3 bg-bg-main border border-gray-700 rounded text-text-primary"
            required
          />

          {selectedType === 'password' && (
            <>
              <input
                type="text"
                placeholder="Username/Email"
                value={formData.username || ''}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full p-3 bg-bg-main border border-gray-700 rounded text-text-primary"
              />
              <input
                type="password"
                placeholder="Password"
                value={formData.password || ''}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full p-3 bg-bg-main border border-gray-700 rounded text-text-primary"
              />
              <input
                type="url"
                placeholder="Website (optional)"
                value={formData.website || ''}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                className="w-full p-3 bg-bg-main border border-gray-700 rounded text-text-primary"
              />
            </>
          )}

          {selectedType === 'note' && (
            <textarea
              placeholder="Note content"
              value={formData.content || ''}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              className="w-full p-3 bg-bg-main border border-gray-700 rounded text-text-primary h-24"
            />
          )}

          {selectedType === 'card' && (
            <>
              <input
                type="text"
                placeholder="Card Number"
                value={formData.number || ''}
                onChange={(e) => setFormData({...formData, number: e.target.value})}
                className="w-full p-3 bg-bg-main border border-gray-700 rounded text-text-primary"
              />
              <input
                type="text"
                placeholder="MM/YY"
                value={formData.expiry || ''}
                onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                className="w-full p-3 bg-bg-main border border-gray-700 rounded text-text-primary"
              />
              <input
                type="text"
                placeholder="Cardholder Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 bg-bg-main border border-gray-700 rounded text-text-primary"
              />
            </>
          )}

          <div className="flex space-x-3">
            <button type="submit" className="glow-button flex-1">
              Add to Vault
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-gray-700 text-text-secondary rounded hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Secure Vault</h2>
          <p className="text-text-secondary">Encrypted storage for your sensitive data</p>
        </div>
        
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="glow-button flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Item</span>
        </button>
      </div>

      {showAddForm && (
        <div className="mb-8">
          {renderAddForm()}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vaultItems.map(renderVaultItem)}
      </div>

      {vaultItems.length === 0 && !showAddForm && (
        <div className="text-center py-12">
          <Lock className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary mb-4">Your vault is empty</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="glow-button"
          >
            Add Your First Item
          </button>
        </div>
      )}
    </div>
  );
};

export default Vault;