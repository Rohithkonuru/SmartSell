import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, CartesianGrid, Tooltip, 
  PieChart, Pie, Cell, AreaChart, Area, Legend 
} from 'recharts';
import { Download, TrendingUp, AlertTriangle, Trophy, DollarSign, Package, Users, Target } from 'lucide-react';
import { salesAPI, productsAPI } from '../lib/api';
import { toast } from 'sonner';

interface User {
  name: string;
  email: string;
}

interface Sale {
  productName: string;
  quantity: number;
  price: number;
  total: number;
  timestamp: string;
}

interface Product {
  _id: string;
  name: string;
  stock: number;
  price: number;
  emoji: string;
}

interface DashboardHomeProps {
  user: User | null;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export const DashboardHome = ({ user }: DashboardHomeProps) => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [salesSummary, setSalesSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [salesData, productsData, summaryData] = await Promise.all([
        salesAPI.getAll(),
        productsAPI.getAll(),
        salesAPI.getSummary()
      ]);
      setSales(salesData);
      setProducts(productsData);
      setSalesSummary(summaryData);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Aggregate sales by day for chart
  const salesByDay: { [key: string]: number } = {};
  sales.forEach(sale => {
    const day = new Date(sale.timestamp).toLocaleDateString('en-US', { weekday: 'short' });
    salesByDay[day] = (salesByDay[day] || 0) + sale.total;
  });
  const chartData = Object.entries(salesByDay).map(([day, total]) => ({ day, sales: total }));

  // Sales by hour for today
  const salesByHour: { [key: string]: number } = {};
  const today = new Date().toDateString();
  sales.forEach(sale => {
    if (new Date(sale.timestamp).toDateString() === today) {
      const hour = new Date(sale.timestamp).getHours();
      salesByHour[hour] = (salesByHour[hour] || 0) + sale.total;
    }
  });
  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    sales: salesByHour[i] || 0
  }));

  // Top products
  const productMap: { [key: string]: { sold: number; revenue: number; emoji: string } } = {};
  sales.forEach(sale => {
    if (!productMap[sale.productName]) {
      const product = products.find(p => p.name === sale.productName);
      productMap[sale.productName] = { sold: 0, revenue: 0, emoji: product?.emoji || '📦' };
    }
    productMap[sale.productName].sold += sale.quantity;
    productMap[sale.productName].revenue += sale.total;
  });
  const topProducts = Object.entries(productMap)
    .map(([name, stats]) => ({ name, sold: stats.sold, revenue: stats.revenue, emoji: stats.emoji }))
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 6);

  // Product revenue distribution for pie chart
  const pieChartData = topProducts.map(product => ({
    name: product.name,
    value: product.revenue,
    emoji: product.emoji
  }));

  // Low stock items
  const lowStockItems = products
    .filter(product => product.stock <= 5)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 3);

  // Inventory value
  const totalInventoryValue = products.reduce((sum, product) => sum + (product.stock * product.price), 0);

  const totalSales = salesSummary?.total?.totalRevenue || 0;
  const todaySales = salesSummary?.today?.todayRevenue || 0;
  const totalItems = salesSummary?.total?.totalItems || 0;
  const averageOrderValue = sales.length > 0 ? totalSales / sales.length : 0;

  const downloadDashboardReport = () => {
    const reportContent = `
SmartSell Business Dashboard Report
Generated on: ${new Date().toLocaleDateString()}

BUSINESS OVERVIEW:
Total Revenue: $${totalSales.toFixed(2)}
Today's Revenue: $${todaySales.toFixed(2)}
Total Items Sold: ${totalItems}
Total Transactions: ${sales.length}
Average Order Value: $${averageOrderValue.toFixed(2)}
Total Inventory Value: $${totalInventoryValue.toFixed(2)}

TOP PERFORMING PRODUCTS:
${topProducts.map((product, index) => 
  `${index + 1}. ${product.emoji} ${product.name} - ${product.sold} units sold - $${product.revenue.toFixed(2)} revenue`
).join('\n')}

LOW STOCK ALERTS:
${lowStockItems.map(item => 
  `${item.emoji} ${item.name} - Only ${item.stock} units remaining`
).join('\n')}

RECENT SALES:
${sales.slice(0, 10).map(sale => 
  `${sale.productName} - ${sale.quantity}x @ $${sale.price} = $${sale.total}`
).join('\n')}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smartsell-dashboard-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast.success('Dashboard report downloaded! 📊');
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-3">
              Welcome back, {user?.name || 'Business Owner'}! 👋
            </h2>
            <p className="text-xl opacity-90 mb-4">Here's your SmartSell business performance today</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">📊 Real-time Analytics</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">🚀 Growing Business</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">${todaySales.toFixed(2)}</div>
            <div className="text-sm opacity-80">Today's Revenue</div>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-blue-200" />
            <TrendingUp className="w-5 h-5 text-blue-200" />
          </div>
          <div className="text-3xl font-bold mb-1">${totalSales.toFixed(2)}</div>
          <div className="text-blue-100 text-sm">Total Revenue</div>
          <div className="text-xs text-blue-200 mt-2">Today: ${todaySales.toFixed(2)}</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between mb-4">
            <Package className="w-8 h-8 text-green-200" />
            <div className="text-sm font-medium text-green-200">{sales.length} sales</div>
          </div>
          <div className="text-3xl font-bold mb-1">{totalItems}</div>
          <div className="text-green-100 text-sm">Items Sold</div>
          <div className="text-xs text-green-200 mt-2">Total transactions</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 text-purple-200" />
            <Trophy className="w-5 h-5 text-purple-200" />
          </div>
          <div className="text-3xl font-bold mb-1">${averageOrderValue.toFixed(2)}</div>
          <div className="text-purple-100 text-sm">Avg. Order Value</div>
          <div className="text-xs text-purple-200 mt-2">Best seller: {topProducts[0]?.name || 'N/A'}</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between mb-4">
            <Package className="w-8 h-8 text-orange-200" />
            <div className="text-sm font-medium text-orange-200">{products.length} products</div>
          </div>
          <div className="text-3xl font-bold mb-1">${totalInventoryValue.toFixed(2)}</div>
          <div className="text-orange-100 text-sm">Inventory Value</div>
          <div className="text-xs text-orange-200 mt-2">{lowStockItems.length} low stock items</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Sales Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              📈 Daily Sales Trend
            </h3>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">This Week</div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fill="url(#salesGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Revenue Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              🥧 Revenue Distribution
            </h3>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">By Product</div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Hourly Sales Chart */}
      {hourlyData.some(d => d.sales > 0) && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              ⏰ Today's Hourly Sales
            </h3>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">24-Hour View</div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hour" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="sales" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Top Products and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Selling Products */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            🏆 Top-Selling Products
          </h3>
          {topProducts.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No sales yet. Start selling to see your top products!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{product.emoji}</div>
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">{product.name}</div>
                      <div className="text-sm text-gray-600">{product.sold} units sold</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600 text-xl">${product.revenue.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">Revenue</div>
                    {index === 0 && (
                      <div className="text-xs text-yellow-600 font-medium mt-1">🥇 Best Seller</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            ⚠️ Low Stock Alerts
          </h3>
          {lowStockItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">✅</div>
              <p className="text-gray-600 text-lg">All products have good stock levels!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div key={item._id} className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200 hover:from-red-100 hover:to-red-200 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{item.emoji}</div>
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">{item.name}</div>
                      <div className="text-sm text-red-600 font-medium">Only {item.stock} left in stock</div>
                    </div>
                  </div>
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
              ))}
            </div>
          )}
          {lowStockItems.length > 0 && (
            <button className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg">
              📦 Restock Items Now
            </button>
          )}
        </div>
      </div>

      {/* Download Report */}
      <div className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-3">📊 SmartSell Business Report</h3>
            <p className="text-lg opacity-90 mb-4">Download your complete business analytics report with all insights</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">📈 Sales Analytics</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">📦 Inventory Status</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">💰 Revenue Insights</span>
            </div>
          </div>
          <button 
            onClick={downloadDashboardReport}
            className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center gap-3"
          >
            <Download className="w-5 h-5" />
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};
