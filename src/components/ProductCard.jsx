import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <Link to={`/product/${product._id}`} style={styles.link}>
      <div className="product-card" style={styles.card}>
        <div style={styles.imageContainer}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-image"
            style={styles.image}
          />
          <button style={styles.wishlistBtn}>
            <FaHeart />
          </button>
        </div>
        
        <div style={styles.content}>
          <h3 style={styles.title}>{product.name}</h3>
          
          <div style={styles.ratingContainer}>
            <div style={styles.rating}>
              <span style={styles.ratingText}>{product.rating}</span>
              <FaStar style={styles.star} />
            </div>
            <span style={styles.reviews}>({product.reviews})</span>
          </div>
          
          <div style={styles.priceContainer}>
            <span className="price" style={styles.price}>₹{product.price}</span>
            <span className="original-price" style={styles.originalPrice}>
              ₹{product.originalPrice}
            </span>
            <span className="discount" style={styles.discount}>
              {discount}% off
            </span>
          </div>
          
          <p style={styles.description}>{product.description}</p>
          
          {!product.inStock && (
            <div style={styles.outOfStock}>
              <span>Out of Stock</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

const styles = {
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative'
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    transition: 'transform 0.2s ease'
  },
  wishlistBtn: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    background: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    color: '#666',
    transition: 'all 0.2s ease'
  },
  content: {
    padding: '12px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#212121',
    marginBottom: '8px',
    lineHeight: '1.3',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginBottom: '8px'
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    backgroundColor: '#388e3c',
    color: 'white',
    padding: '2px 6px',
    borderRadius: '3px',
    fontSize: '12px',
    fontWeight: '500'
  },
  ratingText: {
    fontSize: '12px'
  },
  star: {
    fontSize: '10px'
  },
  reviews: {
    fontSize: '12px',
    color: '#878787'
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
    flexWrap: 'wrap'
  },
  price: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#212121'
  },
  originalPrice: {
    fontSize: '14px',
    color: '#878787',
    textDecoration: 'line-through'
  },
  discount: {
    fontSize: '12px',
    color: '#388e3c',
    fontWeight: '500'
  },
  description: {
    fontSize: '12px',
    color: '#878787',
    lineHeight: '1.4',
    marginTop: 'auto',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  outOfStock: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(0,0,0,0.7)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500'
  }
};

export default ProductCard;
