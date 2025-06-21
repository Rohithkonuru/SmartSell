const axios = require('axios');

async function testBackend() {
  try {
    console.log('Testing backend connection...');
    
    // Test health endpoint
    const healthResponse = await axios.get('http://localhost:5000/api/health');
    console.log('✅ Health check passed:', healthResponse.data);
    
    // Test products endpoint
    const productsResponse = await axios.get('http://localhost:5000/api/products/list');
    console.log('✅ Products endpoint working:', productsResponse.data);
    
    // Test adding a product
    const newProduct = {
      name: 'Test Product',
      stock: 10,
      price: 25.99
    };
    
    const addResponse = await axios.post('http://localhost:5000/api/products/add', newProduct);
    console.log('✅ Product added successfully:', addResponse.data);
    
  } catch (error) {
    console.error('❌ Backend test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testBackend(); 