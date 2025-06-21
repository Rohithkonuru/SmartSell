# SmartSell Backend API

A Node.js/Express backend API for the SmartSell business dashboard application.

## Features

- **Authentication**: JWT-based login/registration
- **Sales Management**: CRUD operations for sales data
- **Analytics**: Dashboard analytics and reporting
- **Task Management**: Task board with status tracking
- **File Upload**: Bank statement upload and processing
- **CORS Enabled**: Cross-origin requests supported

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create environment file**:
   Create a `.env` file in the backend directory:
   ```
   PORT=5000
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

3. **Start the server**:
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Sales
- `GET /api/sales` - Get all sales (requires auth)
- `POST /api/sales` - Create new sale (requires auth)

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard analytics (requires auth)

### Tasks
- `GET /api/tasks` - Get all tasks (requires auth)
- `POST /api/tasks` - Create new task (requires auth)
- `PUT /api/tasks/:id` - Update task status (requires auth)

### File Upload
- `POST /api/upload/statement` - Upload bank statement (requires auth)

### Health Check
- `GET /api/health` - Server health check

## Default User

For testing, a default user is pre-configured:
- Email: `owner@smartsell.com`
- Password: `password`

## File Upload

The API supports uploading bank statements in the following formats:
- PDF files
- CSV files
- Excel files (.xlsx, .xls)

Uploaded files are stored in the `uploads/` directory.

## Security Notes

- JWT tokens expire after 24 hours
- Passwords are hashed using bcrypt
- CORS is enabled for frontend integration
- File uploads are validated for type and size

## Development

This backend uses in-memory storage for simplicity. For production, consider:
- Adding a database (PostgreSQL, MongoDB, etc.)
- Implementing proper error logging
- Adding rate limiting
- Setting up HTTPS
- Using environment-specific configurations 