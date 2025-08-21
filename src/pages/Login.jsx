import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div className="container">
        <div style={styles.formContainer}>
          <div style={styles.formCard}>
            <div style={styles.header}>
              <h1 style={styles.title}>Login</h1>
              <p style={styles.subtitle}>
                Get access to your Orders, Wishlist and Recommendations
              </p>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={styles.submitButton}
                disabled={loading}
              >
                {loading ? (
                  <div style={styles.loadingContainer}>
                    <div style={styles.spinner}></div>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            <div style={styles.divider}>
              <span style={styles.dividerText}>OR</span>
            </div>

            <div style={styles.registerSection}>
              <p style={styles.registerText}>
                New to StyleHub?{' '}
                <Link to="/register" style={styles.registerLink}>
                  Create an account
                </Link>
              </p>
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
    padding: '40px 0'
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 80px)'
  },
  formCard: {
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
    padding: '40px',
    width: '100%',
    maxWidth: '400px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#2874f0',
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: '14px',
    color: '#878787',
    lineHeight: '1.5'
  },
  form: {
    marginBottom: '24px'
  },
  submitButton: {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    fontWeight: '500',
    marginTop: '8px'
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  divider: {
    position: 'relative',
    textAlign: 'center',
    margin: '24px 0'
  },
  dividerText: {
    background: 'white',
    padding: '0 16px',
    color: '#878787',
    fontSize: '14px'
  },
  registerSection: {
    textAlign: 'center'
  },
  registerText: {
    fontSize: '14px',
    color: '#878787',
    margin: 0
  },
  registerLink: {
    color: '#2874f0',
    textDecoration: 'none',
    fontWeight: '500'
  }
};

export default Login;
