const fs = require('fs');
const path = require('path');

// Data file paths
const PRODUCTS_FILE = path.join(__dirname, 'bizboard-backend', 'data', 'products.json');
const SALES_FILE = path.join(__dirname, 'bizboard-backend', 'data', 'sales.json');

console.log('🔍 SmartSell Data Checker\n');

// Check if data directory exists
const dataDir = path.join(__dirname, 'bizboard-backend', 'data');
if (!fs.existsSync(dataDir)) {
  console.log('❌ Data directory not found. Creating it...');
  fs.mkdirSync(dataDir, { recursive: true });
}

// Check Products
console.log('📦 PRODUCTS DATA:');
if (fs.existsSync(PRODUCTS_FILE)) {
  try {
    const productsData = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    const products = JSON.parse(productsData);
    
    if (products.length === 0) {
      console.log('   No products found. Add some products through the web interface!');
    } else {
      console.log(`   Found ${products.length} products:`);
      products.forEach((product, index) => {
        console.log(`   ${index + 1}. ${product.emoji} ${product.name}`);
        console.log(`      Price: $${product.price.toFixed(2)} | Stock: ${product.stock} units`);
        console.log(`      Value: $${(product.price * product.stock).toFixed(2)}`);
        console.log('');
      });
    }
  } catch (error) {
    console.log('   Error reading products file:', error.message);
  }
} else {
  console.log('   No products file found. Add products through the web interface!');
}

console.log('💰 SALES DATA:');
if (fs.existsSync(SALES_FILE)) {
  try {
    const salesData = fs.readFileSync(SALES_FILE, 'utf8');
    const sales = JSON.parse(salesData);
    
    if (sales.length === 0) {
      console.log('   No sales found. Record some sales through the web interface!');
    } else {
      console.log(`   Found ${sales.length} sales:`);
      
      // Calculate totals
      const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
      const totalItems = sales.reduce((sum, sale) => sum + sale.quantity, 0);
      
      console.log(`   Total Revenue: $${totalRevenue.toFixed(2)}`);
      console.log(`   Total Items Sold: ${totalItems}`);
      console.log('');
      
      // Show recent sales
      const recentSales = sales.slice(0, 5);
      console.log('   Recent Sales:');
      recentSales.forEach((sale, index) => {
        const date = new Date(sale.timestamp).toLocaleString();
        console.log(`   ${index + 1}. ${sale.productName} - ${sale.quantity}x @ $${sale.price} = $${sale.total}`);
        console.log(`      Date: ${date}`);
        console.log('');
      });
    }
  } catch (error) {
    console.log('   Error reading sales file:', error.message);
  }
} else {
  console.log('   No sales file found. Record sales through the web interface!');
}

console.log('📊 SUMMARY:');
console.log('   To add data:');
console.log('   1. Start your application: double-click start-app.bat');
console.log('   2. Go to Products tab to add products');
console.log('   3. Go to Sales Entry tab to record sales');
console.log('   4. View analytics in Dashboard tab');
console.log('');
console.log('   API Endpoints (when backend is running):');
console.log('   - http://localhost:5000/api/products/list');
console.log('   - http://localhost:5000/api/sales/list');
console.log('   - http://localhost:5000/api/sales/summary'); 