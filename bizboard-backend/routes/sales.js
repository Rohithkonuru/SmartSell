const express = require('express');
const router = express.Router();
const Sale = require('../models/sale');
const Product = require('../models/product');

// Add a new sale and update stock
router.post('/add', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Check if enough stock is available
    if (product.stock < quantity) {
      return res.status(400).json({ 
        error: `Not enough stock. Available: ${product.stock}, Requested: ${quantity}` 
      });
    }
    
    // Calculate total
    const total = product.price * quantity;
    
    // Create the sale
    const sale = new Sale({
      productId: product._id,
      productName: product.name,
      quantity,
      price: product.price,
      total
    });
    
    // Update stock
    product.stock -= quantity;
    
    // Save both sale and updated product
    await Promise.all([sale.save(), product.save()]);
    
    res.json({
      success: true,
      sale,
      updatedStock: product.stock,
      message: `Sale recorded! ${quantity} ${product.name} sold for $${total}`
    });
    
  } catch (err) {
    console.error('Sale error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get all sales
router.get('/list', async (req, res) => {
  try {
    const sales = await Sale.find().sort({ timestamp: -1 });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get sales summary (for dashboard)
router.get('/summary', async (req, res) => {
  try {
    const totalSales = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$total' },
          totalItems: { $sum: '$quantity' },
          saleCount: { $sum: 1 }
        }
      }
    ]);
    
    const todaySales = await Sale.aggregate([
      {
        $match: {
          timestamp: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      },
      {
        $group: {
          _id: null,
          todayRevenue: { $sum: '$total' },
          todayItems: { $sum: '$quantity' }
        }
      }
    ]);
    
    res.json({
      total: totalSales[0] || { totalRevenue: 0, totalItems: 0, saleCount: 0 },
      today: todaySales[0] || { todayRevenue: 0, todayItems: 0 }
    });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 