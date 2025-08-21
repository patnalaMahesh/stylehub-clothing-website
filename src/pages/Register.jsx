import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const result = await register(formData.name, formData.email, formData.password);
      
      if (result.success) {
        toast.success('Registration successful!');
        navigate('/');
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('An error occurred during registration');
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
              <h1 style={styles.title}>Sign Up</h1>
              <p style={styles.subtitle}>
                Looks like you're new here! Sign up with your mobile number or email
              </p>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

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
                <small style={styles.helpText}>
                  Password must be at least 6 characters long
                </small>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-input"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
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
                    <span>Creating account...</span>
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div style={styles.divider}>
              <span style={styles.dividerText}>OR</span>
            </div>

            <div style={styles.loginSection}>
              <p style={styles.loginText}>
                Already have an account?{' '}
                <Link to="/login" style={styles.loginLink}>
                  Login
                </Link>
              </p>
            </div>

            <div style={styles.termsSection}>
              <p style={styles.termsText}>
                By continuing, you agree to StyleHub's{' '}
                <a href="#" style={styles.termsLink}>Terms of Use</a> and{' '}
                <a href="#" style={styles.termsLink}>Privacy Policy</a>.
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
  helpText: {
    fontSize: '12px',
    color: '#878787',
    marginTop: '4px',
    display: 'block'
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
  loginSection: {
    textAlign: 'center',
    marginBottom: '24px'
  },
  loginText: {
    fontSize: '14px',
    color: '#878787',
    margin: 0
  },
  loginLink: {
    color: '#2874f0',
    textDecoration: 'none',
    fontWeight: '500'
  },
  termsSection: {
    textAlign: 'center'
  },
  termsText: {
    fontSize: '12px',
    color: '#878787',
    lineHeight: '1.4',
    margin: 0
  },
  termsLink: {
    color: '#2874f0',
    textDecoration: 'none'
  }
};

export default Register;
