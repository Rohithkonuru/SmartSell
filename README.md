# SmartSell - Business Dashboard

A modern business dashboard for managing products, sales, and inventory with real-time updates.

## 🚀 Quick Start

### Option 1: Use the Batch File (Easiest)
1. Double-click `start-app.bat` in the root folder
2. Wait for both servers to start
3. The SmartSell dashboard will automatically open in your browser

### Option 2: Use PowerShell Script
1. Right-click `start-app.ps1` and select "Run with PowerShell"
2. Wait for both servers to start
3. The SmartSell dashboard will automatically open in your browser

### Option 3: Manual Start

#### Start Backend Server:
```powershell
cd bizboard-backend
npm install
npm start
```

#### Start Frontend Server (in a new terminal):
```powershell
cd remote-sync-works-main\remote-sync-works-main
npm run dev
```

## 🌐 Access Points

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5000

## ✨ Features

### Dashboard
- Real-time sales analytics
- Product inventory management
- Low stock alerts
- Revenue tracking

### Product Management
- Add new products
- Update stock levels
- Delete products
- View product details

### Sales Entry
- Record sales transactions
- Automatic stock deduction
- Sales history tracking
- Revenue calculation

### Data Storage
- Uses local JSON files (no database setup required)
- Data persists between sessions
- Automatic backup

## 📁 Project Structure

```
smartcell/
├── bizboard-backend/          # Backend API server
│   ├── index.js              # Main server file
│   ├── data/                 # JSON data storage
│   └── package.json          # Backend dependencies
├── remote-sync-works-main/
│   └── remote-sync-works-main/  # Frontend React app
│       ├── src/
│       │   ├── components/   # React components
│       │   └── lib/          # API utilities
│       └── package.json      # Frontend dependencies
├── start-app.bat             # Windows batch file
├── start-app.ps1             # PowerShell script
└── README.md                 # This file
```

## 🔧 Troubleshooting

### If servers don't start:
1. Make sure you have Node.js installed
2. Run `npm install` in both backend and frontend directories
3. Check if ports 5000 and 8080 are available

### If data doesn't update:
1. Refresh the browser page
2. Check browser console for errors
3. Verify both servers are running

### If you see "Cannot find module" errors:
1. Run `npm install` in the respective directory
2. Make sure you're in the correct directory when running commands

## 📝 API Endpoints

### Products
- `GET /api/products/list` - Get all products
- `GET /api/products/low-stock` - Get low stock products
- `POST /api/products/add` - Add new product
- `PUT /api/products/:id/stock` - Update stock
- `DELETE /api/products/:id` - Delete product

### Sales
- `GET /api/sales/list` - Get all sales
- `GET /api/sales/summary` - Get sales summary
- `POST /api/sales/add` - Record new sale

## 🎯 What's Working Now

✅ **Real-time data updates** - Products and sales update immediately  
✅ **No database setup required** - Uses local JSON files  
✅ **Stock management** - Automatic stock tracking  
✅ **Sales recording** - Complete sales workflow  
✅ **Dashboard analytics** - Real-time charts and metrics  
✅ **Product management** - Full CRUD operations  
✅ **SmartSell branding** - Consistent branding throughout  

## 🔗 Connection Flow

1. **Frontend** (React component) makes a request:
   ```javascript
   axios.get("http://localhost:5000/api/products/list")
   ```

2. **Backend** processes the request and returns data:
   ```javascript
   app.get('/api/products/list', (req, res) => {
     const products = readProducts();
     res.json(products);
   });
   ```

3. **Data flows**: JSON Files → Backend → Frontend → UI Display

Your SmartSell dashboard should now work perfectly! Add products, record sales, and see real-time updates in your dashboard. 