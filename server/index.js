const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://your-username:your-password@your-cluster.mongodb.net/clothing-business?retryWrites=true&w=majority';

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'clothing-business',
  serverSelectionTimeoutMS: 15000,
});

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 4.5 },
  reviews: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true }
});

const Product = mongoose.model('Product', productSchema);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Register User
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login User
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get User Profile
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get Products by Category
app.get('/api/products/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Seed Products (for initial data)
app.post('/api/seed-products', async (req, res) => {
  try {
    const products = [
      {
        name: "Men's Casual T-Shirt",
        price: 599,
        originalPrice: 999,
        category: "men",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
        description: "Comfortable cotton t-shirt for casual wear"
      },
      {
        name: "Women's Summer Dress",
        price: 1299,
        originalPrice: 1999,
        category: "women",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
        description: "Elegant summer dress perfect for any occasion"
      },
      {
        name: "Men's Formal Shirt",
        price: 899,
        originalPrice: 1499,
        category: "men",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
        description: "Professional formal shirt for office wear"
      },
      {
        name: "Women's Jeans",
        price: 799,
        originalPrice: 1299,
        category: "women",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
        description: "Stylish and comfortable jeans for everyday wear"
      },
      {
        name: "Kids' Hoodie",
        price: 499,
        originalPrice: 799,
        category: "kids",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
        description: "Warm and cozy hoodie for kids"
      },
      {
        name: "Men's Denim Jacket",
        price: 1499,
        originalPrice: 2499,
        category: "men",
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400",
        description: "Classic denim jacket for a stylish look"
      },
      {
        name: "Women's Blouse",
        price: 699,
        originalPrice: 1199,
        category: "women",
        image: "https://images.unsplash.com/photo-1564257631407-3deb25e9c8e0?w=400",
        description: "Elegant blouse for professional and casual wear"
      },
      {
        name: "Kids' T-Shirt",
        price: 299,
        originalPrice: 499,
        category: "kids",
        image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400",
        description: "Comfortable and colorful t-shirt for kids"
      }
    ];

    await Product.insertMany(products);
    res.json({ message: 'Products seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
