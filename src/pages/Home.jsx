import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { FaArrowRight, FaTshirt, FaFemale, FaChild } from 'react-icons/fa';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setFeaturedProducts(response.data.slice(0, 8)); // Show first 8 products
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    {
      name: "Men's Fashion",
      icon: <FaTshirt />,
      path: "/products/men",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
      description: "Trendy clothing for men"
    },
    {
      name: "Women's Fashion",
      icon: <FaFemale />,
      path: "/products/women",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400",
      description: "Elegant fashion for women"
    },
    {
      name: "Kids' Fashion",
      icon: <FaChild />,
      path: "/products/kids",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400",
      description: "Adorable clothing for kids"
    }
  ];

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div className="container">
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              Discover Your Style
            </h1>
            <p style={styles.heroSubtitle}>
              Shop the latest trends in fashion with unbeatable prices and quality
            </p>
            <Link to="/products" style={styles.heroButton}>
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={styles.categoriesSection}>
        <div className="container">
          <h2 style={styles.sectionTitle}>Shop by Category</h2>
          <div style={styles.categoriesGrid}>
            {categories.map((category) => (
              <Link key={category.name} to={category.path} style={styles.categoryCard}>
                <div style={styles.categoryImageContainer}>
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    style={styles.categoryImage}
                  />
                  <div style={styles.categoryOverlay}>
                    <div style={styles.categoryIcon}>{category.icon}</div>
                  </div>
                </div>
                <div style={styles.categoryContent}>
                  <h3 style={styles.categoryTitle}>{category.name}</h3>
                  <p style={styles.categoryDescription}>{category.description}</p>
                  <span style={styles.categoryLink}>
                    Explore <FaArrowRight style={styles.arrowIcon} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={styles.productsSection}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Featured Products</h2>
            <Link to="/products" style={styles.viewAllLink}>
              View All <FaArrowRight style={styles.arrowIcon} />
            </Link>
          </div>
          
          <div style={styles.productsGrid}>
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <div className="container">
          <div style={styles.featuresGrid}>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>🚚</div>
              <h3 style={styles.featureTitle}>Free Shipping</h3>
              <p style={styles.featureDescription}>
                Free delivery on orders above ₹499
              </p>
            </div>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>🔄</div>
              <h3 style={styles.featureTitle}>Easy Returns</h3>
              <p style={styles.featureDescription}>
                30-day return policy for all products
              </p>
            </div>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>🛡️</div>
              <h3 style={styles.featureTitle}>Secure Payment</h3>
              <p style={styles.featureDescription}>
                100% secure payment processing
              </p>
            </div>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>📞</div>
              <h3 style={styles.featureTitle}>24/7 Support</h3>
              <p style={styles.featureDescription}>
                Round the clock customer support
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
    gap: '16px'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #2874f0',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  hero: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '80px 0',
    color: 'white',
    textAlign: 'center'
  },
  heroContent: {
    maxWidth: '600px',
    margin: '0 auto'
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: '700',
    marginBottom: '16px',
    lineHeight: '1.2'
  },
  heroSubtitle: {
    fontSize: '18px',
    marginBottom: '32px',
    opacity: '0.9',
    lineHeight: '1.6'
  },
  heroButton: {
    display: 'inline-block',
    background: '#fb641b',
    color: 'white',
    padding: '16px 32px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.2s'
  },
  categoriesSection: {
    padding: '80px 0',
    backgroundColor: '#f8f9fa'
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '48px',
    color: '#212121'
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px'
  },
  categoryCard: {
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    textDecoration: 'none',
    color: 'inherit'
  },
  categoryImageContainer: {
    position: 'relative',
    height: '200px',
    overflow: 'hidden'
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.2s'
  },
  categoryOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(40, 116, 240, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryIcon: {
    fontSize: '48px',
    color: '#2874f0'
  },
  categoryContent: {
    padding: '24px'
  },
  categoryTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#212121'
  },
  categoryDescription: {
    fontSize: '14px',
    color: '#878787',
    marginBottom: '16px'
  },
  categoryLink: {
    color: '#2874f0',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  arrowIcon: {
    fontSize: '12px'
  },
  productsSection: {
    padding: '80px 0'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px'
  },
  viewAllLink: {
    color: '#2874f0',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '24px'
  },
  featuresSection: {
    padding: '80px 0',
    backgroundColor: '#f8f9fa'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '32px'
  },
  feature: {
    textAlign: 'center',
    padding: '32px 16px'
  },
  featureIcon: {
    fontSize: '48px',
    marginBottom: '16px'
  },
  featureTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#212121'
  },
  featureDescription: {
    fontSize: '14px',
    color: '#878787',
    lineHeight: '1.5'
  }
};

export default Home;
