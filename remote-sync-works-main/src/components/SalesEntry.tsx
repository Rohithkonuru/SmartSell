import React, { useState, useEffect } from 'react';
import { Plus, Package, DollarSign, Hash, CheckCircle } from 'lucide-react';
import { salesAPI } from '@/lib/api';

const products = [
  { id: 1, name: 'Chocolate Cake', price: 30, emoji: '🍰', stock: 12 },
  { id: 2, name: 'Croissant', price: 15, emoji: '🥐', stock: 25 },
  { id: 3, name: 'Blueberry Muffin', price: 15, emoji: '🧁', stock: 8 },
  { id: 4, name: 'Sourdough Bread', price: 20, emoji: '🍞', stock: 15 },
  { id: 5, name: 'Cinnamon Roll', price: 18, emoji: '🌀', stock: 6 },
  { id: 6, name: 'Banana Bread', price: 25, emoji: '🍌', stock: 4 }
];

export const SalesEntry = ({ onSale }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [recentSales, setRecentSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getSelectedProductData = () => {
    return products.find(p => p.id.toString() === selectedProduct);
  };

  const calculateTotal = () => {
    const product = getSelectedProductData();
    if (product && quantity) {
      return product.price * parseInt(quantity);
    }
    return 0;
  };

  // Load recent sales from API
  useEffect(() => {
    loadRecentSales();
  }, []);

  const loadRecentSales = async () => {
    try {
      const sales = await salesAPI.getAll();
      setRecentSales(sales.slice(-4).reverse());
    } catch (error) {
      console.error('Failed to load sales:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct || !quantity) return;

    const product = getSelectedProductData();
    if (!product) {
      setError('Please select a valid product');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await salesAPI.create(product.name, parseInt(quantity), product.price);
      
      setShowSuccess(true);
      
      // Reset form
      setSelectedProduct('');
      setQuantity('');
      
      // Reload recent sales
      await loadRecentSales();
      
      // Notify parent to refresh dashboard
      if (onSale) onSale();
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      setError(error.message || 'Failed to create sale. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">💰 Sales Entry</h2>
        <p className="text-gray-600">Record your daily sales and track your business performance</p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <div>
            <h3 className="font-medium text-green-800">Sale recorded successfully! 🎉</h3>
            <p className="text-sm text-green-600">Your sale has been added to the system</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-5 h-5 text-red-500">⚠️</div>
          <div>
            <h3 className="font-medium text-red-800">Error</h3>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Form */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">📝 New Sale</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              >
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.emoji} {product.name} - ${product.price}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="relative">
                <Hash className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="1"
                  min="1"
                  required
                />
              </div>
            </div>

            {selectedProduct && quantity && (
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Total:</span>
                  <span className="text-lg font-bold text-blue-600">${calculateTotal()}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !selectedProduct || !quantity}
              className="w-full bg-gradient-to-r from-blue-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Recording Sale...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Record Sale
                </>
              )}
            </button>
          </form>
        </div>

        {/* Recent Sales */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">📊 Recent Sales</h3>
          
          {recentSales.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No sales recorded yet</p>
              <p className="text-sm text-gray-400">Start by recording your first sale!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {products.find(p => p.name === sale.product)?.emoji || '📦'}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{sale.product}</div>
                      <div className="text-sm text-gray-500">
                        Qty: {sale.quantity} × ${sale.price}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">${sale.total}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(sale.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="text-2xl">💰</div>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${recentSales.reduce((sum, sale) => sum + sale.total, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Recent Sales</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="text-2xl">📦</div>
            <Package className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{recentSales.length}</div>
          <div className="text-sm text-gray-600">Sales Recorded</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="text-2xl">📈</div>
            <div className="text-sm font-medium text-purple-600">
              ${recentSales.length > 0 ? Math.round(recentSales.reduce((sum, sale) => sum + sale.total, 0) / recentSales.length) : 0}/sale
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {recentSales.length > 0 ? Math.round(recentSales.reduce((sum, sale) => sum + sale.quantity, 0) / recentSales.length) : 0}
          </div>
          <div className="text-sm text-gray-600">Avg Items per Sale</div>
        </div>
      </div>
    </div>
  );
}; 