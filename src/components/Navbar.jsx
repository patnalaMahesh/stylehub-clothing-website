import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const categories = [
    { name: 'Men', path: '/products/men' },
    { name: 'Women', path: '/products/women' },
    { name: 'Kids', path: '/products/kids' }
  ];

  return (
    <nav style={styles.navbar}>
      <div className="container" style={styles.container}>
        {/* Logo */}
        <Link to="/" style={styles.logo}>
          <span style={styles.logoText}>StyleHub</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            <button type="submit" style={styles.searchButton}>
              <FaSearch />
            </button>
          </div>
        </form>

        {/* Desktop Navigation */}
        <div style={styles.desktopNav}>
          {/* Categories */}
          <div style={styles.categories}>
            {categories.map((category) => (
              <Link key={category.name} to={category.path} style={styles.categoryLink}>
                {category.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div style={styles.authSection}>
            {isAuthenticated ? (
              <div style={styles.userSection}>
                <Link to="/profile" style={styles.userLink}>
                  <FaUser style={styles.userIcon} />
                  <span>{user?.name}</span>
                </Link>
                <button onClick={handleLogout} style={styles.logoutBtn}>
                  Logout
                </button>
              </div>
            ) : (
              <div style={styles.authButtons}>
                <Link to="/login" style={styles.loginBtn}>
                  Login
                </Link>
                <Link to="/register" style={styles.registerBtn}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={styles.mobileMenuBtn}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={styles.mobileMenu}>
          <div style={styles.mobileCategories}>
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                style={styles.mobileCategoryLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </div>
          {isAuthenticated ? (
            <div style={styles.mobileAuth}>
              <Link
                to="/profile"
                style={styles.mobileAuthLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                style={styles.mobileLogoutBtn}
              >
                Logout
              </button>
            </div>
          ) : (
            <div style={styles.mobileAuth}>
              <Link
                to="/login"
                style={styles.mobileAuthLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={styles.mobileAuthLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#2874f0',
    padding: '12px 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    position: 'relative'
  },
  logo: {
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '24px',
    minWidth: '120px'
  },
  logoText: {
    color: 'white'
  },
  searchForm: {
    flex: 1,
    maxWidth: '500px'
  },
  searchContainer: {
    display: 'flex',
    position: 'relative'
  },
  searchInput: {
    width: '100%',
    padding: '10px 40px 10px 16px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    outline: 'none'
  },
  searchButton: {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#2874f0',
    cursor: 'pointer',
    padding: '4px'
  },
  desktopNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  categories: {
    display: 'flex',
    gap: '16px'
  },
  categoryLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'background-color 0.2s'
  },
  authSection: {
    display: 'flex',
    alignItems: 'center'
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  userLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '14px'
  },
  userIcon: {
    fontSize: '16px'
  },
  logoutBtn: {
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.3)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s'
  },
  authButtons: {
    display: 'flex',
    gap: '12px'
  },
  loginBtn: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'background-color 0.2s'
  },
  registerBtn: {
    background: 'white',
    color: '#2874f0',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'background-color 0.2s'
  },
  mobileMenuBtn: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '4px'
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '16px',
    zIndex: 1001
  },
  mobileCategories: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '16px'
  },
  mobileCategoryLink: {
    color: '#212121',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '8px 0',
    borderBottom: '1px solid #f0f0f0'
  },
  mobileAuth: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  mobileAuthLink: {
    color: '#2874f0',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '8px 0'
  },
  mobileLogoutBtn: {
    background: 'none',
    border: 'none',
    color: '#ff4444',
    fontSize: '16px',
    padding: '8px 0',
    textAlign: 'left',
    cursor: 'pointer'
  }
};

export default Navbar;
