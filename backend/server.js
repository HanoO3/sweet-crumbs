const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://nasirhana3_db_user:K0wfXlQgZBMSXNDh@sweet-crumbs-cluster.kp0s8fx.mongodb.net/sweetcrumbs?retryWrites=true&w=majority';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

app.use(cors());
app.use(express.json());

// Ensure MongoDB is connected before serving any API routes
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
    try {
      await connectDB();
    } catch (err) {
      return res.status(500).json({ message: 'Database connection error: ' + err.message });
    }
  }
  next();
});

app.get('/', (req, res) => {
  res.send('Sweet Crumbs API is running...');
});

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

// Catch unmatched /api and /uploads requests with a proper 404 JSON response
app.all(['/api/{*path}', '/uploads/{*path}'], (req, res) => {
  res.status(404).json({ message: 'Requested API endpoint or upload resource not found' });
});

const frontendDistPath = path.join(__dirname, '..', 'frontend', 'dist');
const frontendRootPath = path.join(__dirname, '..', 'frontend');

if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
}

app.use((req, res, next) => {
  if (/\.(js|css|png|jpg|jpeg|gif|ico|svg|json|woff2?|map)$/i.test(req.path)) {
    return res.status(404).send('Asset not found');
  }

  const indexPath = path.join(frontendDistPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }

  if (fs.existsSync(path.join(frontendRootPath, 'index.html'))) {
    return res.sendFile(path.join(frontendRootPath, 'index.html'));
  }

  next();
});

// Centralized Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;