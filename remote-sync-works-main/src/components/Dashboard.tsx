import React, { useState, useEffect } from 'react';
import { LoginPage } from './LoginPage';
import { DashboardHome } from './DashboardHome';
import { SalesEntry } from './SalesEntry';
import { TrendingUp } from 'lucide-react';
import { authAPI } from '@/lib/api';
import axios from 'axios';

export const Dashboard = () => {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);
  const [dashboardKey, setDashboardKey] = useState(0);
  const [products, setProducts] = useState([]);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
    setCurrentView('login');
  };

  // Refresh dashboard analytics after a sale
  const handleSale = () => {
    setDashboardKey(prev => prev + 1);
    setCurrentView('dashboard');
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/sales')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  if (currentView === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-pink-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SmartSell</h1>
                <p className="text-xs text-gray-500">Your Business, Visualized</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-3">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setCurrentView('sales')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'sales'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              💰 Sales Entry
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentView === 'dashboard' && <DashboardHome key={dashboardKey} user={user} />}
        {currentView === 'sales' && <SalesEntry onSale={handleSale} />}
        <div>
          <h1>Products (from /api/sales)</h1>
          <pre>{JSON.stringify(products, null, 2)}</pre>
        </div>
      </main>
    </div>
  );
}; 