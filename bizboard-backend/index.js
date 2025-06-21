const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Data storage files
const PRODUCTS_FILE = path.join(__dirname, 'data', 'products.json');
const SALES_FILE = path.join(__dirname, 'data', 'sales.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Initialize empty files if they don't exist
if (!fs.existsSync(PRODUCTS_FILE)) {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify([]));
}
if (!fs.existsSync(SALES_FILE)) {
  fs.writeFileSync(SALES_FILE, JSON.stringify([]));
}

// Helper functions for file operations
const readProducts = () => {
  try {
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeProducts = (products) => {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
};

const readSales = () => {
  try {
    const data = fs.readFileSync(SALES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeSales = (sales) => {
  fs.writeFileSync(SALES_FILE, JSON.stringify(sales, null, 2));
};

// Products routes
app.get('/api/products/list', (req, res) => {
  try {
    const products = readProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/low-stock', (req, res) => {
  try {
    const products = readProducts();
    const lowStock = products.filter(p => p.stock <= 5);
    res.json(lowStock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products/add', (req, res) => {
  try {
    const products = readProducts();
    const newProduct = {
      _id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    products.push(newProduct);
    writeProducts(products);
    res.json({
      success: true,
      product: newProduct,
      message: `Product "${newProduct.name}" added successfully to SmartSell!`
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/products/:id/stock', (req, res) => {
  try {
    const { action, quantity } = req.body;
    const products = readProducts();
    const product = products.find(p => p._id === req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    if (action === 'add') {
      product.stock += quantity;
    } else if (action === 'remove') {
      if (product.stock < quantity) {
        return res.status(400).json({ 
          error: `Cannot remove ${quantity} items. Only ${product.stock} available.` 
        });
      }
      product.stock -= quantity;
    } else {
      return res.status(400).json({ error: 'Invalid action. Use "add" or "remove".' });
    }
    
    writeProducts(products);
    
    res.json({
      success: true,
      product,
      message: `${action === 'add' ? 'Added' : 'Removed'} ${quantity} items. New stock: ${product.stock}`
    });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/products/:id', (req, res) => {
  try {
    const products = readProducts();
    const productIndex = products.findIndex(p => p._id === req.params.id);
    
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const deletedProduct = products.splice(productIndex, 1)[0];
    writeProducts(products);
    
    res.json({ 
      success: true,
      message: `Product "${deletedProduct.name}" deleted successfully from SmartSell!` 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sales routes
app.get('/api/sales/list', (req, res) => {
  try {
    const sales = readSales();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/sales/summary', (req, res) => {
  try {
    const sales = readSales();
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
    const totalItems = sales.reduce((sum, sale) => sum + sale.quantity, 0);
    const saleCount = sales.length;
    
    const today = new Date().toDateString();
    const todaySales = sales.filter(sale => 
      new Date(sale.timestamp).toDateString() === today
    );
    const todayRevenue = todaySales.reduce((sum, sale) => sum + sale.total, 0);
    const todayItems = todaySales.reduce((sum, sale) => sum + sale.quantity, 0);
    
    res.json({
      total: { totalRevenue, totalItems, saleCount },
      today: { todayRevenue, todayItems }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/sales/add', (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const products = readProducts();
    const product = products.find(p => p._id === productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    if (product.stock < quantity) {
      return res.status(400).json({ 
        error: `Not enough stock. Available: ${product.stock}, Requested: ${quantity}` 
      });
    }
    
    const total = product.price * quantity;
    const sale = {
      _id: Date.now().toString(),
      productId: product._id,
      productName: product.name,
      quantity,
      price: product.price,
      total,
      timestamp: new Date().toISOString()
    };
    
    // Update stock
    product.stock -= quantity;
    
    // Save both sale and updated product
    const sales = readSales();
    sales.unshift(sale); // Add to beginning
    writeSales(sales);
    writeProducts(products);
    
    res.json({
      success: true,
      sale,
      updatedStock: product.stock,
      message: `SmartSell: ${quantity} ${product.name} sold for $${total}`
    });
    
  } catch (err) {
    console.error('Sale error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SmartSell backend is running!' });
});

// Root route
app.get('/', (req, res) => {
  res.send('SmartSell Backend API - Business Dashboard');
});

const PORT = process.env.PORT || 5000;

// Improved server startup with error handling
const server = app.listen(PORT, () => {
  console.log(`🚀 SmartSell Backend running on port ${PORT}`);
  console.log(`📊 API available at: http://localhost:${PORT}`);
  console.log(`🔗 Frontend should connect to: http://localhost:${PORT}`);
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.log(`❌ Port ${PORT} is already in use. Trying port ${PORT + 1}...`);
    const newServer = app.listen(PORT + 1, () => {
      console.log(`🚀 SmartSell Backend running on port ${PORT + 1}`);
      console.log(`📊 API available at: http://localhost:${PORT + 1}`);
    });
  } else {
    console.error('Server error:', error);
  }
});
