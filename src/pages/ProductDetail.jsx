import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaHeart, FaShare, FaTruck, FaUndo, FaShieldAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/products`);
        const foundProduct = response.data.find(p => p._id === id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          toast.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Error loading product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const discount = product ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    toast.success('Added to cart!');
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    toast.success('Redirecting to checkout...');
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={styles.errorContainer}>
        <h2>Product not found</h2>
        <p>The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div className="container">
        <div style={styles.content}>
          {/* Product Images */}
          <div style={styles.imageSection}>
            <div style={styles.mainImage}>
              <img 
                src={product.image} 
                alt={product.name} 
                style={styles.productImage}
              />
              <button style={styles.wishlistBtn}>
                <FaHeart />
              </button>
              <button style={styles.shareBtn}>
                <FaShare />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div style={styles.infoSection}>
            <h1 style={styles.productName}>{product.name}</h1>
            
            {/* Rating */}
            <div style={styles.ratingSection}>
              <div style={styles.rating}>
                <span style={styles.ratingText}>{product.rating}</span>
                <FaStar style={styles.star} />
              </div>
              <span style={styles.reviews}>({product.reviews} ratings & reviews)</span>
            </div>

            {/* Price */}
            <div style={styles.priceSection}>
              <span style={styles.currentPrice}>₹{product.price}</span>
              <span style={styles.originalPrice}>₹{product.originalPrice}</span>
              <span style={styles.discount}>{discount}% off</span>
            </div>

            {/* Description */}
            <div style={styles.descriptionSection}>
              <h3 style={styles.sectionTitle}>Description</h3>
              <p style={styles.description}>{product.description}</p>
            </div>

            {/* Size Selection */}
            <div style={styles.sizeSection}>
              <h3 style={styles.sectionTitle}>Select Size</h3>
              <div style={styles.sizeOptions}>
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      ...styles.sizeButton,
                      ...(selectedSize === size && styles.selectedSize)
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div style={styles.quantitySection}>
              <h3 style={styles.sectionTitle}>Quantity</h3>
              <div style={styles.quantitySelector}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={styles.quantityBtn}
                >
                  -
                </button>
                <span style={styles.quantity}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={styles.quantityBtn}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={styles.actionButtons}>
              <button
                onClick={handleAddToCart}
                className="btn btn-outline"
                style={styles.addToCartBtn}
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="btn btn-secondary"
                style={styles.buyNowBtn}
              >
                Buy Now
              </button>
            </div>

            {/* Features */}
            <div style={styles.featuresSection}>
              <div style={styles.feature}>
                <FaTruck style={styles.featureIcon} />
                <div>
                  <h4 style={styles.featureTitle}>Free Delivery</h4>
                  <p style={styles.featureText}>Free delivery on orders above ₹499</p>
                </div>
              </div>
              <div style={styles.feature}>
                <FaUndo style={styles.featureIcon} />
                <div>
                  <h4 style={styles.featureTitle}>Easy Returns</h4>
                  <p style={styles.featureText}>30-day return policy</p>
                </div>
              </div>
              <div style={styles.feature}>
                <FaShieldAlt style={styles.featureIcon} />
                <div>
                  <h4 style={styles.featureTitle}>Secure Payment</h4>
                  <p style={styles.featureText}>100% secure payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f1f3f6',
    padding: '24px 0'
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
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
    textAlign: 'center'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    alignItems: 'start'
  },
  imageSection: {
    background: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
  },
  mainImage: {
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  productImage: {
    width: '100%',
    height: '500px',
    objectFit: 'cover'
  },
  wishlistBtn: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    color: '#666'
  },
  shareBtn: {
    position: 'absolute',
    top: '16px',
    right: '64px',
    background: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    color: '#666'
  },
  infoSection: {
    background: 'white',
    borderRadius: '8px',
    padding: '32px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
  },
  productName: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#212121',
    marginBottom: '16px',
    lineHeight: '1.3'
  },
  ratingSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px'
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: '#388e3c',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500'
  },
  ratingText: {
    fontSize: '14px'
  },
  star: {
    fontSize: '12px'
  },
  reviews: {
    fontSize: '14px',
    color: '#878787'
  },
  priceSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px'
  },
  currentPrice: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#212121'
  },
  originalPrice: {
    fontSize: '18px',
    color: '#878787',
    textDecoration: 'line-through'
  },
  discount: {
    fontSize: '16px',
    color: '#388e3c',
    fontWeight: '500'
  },
  descriptionSection: {
    marginBottom: '24px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#212121',
    marginBottom: '12px'
  },
  description: {
    fontSize: '14px',
    color: '#878787',
    lineHeight: '1.6'
  },
  sizeSection: {
    marginBottom: '24px'
  },
  sizeOptions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  sizeButton: {
    padding: '12px 20px',
    border: '1px solid #dbdbdb',
    background: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s'
  },
  selectedSize: {
    borderColor: '#2874f0',
    color: '#2874f0',
    backgroundColor: '#f0f8ff'
  },
  quantitySection: {
    marginBottom: '24px'
  },
  quantitySelector: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  quantityBtn: {
    width: '36px',
    height: '36px',
    border: '1px solid #dbdbdb',
    background: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600'
  },
  quantity: {
    fontSize: '16px',
    fontWeight: '500',
    minWidth: '40px',
    textAlign: 'center'
  },
  actionButtons: {
    display: 'flex',
    gap: '16px',
    marginBottom: '32px'
  },
  addToCartBtn: {
    flex: 1,
    padding: '16px',
    fontSize: '16px',
    fontWeight: '500'
  },
  buyNowBtn: {
    flex: 1,
    padding: '16px',
    fontSize: '16px',
    fontWeight: '500'
  },
  featuresSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  featureIcon: {
    fontSize: '20px',
    color: '#2874f0',
    minWidth: '20px'
  },
  featureTitle: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#212121',
    margin: 0
  },
  featureText: {
    fontSize: '12px',
    color: '#878787',
    margin: 0
  }
};

export default ProductDetail;
