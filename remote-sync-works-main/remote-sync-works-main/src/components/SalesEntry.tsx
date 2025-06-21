import React, { useState, useEffect } from 'react';
import { Plus, Package, DollarSign, Hash, CheckCircle, AlertCircle, Download, TrendingUp, BarChart3 } from 'lucide-react';
import { salesAPI, productsAPI } from '../lib/api';
import { toast } from 'sonner';

interface Product {
  _id: string;
  name: string;
  stock: number;
  price: number;
  emoji: string;
}

interface Sale {
  _id?: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  timestamp: string;
}

export const SalesEntry = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [recentSales, setRecentSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(false);
  const [salesStats, setSalesStats] = useState({
    totalSales: 0,
    totalRevenue: 0,
    averageOrder: 0
  });

  useEffect(() => {
    fetchProducts();
    fetchSales();
    fetchSalesStats();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productsAPI.getAll();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      toast.error('Failed to load products');
    }
  };

  const fetchSales = async () => {
    try {
      const sales = await salesAPI.getAll();
      setRecentSales(sales.slice(0, 5));
    } catch (err) {
      console.error('Failed to fetch sales:', err);
      toast.error('Failed to load recent sales');
    }
  };

  const fetchSalesStats = async () => {
    try {
      const summary = await salesAPI.getSummary();
      setSalesStats({
        totalSales: summary.total.saleCount,
        totalRevenue: summary.total.totalRevenue,
        averageOrder: summary.total.saleCount > 0 ? summary.total.totalRevenue / summary.total.saleCount : 0
      });
    } catch (err) {
      console.error('Failed to fetch sales stats:', err);
    }
  };

  const getSelectedProductData = () => {
    return products.find(p => p._id === selectedProduct);
  };

  const calculateTotal = () => {
    const product = getSelectedProductData();
    if (product && quantity) {
      return product.price * parseInt(quantity);
    }
    return 0;
  };

  const validateQuantity = () => {
    const product = getSelectedProductData();
    if (!product || !quantity) return true;
    
    const requestedQty = parseInt(quantity);
    if (requestedQty > product.stock) {
      setErrorMessage(`❌ Insufficient stock! You requested ${requestedQty} but only ${product.stock} available.`);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !quantity) {
      toast.error('Please select a product and enter quantity');
      return;
    }

    if (!validateQuantity()) return;

    const product = getSelectedProductData();
    if (!product) return;

    try {
      setLoading(true);
      const response = await salesAPI.create(product._id, parseInt(quantity));
      setSuccessMessage(response.message);
      setShowSuccess(true);
      setSelectedProduct('');
      setQuantity('');
      fetchProducts(); // Refresh products to get updated stock
      fetchSales(); // Refresh sales list
      fetchSalesStats(); // Refresh stats
      toast.success('Sale recorded successfully! 🎉');
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to record sale';
      setErrorMessage(errorMsg);
      setShowError(true);
      toast.error(errorMsg);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  const downloadSalesPDF = async () => {
    try {
      const sales = await salesAPI.getAll();
      const summary = await salesAPI.getSummary();
      
      // Create PDF content
      const pdfContent = `
        SmartSell Sales Report
        Generated on: ${new Date().toLocaleDateString()}
        
        SUMMARY:
        Total Sales: ${summary.total.saleCount}
        Total Revenue: $${summary.total.totalRevenue.toFixed(2)}
        Total Items Sold: ${summary.total.totalItems}
        
        RECENT SALES:
        ${sales.slice(0, 10).map(sale => 
          `${sale.productName} - ${sale.quantity}x @ $${sale.price} = $${sale.total}`
        ).join('\n')}
      `;
      
      // Create and download file
      const blob = new Blob([pdfContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `smartsell-sales-report-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('Sales report downloaded! 📄');
    } catch (err) {
      toast.error('Failed to download report');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Enhanced Header with Stats */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
          💰 SmartSell Sales Center
        </h2>
        <p className="text-gray-600 text-lg">Record sales and track your business growth</p>
      </div>

      {/* Sales Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Sales</p>
              <p className="text-3xl font-bold">{salesStats.totalSales}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold">${salesStats.totalRevenue.toFixed(2)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Avg. Order</p>
              <p className="text-3xl font-bold">${salesStats.averageOrder.toFixed(2)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {showError && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3 animate-pulse">
          <AlertCircle className="w-6 h-6 text-red-500" />
          <div>
            <div className="font-semibold text-red-800">Error! ⚠️</div>
            <div className="text-sm text-red-600">{errorMessage}</div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3 animate-bounce">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <div>
            <div className="font-semibold text-green-800">Success! 🎉</div>
            <div className="text-sm text-green-600">{successMessage}</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Entry Form */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-500" />
            Record New Sale
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Package className="w-4 h-4 inline mr-2" />
                Select Product
              </label>
              {products.length === 0 ? (
                <div className="text-center py-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No products available. Add products first!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                  {products.map((product) => (
                    <button
                      key={product._id}
                      type="button"
                      onClick={() => setSelectedProduct(product._id)}
                      disabled={product.stock <= 0}
                      className={`p-4 rounded-xl border text-left transition-all transform hover:scale-105 ${
                        selectedProduct === product._id
                          ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 ring-2 ring-blue-200'
                          : product.stock <= 0
                          ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{product.emoji}</div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-600">${product.price.toFixed(2)}</div>
                          <div className={`text-xs font-medium ${product.stock <= 5 ? 'text-red-600' : 'text-green-600'}`}>
                            {product.stock} in stock
                          </div>
                        </div>
                        {product.stock <= 5 && (
                          <div className="text-red-500 text-xs bg-red-100 px-2 py-1 rounded-full">
                            Low Stock!
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quantity Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Hash className="w-4 h-4 inline mr-2" />
                Quantity Sold
              </label>
              <input
                type="number"
                min="1"
                max={getSelectedProductData()?.stock || 1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold transition-all"
                placeholder="Enter quantity..."
                disabled={!selectedProduct}
              />
              {getSelectedProductData() && (
                <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                  <span>Available: {getSelectedProductData()?.stock} units</span>
                  {parseInt(quantity) > (getSelectedProductData()?.stock || 0) && (
                    <span className="text-red-500 font-medium">⚠️ Insufficient stock!</span>
                  )}
                </div>
              )}
            </div>

            {/* Price Calculation */}
            {selectedProduct && quantity && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-blue-900">
                      {getSelectedProductData()?.emoji} {getSelectedProductData()?.name}
                    </div>
                    <div className="text-sm text-blue-700">
                      ${getSelectedProductData()?.price.toFixed(2)} × {quantity} units
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-900">
                      ${calculateTotal().toFixed(2)}
                    </div>
                    <div className="text-sm text-blue-600">Total Sale</div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!selectedProduct || !quantity || loading || (parseInt(quantity) > (getSelectedProductData()?.stock || 0))}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {loading ? 'Recording Sale...' : 'Record Sale'}
            </button>
          </form>
        </div>

        {/* Recent Sales & Download */}
        <div className="space-y-6">
          {/* Download Report */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Download className="w-5 h-5 text-purple-500" />
              Export Sales Report
            </h3>
            <p className="text-gray-600 mb-4">Download your sales data for analysis and reporting</p>
            <button
              onClick={downloadSalesPDF}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Sales Report
            </button>
          </div>

          {/* Recent Sales */}
          {recentSales.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                Recent Sales
              </h3>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {recentSales.map((sale) => (
                  <div key={sale._id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all">
                    <div>
                      <div className="font-medium text-gray-900">
                        {sale.quantity}× {sale.productName}
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(sale.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600 text-lg">${sale.total.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">${sale.price.toFixed(2)} each</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
