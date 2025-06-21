import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// In-memory storage (replace with database in production)
let users = [
  {
    id: '1',
    name: 'Business Owner',
    email: 'owner@smartsell.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    businessName: 'Sweet Treats Bakery'
  }
];

let sales = [
  { id: '1', product: 'Chocolate Cake', quantity: 5, price: 30, total: 150, timestamp: '2024-01-15T10:30:00Z' },
  { id: '2', product: 'Croissant', quantity: 10, price: 15, total: 150, timestamp: '2024-01-15T11:00:00Z' },
  { id: '3', product: 'Blueberry Muffin', quantity: 8, price: 15, total: 120, timestamp: '2024-01-15T12:00:00Z' }
];

let tasks = [
  {
    id: '1',
    title: 'Design new user interface',
    description: 'Create mockups for the dashboard redesign',
    assignee: 'Alice Johnson',
    dueDate: '2024-12-25',
    status: 'todo',
    points: 150
  },
  {
    id: '2',
    title: 'Implement authentication',
    description: 'Set up user login and registration system',
    assignee: 'Bob Smith',
    dueDate: '2024-12-23',
    status: 'inprogress',
    points: 200
  },
  {
    id: '3',
    title: 'Write documentation',
    description: 'Document the API endpoints and usage',
    assignee: 'Carol Davis',
    dueDate: '2024-12-20',
    status: 'done',
    points: 100
  }
];

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|csv|xlsx|xls/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF, CSV, and Excel files are allowed'));
    }
  }
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SmartSell API is running' });
});

// Authentication routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, businessName } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      businessName
    };

    users.push(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        businessName: newUser.businessName
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        businessName: user.businessName
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Sales routes
app.get('/api/sales', authenticateToken, (req, res) => {
  res.json(sales);
});

app.post('/api/sales', authenticateToken, (req, res) => {
  try {
    const { product, quantity, price } = req.body;
    const total = quantity * price;

    const newSale = {
      id: uuidv4(),
      product,
      quantity,
      price,
      total,
      timestamp: new Date().toISOString()
    };

    sales.push(newSale);
    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Analytics routes
app.get('/api/analytics/dashboard', authenticateToken, (req, res) => {
  const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalTransactions = sales.length;
  const avgTransaction = totalSales / totalTransactions || 0;

  // Calculate weekly sales (last 7 days)
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const weeklySales = sales.filter(sale => 
    new Date(sale.timestamp) >= oneWeekAgo
  ).reduce((sum, sale) => sum + sale.total, 0);

  res.json({
    totalSales,
    totalTransactions,
    avgTransaction: Math.round(avgTransaction * 100) / 100,
    weeklySales,
    recentSales: sales.slice(-5).reverse()
  });
});

// Tasks routes
app.get('/api/tasks', authenticateToken, (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', authenticateToken, (req, res) => {
  try {
    const { title, description, assignee, dueDate, points } = req.body;

    const newTask = {
      id: uuidv4(),
      title,
      description,
      assignee,
      dueDate,
      status: 'todo',
      points: parseInt(points) || 0
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/tasks/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    tasks[taskIndex].status = status;
    res.json(tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// File upload route
app.post('/api/upload/statement', authenticateToken, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Simulate processing time
    setTimeout(() => {
      res.json({
        message: 'File uploaded and processed successfully',
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        processedAt: new Date().toISOString()
      });
    }, 2000);
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({ error: 'File upload error' });
  }
  
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SmartSell API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
}); 