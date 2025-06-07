import React, { useState } from 'react';
import { 
  Smartphone, 
  Shield, 
  Vault, 
  UserPlus, 
  BarChart3, 
  Key, 
  Eye, 
  Code, 
  Mail, 
  QrCode,
  Search,
  AlertTriangle,
  Copy,
  RefreshCw,
  Check,
  X
} from 'lucide-react';
import ToolCard from '../components/ToolCard';

const Tools: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [toolResults, setToolResults] = useState<any>({});

  const tools = [
    {
      id: 'app-tracker',
      title: 'App Permission Tracker',
      description: 'Monitor and analyze app permissions on your devices',
      icon: Smartphone,
      category: 'Privacy'
    },
    {
      id: 'breach-checker',
      title: 'Data Breach Checker',
      description: 'Check if your data has been compromised in breaches',
      icon: AlertTriangle,
      category: 'Security'
    },
    {
      id: 'password-strength',
      title: 'Password Strength Meter',
      description: 'Test the strength of your passwords',
      icon: Shield,
      category: 'Security'
    },
    {
      id: 'password-generator',
      title: 'Password Generator',
      description: 'Generate secure, random passwords',
      icon: Key,
      category: 'Security'
    },
    {
      id: 'fake-data',
      title: 'Fake Data Generator',
      description: 'Generate fake personal data for testing purposes',
      icon: UserPlus,
      category: 'Utility'
    },
    {
      id: 'risk-analyzer',
      title: 'Privacy Risk Analyzer',
      description: 'Analyze your overall privacy risk level',
      icon: BarChart3,
      category: 'Analysis'
    },
    {
      id: 'json-beautifier',
      title: 'JSON Beautifier',
      description: 'Format and beautify JSON data',
      icon: Code,
      category: 'Utility'
    },
    {
      id: 'email-mask',
      title: 'Email Mask Generator',
      description: 'Generate disposable email addresses',
      icon: Mail,
      category: 'Privacy'
    },
    {
      id: 'qr-generator',
      title: 'QR Code Generator',
      description: 'Generate QR codes for text and URLs',
      icon: QrCode,
      category: 'Utility'
    }
  ];

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generatePassword = (length: number = 16, includeSymbols: boolean = true, includeNumbers: boolean = true) => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let charset = lowercase + uppercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;
    
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  };

  const checkPasswordStrength = (password: string) => {
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)
    };
    
    Object.values(checks).forEach(check => check && score++);
    
    let strength = 'Very Weak';
    let color = 'text-risk-high';
    
    if (score >= 4) {
      strength = 'Strong';
      color = 'text-risk-low';
    } else if (score >= 3) {
      strength = 'Medium';
      color = 'text-risk-medium';
    } else if (score >= 2) {
      strength = 'Weak';
      color = 'text-risk-medium';
    }
    
    return { strength, color, score, checks };
  };

  const generateFakeData = () => {
    const firstNames = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'protonmail.com'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    
    return {
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
      phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      address: `${Math.floor(Math.random() * 9999) + 1} ${['Main', 'Oak', 'Pine', 'Elm', 'Cedar'][Math.floor(Math.random() * 5)]} St`,
      city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][Math.floor(Math.random() * 5)],
      zipCode: Math.floor(Math.random() * 90000) + 10000
    };
  };

  const checkBreaches = (email: string) => {
    // Simulate breach check
    const breaches = [
      { name: 'LinkedIn', year: 2021, records: '700M' },
      { name: 'Facebook', year: 2019, records: '533M' },
      { name: 'Yahoo', year: 2014, records: '500M' },
      { name: 'Equifax', year: 2017, records: '147M' },
      { name: 'Adobe', year: 2013, records: '153M' }
    ];
    
    const foundBreaches = breaches.filter(() => Math.random() > 0.6);
    return foundBreaches;
  };

  const analyzeRisk = (data: any) => {
    let riskScore = 0;
    const factors = [];
    
    if (!data.twoFactor) {
      riskScore += 25;
      factors.push('No two-factor authentication');
    }
    if (data.weakPasswords > 0) {
      riskScore += data.weakPasswords * 10;
      factors.push(`${data.weakPasswords} weak passwords`);
    }
    if (data.publicWifi) {
      riskScore += 15;
      factors.push('Uses public WiFi frequently');
    }
    if (data.socialMedia > 3) {
      riskScore += 10;
      factors.push('High social media exposure');
    }
    
    return { riskScore: Math.min(riskScore, 100), factors };
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleToolClick = (toolId: string) => {
    setSelectedTool(toolId);
  };

  const renderToolInterface = () => {
    if (!selectedTool) return null;

    const tool = tools.find(t => t.id === selectedTool);
    if (!tool) return null;

    switch (selectedTool) {
      case 'password-generator':
        const [passwordSettings, setPasswordSettings] = useState({
          length: 16,
          includeSymbols: true,
          includeNumbers: true
        });
        const [generatedPassword, setGeneratedPassword] = useState(generatePassword());
        
        return (
          <div className="card-glow">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Password Generator</h3>
            <div className="space-y-4">
              <div className="bg-bg-main p-3 rounded font-mono text-accent-primary flex items-center justify-between">
                <span>{generatedPassword}</span>
                <button
                  onClick={() => copyToClipboard(generatedPassword)}
                  className="text-text-muted hover:text-accent-primary ml-2"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-text-secondary mb-2">Length: {passwordSettings.length}</label>
                  <input
                    type="range"
                    min="8"
                    max="32"
                    value={passwordSettings.length}
                    onChange={(e) => setPasswordSettings({...passwordSettings, length: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={passwordSettings.includeSymbols}
                      onChange={(e) => setPasswordSettings({...passwordSettings, includeSymbols: e.target.checked})}
                      className="text-accent-primary"
                    />
                    <span className="text-text-secondary">Include symbols</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={passwordSettings.includeNumbers}
                      onChange={(e) => setPasswordSettings({...passwordSettings, includeNumbers: e.target.checked})}
                      className="text-accent-primary"
                    />
                    <span className="text-text-secondary">Include numbers</span>
                  </label>
                </div>
              </div>
              
              <button
                onClick={() => setGeneratedPassword(generatePassword(passwordSettings.length, passwordSettings.includeSymbols, passwordSettings.includeNumbers))}
                className="glow-button w-full flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Generate New Password</span>
              </button>
            </div>
          </div>
        );

      case 'password-strength':
        const [testPassword, setTestPassword] = useState('');
        const strength = testPassword ? checkPasswordStrength(testPassword) : null;
        
        return (
          <div className="card-glow">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Password Strength Meter</h3>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Enter password to test"
                value={testPassword}
                onChange={(e) => setTestPassword(e.target.value)}
                className="w-full p-3 bg-bg-main border border-gray-700 rounded text-text-primary"
              />
              
              {strength && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Strength:</span>
                    <span className={`font-semibold ${strength.color}`}>{strength.strength}</span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        strength.score >= 4 ? 'bg-risk-low' : 
                        strength.score >= 3 ? 'bg-risk-medium' : 'bg-risk-high'
                      }`}
                      style={{ width: `${(strength.score / 5) * 100}%` }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    {Object.entries(strength.checks).map(([check, passed]) => (
                      <div key={check} className="flex items-center space-x-2">
                        {passed ? (
                          <Check className="w-4 h-4 text-risk-low" />
                        ) : (
                          <X className="w-4 h-4 text-risk-high" />
                        )}
                        <span className="text-text-secondary text-sm capitalize">
                          {check.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'breach-checker':
        const [email, setEmail] = useState('');
        const [breachResults, setBreachResults] = useState<any>(null);
        
        return (
          <div className="card-glow">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Data Breach Checker</h3>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-bg-main border border-gray-700 rounded text-text-primary"
              />
              <button
                onClick={() => setBreachResults(checkBreaches(email))}
                className="glow-button w-full"
                disabled={!email}
              >
                Check for Breaches
              </button>
              
              {breachResults && (
                <div className={`border rounded p-3 ${
                  breachResults.length > 0 
                    ? 'bg-risk-high/20 border-risk-high' 
                    : 'bg-risk-low/20 border-risk-low'
                }`}>
                  {breachResults.length > 0 ? (
                    <>
                      <p className="text-risk-high font-semibold mb-2">
                        Found in {breachResults.length} breaches:
                      </p>
                      <ul className="text-text-secondary text-sm space-y-1">
                        {breachResults.map((breach: any, index: number) => (
                          <li key={index}>
                            • {breach.name} ({breach.year}) - {breach.records} records
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="text-risk-low font-semibold">
                      No breaches found for this email address
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        );

      case 'fake-data':
        const [fakeData, setFakeData] = useState(generateFakeData());
        
        return (
          <div className="card-glow">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Fake Data Generator</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(fakeData).map(([key, value]) => (
                  <div key={key} className="bg-bg-main p-3 rounded">
                    <label className="block text-text-muted text-sm mb-1 capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <div className="flex items-center justify-between">
                      <span className="text-text-primary">{value}</span>
                      <button
                        onClick={() => copyToClipboard(value.toString())}
                        className="text-text-muted hover:text-accent-primary ml-2"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => setFakeData(generateFakeData())}
                className="glow-button w-full flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Generate New Data</span>
              </button>
            </div>
          </div>
        );

      case 'risk-analyzer':
        const [riskData, setRiskData] = useState({
          twoFactor: false,
          weakPasswords: 0,
          publicWifi: false,
          socialMedia: 0
        });
        const [riskAnalysis, setRiskAnalysis] = useState<any>(null);
        
        return (
          <div className="card-glow">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Privacy Risk Analyzer</h3>
            <div className="space-y-4">
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={riskData.twoFactor}
                    onChange={(e) => setRiskData({...riskData, twoFactor: e.target.checked})}
                    className="text-accent-primary"
                  />
                  <span className="text-text-secondary">I use two-factor authentication</span>
                </label>
                
                <div>
                  <label className="block text-text-secondary mb-2">
                    Number of weak passwords: {riskData.weakPasswords}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={riskData.weakPasswords}
                    onChange={(e) => setRiskData({...riskData, weakPasswords: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={riskData.publicWifi}
                    onChange={(e) => setRiskData({...riskData, publicWifi: e.target.checked})}
                    className="text-accent-primary"
                  />
                  <span className="text-text-secondary">I frequently use public WiFi</span>
                </label>
                
                <div>
                  <label className="block text-text-secondary mb-2">
                    Number of social media accounts: {riskData.socialMedia}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={riskData.socialMedia}
                    onChange={(e) => setRiskData({...riskData, socialMedia: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
              </div>
              
              <button
                onClick={() => setRiskAnalysis(analyzeRisk(riskData))}
                className="glow-button w-full"
              >
                Analyze Risk
              </button>
              
              {riskAnalysis && (
                <div className={`border rounded p-3 ${
                  riskAnalysis.riskScore > 70 ? 'bg-risk-high/20 border-risk-high' :
                  riskAnalysis.riskScore > 40 ? 'bg-risk-medium/20 border-risk-medium' :
                  'bg-risk-low/20 border-risk-low'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text-secondary">Risk Score:</span>
                    <span className={`font-bold text-xl ${
                      riskAnalysis.riskScore > 70 ? 'text-risk-high' :
                      riskAnalysis.riskScore > 40 ? 'text-risk-medium' :
                      'text-risk-low'
                    }`}>
                      {riskAnalysis.riskScore}%
                    </span>
                  </div>
                  
                  {riskAnalysis.factors.length > 0 && (
                    <>
                      <p className="text-text-secondary text-sm mb-2">Risk factors:</p>
                      <ul className="text-text-muted text-sm space-y-1">
                        {riskAnalysis.factors.map((factor: string, index: number) => (
                          <li key={index}>• {factor}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        );

      case 'json-beautifier':
        const [jsonInput, setJsonInput] = useState('');
        const [jsonOutput, setJsonOutput] = useState('');
        const [jsonError, setJsonError] = useState('');
        
        const beautifyJson = () => {
          try {
            const parsed = JSON.parse(jsonInput);
            setJsonOutput(JSON.stringify(parsed, null, 2));
            setJsonError('');
          } catch (error) {
            setJsonError('Invalid JSON format');
            setJsonOutput('');
          }
        };
        
        return (
          <div className="card-glow">
            <h3 className="text-lg font-semibold text-text-primary mb-4">JSON Beautifier</h3>
            <div className="space-y-4">
              <textarea
                placeholder="Paste your JSON here..."
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="w-full p-3 bg-bg-main border border-gray-700 rounded text-text-primary h-32 font-mono text-sm"
              />
              
              <button
                onClick={beautifyJson}
                className="glow-button w-full"
                disabled={!jsonInput}
              >
                Beautify JSON
              </button>
              
              {jsonError && (
                <div className="bg-risk-high/20 border border-risk-high p-3 rounded">
                  <p className="text-risk-high text-sm">{jsonError}</p>
                </div>
              )}
              
              {jsonOutput && (
                <div className="relative">
                  <textarea
                    value={jsonOutput}
                    readOnly
                    className="w-full p-3 bg-bg-main border border-gray-700 rounded text-text-primary h-32 font-mono text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(jsonOutput)}
                    className="absolute top-2 right-2 text-text-muted hover:text-accent-primary"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case 'email-mask':
        const [maskedEmails, setMaskedEmails] = useState<string[]>([]);
        
        const generateMaskedEmail = () => {
          const prefixes = ['temp', 'secure', 'private', 'anon', 'safe'];
          const domains = ['tempmail.com', 'guerrillamail.com', '10minutemail.com'];
          const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
          const randomSuffix = Math.random().toString(36).substring(2, 8);
          const randomDomain = domains[Math.floor(Math.random() * domains.length)];
          
          const newEmail = `${randomPrefix}${randomSuffix}@${randomDomain}`;
          setMaskedEmails([newEmail, ...maskedEmails.slice(0, 4)]);
        };
        
        return (
          <div className="card-glow">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Email Mask Generator</h3>
            <div className="space-y-4">
              <button
                onClick={generateMaskedEmail}
                className="glow-button w-full flex items-center justify-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>Generate Masked Email</span>
              </button>
              
              {maskedEmails.length > 0 && (
                <div className="space-y-2">
                  <p className="text-text-secondary text-sm">Generated emails:</p>
                  {maskedEmails.map((email, index) => (
                    <div key={index} className="bg-bg-main p-3 rounded flex items-center justify-between">
                      <span className="text-text-primary font-mono">{email}</span>
                      <button
                        onClick={() => copyToClipboard(email)}
                        className="text-text-muted hover:text-accent-primary"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'qr-generator':
        const [qrText, setQrText] = useState('');
        const [qrCode, setQrCode] = useState('');
        
        const generateQR = () => {
          // Simple QR code generation using a public API
          const encodedText = encodeURIComponent(qrText);
          setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedText}`);
        };
        
        return (
          <div className="card-glow">
            <h3 className="text-lg font-semibold text-text-primary mb-4">QR Code Generator</h3>
            <div className="space-y-4">
              <textarea
                placeholder="Enter text or URL to generate QR code..."
                value={qrText}
                onChange={(e) => setQrText(e.target.value)}
                className="w-full p-3 bg-bg-main border border-gray-700 rounded text-text-primary h-24"
              />
              
              <button
                onClick={generateQR}
                className="glow-button w-full"
                disabled={!qrText}
              >
                Generate QR Code
              </button>
              
              {qrCode && (
                <div className="text-center">
                  <img
                    src={qrCode}
                    alt="Generated QR Code"
                    className="mx-auto border border-gray-700 rounded"
                  />
                  <p className="text-text-muted text-sm mt-2">
                    QR Code for: {qrText.substring(0, 50)}...
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 'app-tracker':
        const [trackedApps, setTrackedApps] = useState([
          { name: 'Instagram', permissions: ['Camera', 'Microphone', 'Location', 'Contacts'], risk: 'high' },
          { name: 'WhatsApp', permissions: ['Camera', 'Microphone', 'Contacts'], risk: 'medium' },
          { name: 'Spotify', permissions: ['Storage', 'Microphone'], risk: 'low' },
          { name: 'Gmail', permissions: ['Contacts', 'Storage'], risk: 'low' }
        ]);
        
        return (
          <div className="card-glow">
            <h3 className="text-lg font-semibold text-text-primary mb-4">App Permission Tracker</h3>
            <div className="space-y-4">
              {trackedApps.map((app, index) => (
                <div key={index} className="bg-bg-main p-3 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-text-primary font-semibold">{app.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      app.risk === 'high' ? 'bg-risk-high/20 text-risk-high' :
                      app.risk === 'medium' ? 'bg-risk-medium/20 text-risk-medium' :
                      'bg-risk-low/20 text-risk-low'
                    }`}>
                      {app.risk.toUpperCase()} RISK
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {app.permissions.map((permission, pIndex) => (
                      <span
                        key={pIndex}
                        className="text-xs bg-gray-700 text-text-muted px-2 py-1 rounded"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              
              <button className="glow-button w-full">
                Scan Device for Apps
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="card-glow">
            <h3 className="text-lg font-semibold text-text-primary mb-4">{tool.title}</h3>
            <p className="text-text-secondary mb-4">{tool.description}</p>
            <p className="text-text-muted text-sm">This tool interface is coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Privacy Tools</h2>
        <p className="text-text-secondary">Comprehensive toolkit for digital privacy and security</p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-bg-card border border-gray-700 rounded-lg 
              text-text-primary placeholder-text-muted focus:border-accent-primary focus:outline-none"
          />
        </div>
      </div>

      {selectedTool && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-text-primary">Tool Interface</h3>
            <button
              onClick={() => setSelectedTool(null)}
              className="text-text-muted hover:text-accent-primary"
            >
              Close
            </button>
          </div>
          {renderToolInterface()}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <ToolCard
            key={tool.id}
            title={tool.title}
            description={tool.description}
            icon={tool.icon}
            category={tool.category}
            onClick={() => handleToolClick(tool.id)}
          />
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <Eye className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary">No tools found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Tools;