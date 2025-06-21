const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up SmartSell Business Dashboard...\n');

// Check if Node.js is installed
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' });
  console.log(`✅ Node.js version: ${nodeVersion.trim()}`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js first.');
  process.exit(1);
}

// Setup Backend
console.log('\n📦 Setting up Backend...');
try {
  // Install backend dependencies
  console.log('Installing backend dependencies...');
  execSync('npm install', { cwd: './bizboard-backend', stdio: 'inherit' });
  
  // Check if .env file exists
  const envPath = path.join('./bizboard-backend', '.env');
  if (!fs.existsSync(envPath)) {
    console.log('Creating .env file for backend...');
    const envContent = `MONGO_URI=mongodb://localhost:27017/bizboard
PORT=5000`;
    fs.writeFileSync(envPath, envContent);
  }
  
  console.log('✅ Backend setup complete!');
} catch (error) {
  console.error('❌ Backend setup failed:', error.message);
}

// Setup Frontend
console.log('\n📦 Setting up Frontend...');
try {
  // Install frontend dependencies
  console.log('Installing frontend dependencies...');
  execSync('npm install', { cwd: './remote-sync-works-main/remote-sync-works-main', stdio: 'inherit' });
  
  console.log('✅ Frontend setup complete!');
} catch (error) {
  console.error('❌ Frontend setup failed:', error.message);
}

console.log('\n🎉 Setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Start MongoDB (if using local MongoDB)');
console.log('2. Start the backend: cd bizboard-backend && npm run dev');
console.log('3. Start the frontend: cd remote-sync-works-main/remote-sync-works-main && npm run dev');
console.log('\n🌐 The application will be available at:');
console.log('   - Frontend: http://localhost:5173');
console.log('   - Backend API: http://localhost:5000'); 