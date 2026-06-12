const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/products', require('./routes/products'));

// Health check
app.get('/', (req, res) => res.json({ message: 'API v1 is running ✅' }));

// 404 handler
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
