# StyleHub - Clothing Business Website

A modern e-commerce clothing website built with React, Node.js, and MongoDB Atlas. Features a Flipkart-inspired UI with user authentication, product catalog, and responsive design.

## 🚀 Deployment Guide

### Option 1: Vercel (Recommended - Free & Easy)

#### Frontend Deployment:
1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy Frontend:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Choose "Y" to link to existing project or create new
   - Set build command: `npm run build`
   - Set output directory: `dist`

#### Backend Deployment:
1. **Deploy Backend API:**
   ```bash
   cd server
   vercel
   ```

2. **Update Frontend API URL:**
   - After backend deployment, update the API base URL in your frontend code
   - Replace `http://localhost:5000` with your Vercel backend URL

### Option 2: Netlify (Frontend Only)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Drag and drop the `dist` folder to [Netlify](https://netlify.com)
   - Or use Netlify CLI: `netlify deploy`

### Option 3: Railway (Full Stack)

1. **Connect your GitHub repository to Railway**
2. **Set environment variables:**
   - `MONGODB_URI`
   - `JWT_SECRET`
3. **Deploy automatically**

### Option 4: Render (Full Stack)

1. **Create a new Web Service on Render**
2. **Connect your GitHub repository**
3. **Set build command:** `npm install && npm run build`
4. **Set start command:** `npm run server`
5. **Add environment variables**

## 🔧 Environment Variables

For production deployment, set these environment variables:

```env
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
```

## 📝 Pre-deployment Checklist

- [ ] Update MongoDB Atlas Network Access (add `0.0.0.0/0` for production)
- [ ] Set strong JWT_SECRET
- [ ] Test all features locally
- [ ] Build frontend successfully
- [ ] Update API URLs for production
- [ ] Configure CORS for production domains

## 🌐 Production URLs

After deployment, your website will be available at:
- **Frontend:** Your deployment platform URL
- **Backend API:** Your backend deployment URL

## 🔒 Security Considerations

1. **MongoDB Atlas:**
   - Use strong passwords
   - Configure IP whitelist properly
   - Enable database access controls

2. **Environment Variables:**
   - Never commit `.env` files
   - Use platform-specific environment variable settings
   - Rotate secrets regularly

3. **CORS Configuration:**
   - Update CORS settings for production domains
   - Remove development-only origins

## 📊 Monitoring

- Set up error tracking (Sentry, LogRocket)
- Monitor API performance
- Set up uptime monitoring
- Configure logging for production

## 🚀 Features

### Frontend Features
- **Modern React UI** with Flipkart-inspired design
- **Responsive Design** that works on all devices
- **User Authentication** with JWT tokens
- **Product Catalog** with filtering and search
- **Product Details** with size selection and quantity
- **User Profile** management
- **Real-time Search** functionality
- **Toast Notifications** for user feedback

### Backend Features
- **Express.js Server** with RESTful API
- **MongoDB Atlas** integration for data storage
- **JWT Authentication** with secure token management
- **Password Hashing** with bcrypt
- **User Registration & Login** system
- **Product Management** with categories
- **CORS Support** for cross-origin requests

### Design Features
- **Flipkart-inspired UI/UX** with familiar color scheme
- **Clean and Modern** interface
- **Smooth Animations** and transitions
- **Professional Typography** using Inter font
- **Consistent Design System** with CSS variables

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Hot Toast** - Toast notifications
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account

### 1. Clone the Repository
```bash
git clone <repository-url>
cd clothing_business
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/clothing-business?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 4. MongoDB Atlas Setup
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Replace the placeholder in `.env` file with your actual connection string

### 5. Seed Initial Data
```bash
# Start the server
npm run server

# In a new terminal, seed the products (optional)
curl -X POST http://localhost:5000/api/seed-products
```

### 6. Start Development Servers
```bash
# Start backend server (Terminal 1)
npm run server

# Start frontend development server (Terminal 2)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
clothing_business/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Navbar.jsx      # Navigation bar
│   │   ├── ProductCard.jsx # Product display card
│   │   └── LoadingSpinner.jsx
│   ├── contexts/           # React contexts
│   │   └── AuthContext.jsx # Authentication context
│   ├── pages/              # Page components
│   │   ├── Home.jsx        # Landing page
│   │   ├── Login.jsx       # Login page
│   │   ├── Register.jsx    # Registration page
│   │   ├── Products.jsx    # Product listing
│   │   ├── ProductDetail.jsx # Product details
│   │   └── Profile.jsx     # User profile
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # App entry point
│   └── index.css           # Global styles
├── server/
│   └── index.js            # Express server
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── index.html              # HTML template
└── README.md               # Project documentation
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start frontend development server
npm run server       # Start backend server
npm run build        # Build for production
npm run preview      # Preview production build

# Both servers (requires concurrently)
npm run dev:full     # Start both frontend and backend
```

## 🌟 Key Features Explained

### Authentication System
- Secure user registration and login
- JWT token-based authentication
- Protected routes and profile management
- Automatic token refresh

### Product Management
- Product catalog with categories (Men, Women, Kids)
- Advanced filtering and search
- Price range filtering
- Sorting by price, rating, and discount
- Product details with size selection

### User Experience
- Responsive design for all screen sizes
- Smooth animations and transitions
- Toast notifications for user feedback
- Loading states and error handling
- Intuitive navigation

## 🎨 Design System

### Color Palette
- **Primary Blue**: #2874f0 (Flipkart blue)
- **Secondary Orange**: #fb641b (Action buttons)
- **Success Green**: #388e3c (Ratings, discounts)
- **Text Primary**: #212121 (Main text)
- **Text Secondary**: #878787 (Secondary text)
- **Background**: #f1f3f6 (Page background)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700
- **Responsive**: Scales appropriately on all devices

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure authentication
- **Input Validation**: Form validation and sanitization
- **CORS Protection**: Configured for security
- **Environment Variables**: Sensitive data protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

## 🎯 Future Enhancements

- Shopping cart functionality
- Payment gateway integration
- Order management system
- Admin dashboard
- Product reviews and ratings
- Wishlist functionality
- Email notifications
- Advanced search filters
- Mobile app development

---

**Built with ❤️ for modern e-commerce**
