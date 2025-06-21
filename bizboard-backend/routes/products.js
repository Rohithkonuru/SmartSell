const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Add a new product
router.post('/add', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json({
      success: true,
      product: newProduct,
      message: `Product "${newProduct.name}" added successfully!`
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all products
router.get('/list', async (req, res) => {
  try {
    const products = await Product.find().sort({ name: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get low stock products (stock <= 5)
router.get('/low-stock', async (req, res) => {
  try {
    const lowStockProducts = await Product.find({ stock: { $lte: 5 } }).sort({ stock: 1 });
    res.json(lowStockProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update stock (add or remove)
router.put('/:id/stock', async (req, res) => {
  try {
    const { action, quantity } = req.body; // action: 'add' or 'remove'
    const product = await Product.findById(req.params.id);
    
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
    
    await product.save();
    
    res.json({
      success: true,
      product,
      message: `${action === 'add' ? 'Added' : 'Removed'} ${quantity} items. New stock: ${product.stock}`
    });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({
      success: true,
      product,
      message: `Product "${product.name}" updated successfully!`
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ 
      success: true,
      message: `Product "${product.name}" deleted successfully!` 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

