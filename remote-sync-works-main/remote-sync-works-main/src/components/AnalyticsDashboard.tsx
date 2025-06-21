
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign, CreditCard, Target, Activity } from 'lucide-react';

export const AnalyticsDashboard = () => {
  const dailyProfitData = [
    { day: 'Mon', revenue: 3200, expenses: 1800, profit: 1400 },
    { day: 'Tue', revenue: 2800, expenses: 1600, profit: 1200 },
    { day: 'Wed', revenue: 4100, expenses: 2200, profit: 1900 },
    { day: 'Thu', revenue: 3600, expenses: 1900, profit: 1700 },
    { day: 'Fri', revenue: 5200, expenses: 2800, profit: 2400 },
    { day: 'Sat', revenue: 4800, expenses: 2100, profit: 2700 },
    { day: 'Sun', revenue: 3900, expenses: 1700, profit: 2200 }
  ];

  const monthlyTrends = [
    { month: 'Jan', profit: 25000, revenue: 48000, expenses: 23000 },
    { month: 'Feb', profit: 28000, revenue: 52000, expenses: 24000 },
    { month: 'Mar', profit: 32000, revenue: 58000, expenses: 26000 },
    { month: 'Apr', profit: 35000, revenue: 62000, expenses: 27000 },
    { month: 'May', profit: 38000, revenue: 68000, expenses: 30000 },
    { month: 'Jun', profit: 42000, revenue: 75000, expenses: 33000 }
  ];

  const expenseBreakdown = [
    { category: 'Operations', amount: 35, color: '#3B82F6' },
    { category: 'Marketing', amount: 20, color: '#10B981' },
    { category: 'Staff', amount: 25, color: '#F59E0B' },
    { category: 'Technology', amount: 10, color: '#EF4444' },
    { category: 'Other', amount: 10, color: '#8B5CF6' }
  ];

  const recentTransactions = [
    { description: 'Client Payment - Project Alpha', amount: 4500, date: 'Today', type: 'income', emoji: '💰' },
    { description: 'Software Subscription', amount: -299, date: 'Yesterday', type: 'expense', emoji: '💻' },
    { description: 'Freelancer Payment', amount: -800, date: '2 days ago', type: 'expense', emoji: '👨‍💻' },
    { description: 'Client Payment - Project Beta', amount: 3200, date: '3 days ago', type: 'income', emoji: '💰' },
    { description: 'Office Supplies', amount: -150, date: '4 days ago', type: 'expense', emoji: '📦' }
  ];

  const cashFlowAlerts = [
    { item: 'Upcoming Payment Due', amount: 2500, dueDate: 'In 3 days', status: 'warning' },
    { item: 'Low Cash Reserve', amount: 5000, dueDate: 'Current', status: 'critical' },
    { item: 'Large Expense Pending', amount: 3200, dueDate: 'Next week', status: 'info' }
  ];

  const StatCard = ({ title, value, change, icon: Icon, color, subtitle }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          <div className={`flex items-center gap-1 mt-2 text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{Math.abs(change)}% vs last month</span>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Monthly Profit"
          value="$42,000"
          change={18.5}
          icon={Target}
          color="bg-green-500"
          subtitle="June 2024"
        />
        <StatCard
          title="Daily Average"
          value="$2,340"
          change={12.3}
          icon={DollarSign}
          color="bg-blue-500"
          subtitle="Profit per day"
        />
        <StatCard
          title="Cash Flow"
          value="$15,200"
          change={-5.2}
          icon={Activity}
          color="bg-purple-500"
          subtitle="Current balance"
        />
        <StatCard
          title="Burn Rate"
          value="$8,500"
          change={-8.1}
          icon={CreditCard}
          color="bg-orange-500"
          subtitle="Monthly expenses"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Profit Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Daily Profit & Loss</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailyProfitData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                formatter={(value, name) => [`$${value}`, name === 'profit' ? 'Profit' : name === 'revenue' ? 'Revenue' : 'Expenses']}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Area type="monotone" dataKey="revenue" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
              <Area type="monotone" dataKey="expenses" stackId="2" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} />
              <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 6-Month Profit Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, 'Profit']}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">💳 Recent Transactions</h3>
          <div className="space-y-3">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{transaction.emoji}</span>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-600">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{transaction.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cash Flow Alerts */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">⚠️ Cash Flow Alerts</h3>
          <div className="space-y-3">
            {cashFlowAlerts.map((alert, index) => (
              <div key={index} className={`flex items-center justify-between p-3 rounded-xl border ${
                alert.status === 'critical' ? 'bg-red-50 border-red-100' :
                alert.status === 'warning' ? 'bg-yellow-50 border-yellow-100' :
                'bg-blue-50 border-blue-100'
              }`}>
                <div className="flex items-center gap-3">
                  <AlertTriangle className={`w-5 h-5 ${
                    alert.status === 'critical' ? 'text-red-500' :
                    alert.status === 'warning' ? 'text-yellow-500' :
                    'text-blue-500'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-900">{alert.item}</p>
                    <p className="text-sm text-gray-600">{alert.dueDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${alert.amount.toLocaleString()}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    alert.status === 'critical' ? 'bg-red-100 text-red-700' :
                    alert.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {alert.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
