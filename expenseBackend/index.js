const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const authMiddleware = require('./src/middleware/auth');

const app = express();
const PORT = 3001;

// IMPORTANT: Order matters - put these FIRST
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const url = process.env.MONGODB_URI;
mongoose.set('strictQuery', false);
mongoose
  .connect(url, { family: 4 })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


// Import models and routes
const transactionRoutes = require('./src/routes/transactions');
const categoryRoutes = require('./src/routes/categories');
const authRoutes = require('./src/routes/auth');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount auth routes FIRST
app.use('/api/auth', authRoutes);
app.use('/api', transactionRoutes);
app.use('/api', categoryRoutes);
// Profile route (protected)
app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Success!',
    user: req.user,
  });
});

// Dashboard route (protected)
app.get('/api/dashboard', authMiddleware, (req, res) => {
  res.json({
    message: 'Welcome to your dashboard',
    user: req.user,
  });
});
// Test route to verify server is working
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working' });
});




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
