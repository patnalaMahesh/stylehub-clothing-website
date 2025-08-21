import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { FaFilter, FaSort, FaSearch } from 'react-icons/fa';

const Products = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = '/api/products';
        if (category) {
          url = `/api/products/${category}`;
        }
        const response = await axios.get(url);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply price filter
    if (priceRange.min !== '') {
      filtered = filtered.filter(product => product.price >= parseInt(priceRange.min));
    }
    if (priceRange.max !== '') {
      filtered = filtered.filter(product => product.price <= parseInt(priceRange.max));
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        filtered.sort((a, b) => {
          const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100;
          const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100;
          return discountB - discountA;
        });
        break;
      default:
        // Keep original order for 'featured'
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, priceRange, sortBy]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePriceChange = (field, value) => {
    setPriceRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setPriceRange({ min: '', max: '' });
    setSortBy('featured');
  };

  const getCategoryTitle = () => {
    if (category) {
      return `${category.charAt(0).toUpperCase() + category.slice(1)}'s Fashion`;
    }
    return 'All Products';
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div className="container">
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>{getCategoryTitle()}</h1>
          <p style={styles.subtitle}>
            {filteredProducts.length} products found
          </p>
        </div>

        <div style={styles.content}>
          {/* Filters Sidebar */}
          <div style={styles.sidebar}>
            <div style={styles.filterSection}>
              <h3 style={styles.filterTitle}>
                <FaFilter style={styles.filterIcon} />
                Filters
              </h3>

              {/* Search */}
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Search</label>
                <div style={styles.searchContainer}>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearch}
                    style={styles.searchInput}
                  />
                  <FaSearch style={styles.searchIcon} />
                </div>
              </div>

              {/* Price Range */}
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Price Range</label>
                <div style={styles.priceInputs}>
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    style={styles.priceInput}
                  />
                  <span style={styles.priceSeparator}>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    style={styles.priceInput}
                  />
                </div>
              </div>

              {/* Sort */}
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>
                  <FaSort style={styles.filterIcon} />
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={styles.sortSelect}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="discount">Discount</option>
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                style={styles.clearButton}
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div style={styles.productsSection}>
            {filteredProducts.length === 0 ? (
              <div style={styles.noResults}>
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div style={styles.productsGrid}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
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
  header: {
    marginBottom: '24px'
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#212121',
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: '14px',
    color: '#878787'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '280px 1fr',
    gap: '24px',
    alignItems: 'start'
  },
  sidebar: {
    background: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
    height: 'fit-content',
    position: 'sticky',
    top: '100px'
  },
  filterSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  filterTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#212121',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  filterIcon: {
    fontSize: '14px',
    color: '#2874f0'
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  filterLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#212121',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  searchContainer: {
    position: 'relative'
  },
  searchInput: {
    width: '100%',
    padding: '8px 32px 8px 12px',
    border: '1px solid #dbdbdb',
    borderRadius: '4px',
    fontSize: '14px',
    outline: 'none'
  },
  searchIcon: {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#878787',
    fontSize: '12px'
  },
  priceInputs: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  priceInput: {
    flex: 1,
    padding: '8px 12px',
    border: '1px solid #dbdbdb',
    borderRadius: '4px',
    fontSize: '14px',
    outline: 'none'
  },
  priceSeparator: {
    color: '#878787',
    fontSize: '14px'
  },
  sortSelect: {
    padding: '8px 12px',
    border: '1px solid #dbdbdb',
    borderRadius: '4px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: 'white'
  },
  clearButton: {
    background: '#f1f3f6',
    border: '1px solid #dbdbdb',
    color: '#212121',
    padding: '10px 16px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  productsSection: {
    background: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
  },
  noResults: {
    textAlign: 'center',
    padding: '60px 20px'
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px'
  }
};

export default Products;
