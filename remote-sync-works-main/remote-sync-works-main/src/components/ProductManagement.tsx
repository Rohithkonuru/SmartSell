import React, { useState, useEffect } from 'react';
import { Plus, Package, DollarSign, Hash, CheckCircle, AlertTriangle, Edit, Trash2, TrendingUp, BarChart3, Zap } from 'lucide-react';
import { productsAPI } from '../lib/api';
import { toast } from 'sonner';

interface Product {
  _id: string;
  name: string;
  stock: number;
  price: number;
  emoji: string;
}

export const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    stock: 0,
    price: 0,
    emoji: '📦'
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productsAPI.getAll();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || newProduct.stock < 0 || newProduct.price < 0) {
      toast.error('Please fill all fields correctly');
      return;
    }

    try {
      setLoading(true);
      const response = await productsAPI.create(newProduct);
      setSuccessMessage(response.message);
      setShowSuccess(true);
      setShowAddForm(false);
      setNewProduct({ name: '', stock: 0, price: 0, emoji: '📦' });
      fetchProducts();
      toast.success('Product added successfully! 🎉');
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to add product';
      setSuccessMessage(errorMsg);
      setShowSuccess(true);
      toast.error(errorMsg);
      setTimeout(() => setShowSuccess(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStock = async (productId: string, action: 'add' | 'remove', quantity: number) => {
    try {
      setLoading(true);
      const response = await productsAPI.updateStock(productId, action, quantity);
      setSuccessMessage(response.message);
      setShowSuccess(true);
      fetchProducts();
      toast.success(`Stock ${action === 'add' ? 'added' : 'removed'} successfully!`);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to update stock';
      setSuccessMessage(errorMsg);
      setShowSuccess(true);
      toast.error(errorMsg);
      setTimeout(() => setShowSuccess(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string, productName: string) => {
    if (!confirm(`Are you sure you want to delete "${productName}"?`)) return;

    try {
      setLoading(true);
      const response = await productsAPI.delete(productId);
      setSuccessMessage(response.message);
      setShowSuccess(true);
      fetchProducts();
      toast.success('Product deleted successfully!');
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to delete product';
      setSuccessMessage(errorMsg);
      setShowSuccess(true);
      toast.error(errorMsg);
      setTimeout(() => setShowSuccess(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const totalProducts = products.length;
  const totalInventoryValue = products.reduce((sum, product) => sum + (product.stock * product.price), 0);
  const lowStockCount = products.filter(p => p.stock <= 5).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Enhanced Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
          📦 SmartSell Product Hub
        </h2>
        <p className="text-gray-600 text-lg">Manage your inventory and track product performance</p>
      </div>

      {/* Product Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Products</p>
              <p className="text-3xl font-bold">{totalProducts}</p>
            </div>
            <Package className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Inventory Value</p>
              <p className="text-3xl font-bold">${totalInventoryValue.toFixed(2)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Low Stock</p>
              <p className="text-3xl font-bold">{lowStockCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Out of Stock</p>
              <p className="text-3xl font-bold">{outOfStockCount}</p>
            </div>
            <Zap className="w-8 h-8 text-red-200" />
          </div>
        </div>
      </div>

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

      {/* Add Product Button */}
      <div className="text-center">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-2xl flex items-center gap-3 mx-auto"
        >
          <Plus className="w-6 h-6" />
          {showAddForm ? 'Cancel' : 'Add New Product'}
        </button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 animate-in slide-in-from-top-2">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Plus className="w-6 h-6 text-blue-500" />
            Add New Product
          </h3>
          <form onSubmit={handleAddProduct} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Package className="w-4 h-4 inline mr-2" />
                  Product Name
                </label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-all"
                  placeholder="e.g., Chocolate Cake"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <span className="text-2xl">{newProduct.emoji}</span>
                  Emoji
                </label>
                <input
                  type="text"
                  value={newProduct.emoji}
                  onChange={(e) => setNewProduct({ ...newProduct, emoji: e.target.value })}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-3xl transition-all"
                  placeholder="🍰"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Hash className="w-4 h-4 inline mr-2" />
                  Initial Stock
                </label>
                <input
                  type="number"
                  min="0"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-all"
                  placeholder="0"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Price
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-all"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-bold hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 text-lg"
            >
              <Plus className="w-5 h-5" />
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>
          </form>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">{product.emoji}</div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateStock(product._id, 'add', 1)}
                  disabled={loading}
                  className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                  title="Add 1 to stock"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id, product.name)}
                  disabled={loading}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                  title="Delete product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-bold text-green-600 text-lg">${product.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Stock:</span>
                <span className={`font-bold text-lg ${product.stock <= 5 ? 'text-red-600' : 'text-blue-600'}`}>
                  {product.stock} units
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Value:</span>
                <span className="font-bold text-purple-600">${(product.stock * product.price).toFixed(2)}</span>
              </div>
            </div>

            {/* Stock Status */}
            {product.stock <= 5 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-red-700 font-medium text-sm">
                    {product.stock === 0 ? 'Out of stock!' : `Low stock - only ${product.stock} left!`}
                  </span>
                </div>
              </div>
            )}

            {/* Stock Management */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const qty = prompt(`How many units to add to ${product.name}?`);
                    if (qty && !isNaN(parseInt(qty))) {
                      handleUpdateStock(product._id, 'add', parseInt(qty));
                    }
                  }}
                  disabled={loading}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  Add Stock
                </button>
                <button
                  onClick={() => {
                    const qty = prompt(`How many units to remove from ${product.name}?`);
                    if (qty && !isNaN(parseInt(qty))) {
                      handleUpdateStock(product._id, 'remove', parseInt(qty));
                    }
                  }}
                  disabled={loading || product.stock === 0}
                  className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Remove Stock
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="text-6xl mb-6">📦</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No Products Yet</h3>
          <p className="text-gray-600 text-lg mb-8">Start by adding your first product to manage your inventory</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-bold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg"
          >
            <Plus className="w-5 h-5 inline mr-2" />
            Add Your First Product
          </button>
        </div>
      )}
    </div>
  );
}; 