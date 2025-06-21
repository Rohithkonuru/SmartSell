# SmartSell Full-Stack Setup Guide

This guide will help you set up and run both the frontend and backend of the SmartSell application.

## Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

## Project Structure

```
remote-sync-works-main/
├── remote-sync-works-main/     # Frontend (React)
│   ├── src/
│   ├── package.json
│   └── ...
└── backend/                    # Backend (Node.js/Express)
    ├── server.js
    ├── package.json
    └── ...
```

## Step 1: Setup Backend

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   Create a `.env` file in the backend directory:
   ```
   PORT=5000
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   🚀 SmartSell API server running on port 5000
   📊 Health check: http://localhost:5000/api/health
   ```

## Step 2: Setup Frontend

1. **Open a new terminal and navigate to frontend directory:**
   ```bash
   cd remote-sync-works-main/remote-sync-works-main
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   Local:   http://localhost:5173/
   Network: http://192.168.x.x:5173/
   ```

## Step 3: Test the Application

1. **Open your browser** and go to `http://localhost:5173`

2. **Login with the demo account:**
   - Email: `owner@smartsell.com`
   - Password: `password`

3. **Test the features:**
   - ✅ Login/Registration
   - ✅ Sales Entry (create and view sales)
   - ✅ File Upload (upload bank statements)
   - ✅ Dashboard Analytics
   - ✅ Task Management

## API Endpoints

The backend provides these endpoints:

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register

### Sales
- `GET /api/sales` - Get all sales
- `POST /api/sales` - Create new sale

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard data

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task status

### File Upload
- `POST /api/upload/statement` - Upload bank statement

### Health Check
- `GET /api/health` - Server status

## Troubleshooting

### Backend Issues

1. **Port already in use:**
   ```bash
   # Change port in .env file
   PORT=5001
   ```

2. **Dependencies not installed:**
   ```bash
   cd backend
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Permission errors:**
   ```bash
   # On Windows, run PowerShell as Administrator
   # On Mac/Linux, use sudo if needed
   ```

### Frontend Issues

1. **API connection errors:**
   - Ensure backend is running on port 5000
   - Check browser console for CORS errors
   - Verify API_BASE_URL in `src/lib/api.ts`

2. **Build errors:**
   ```bash
   cd remote-sync-works-main/remote-sync-works-main
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript errors:**
   - These are likely due to missing type declarations
   - The app should still run despite these warnings

## Development Workflow

1. **Backend changes:** The server will auto-reload with nodemon
2. **Frontend changes:** Vite will hot-reload the browser
3. **API changes:** Restart the backend server

## Production Deployment

For production, consider:

1. **Database:** Replace in-memory storage with PostgreSQL/MongoDB
2. **Environment:** Set proper JWT_SECRET and NODE_ENV
3. **HTTPS:** Enable SSL certificates
4. **Rate Limiting:** Add API rate limiting
5. **Logging:** Implement proper error logging

## Default Data

The backend comes with sample data:
- **User:** owner@smartsell.com / password
- **Sales:** 3 sample sales records
- **Tasks:** 3 sample tasks

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check the backend terminal for server errors
3. Verify both servers are running on correct ports
4. Ensure all dependencies are installed 