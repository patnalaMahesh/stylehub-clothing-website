import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaEnvelope, FaCalendar, FaEdit, FaSignOutAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // In a real app, you would make an API call to update the user profile
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || ''
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  if (!user) {
    return (
      <div style={styles.container}>
        <div className="container">
          <div style={styles.errorContainer}>
            <h2>Please log in to view your profile</h2>
            <p>You need to be authenticated to access this page.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div className="container">
        <div style={styles.content}>
          {/* Profile Header */}
          <div style={styles.header}>
            <div style={styles.avatar}>
              <FaUser style={styles.avatarIcon} />
            </div>
            <div style={styles.headerInfo}>
              <h1 style={styles.title}>My Profile</h1>
              <p style={styles.subtitle}>Manage your account settings and preferences</p>
            </div>
          </div>

          {/* Profile Information */}
          <div style={styles.profileSection}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Account Information</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  style={styles.editButton}
                >
                  <FaEdit style={styles.editIcon} />
                  Edit Profile
                </button>
              )}
            </div>

            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <div style={styles.infoLabel}>
                  <FaUser style={styles.infoIcon} />
                  Full Name
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={styles.input}
                  />
                ) : (
                  <div style={styles.infoValue}>{user.name}</div>
                )}
              </div>

              <div style={styles.infoItem}>
                <div style={styles.infoLabel}>
                  <FaEnvelope style={styles.infoIcon} />
                  Email Address
                </div>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                  />
                ) : (
                  <div style={styles.infoValue}>{user.email}</div>
                )}
              </div>

              <div style={styles.infoItem}>
                <div style={styles.infoLabel}>
                  <FaCalendar style={styles.infoIcon} />
                  Member Since
                </div>
                <div style={styles.infoValue}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {isEditing && (
              <div style={styles.editActions}>
                <button
                  onClick={handleSave}
                  className="btn btn-primary"
                  style={styles.saveButton}
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="btn btn-outline"
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Account Actions */}
          <div style={styles.actionsSection}>
            <h2 style={styles.sectionTitle}>Account Actions</h2>
            <div style={styles.actionsGrid}>
              <button style={styles.actionButton}>
                <div style={styles.actionIcon}>📦</div>
                <div style={styles.actionContent}>
                  <h3 style={styles.actionTitle}>My Orders</h3>
                  <p style={styles.actionDescription}>View your order history</p>
                </div>
              </button>

              <button style={styles.actionButton}>
                <div style={styles.actionIcon}>❤️</div>
                <div style={styles.actionContent}>
                  <h3 style={styles.actionTitle}>Wishlist</h3>
                  <p style={styles.actionDescription}>Your saved items</p>
                </div>
              </button>

              <button style={styles.actionButton}>
                <div style={styles.actionIcon}>📍</div>
                <div style={styles.actionContent}>
                  <h3 style={styles.actionTitle}>Addresses</h3>
                  <p style={styles.actionDescription}>Manage delivery addresses</p>
                </div>
              </button>

              <button style={styles.actionButton}>
                <div style={styles.actionIcon}>💳</div>
                <div style={styles.actionContent}>
                  <h3 style={styles.actionTitle}>Payment Methods</h3>
                  <p style={styles.actionDescription}>Saved payment options</p>
                </div>
              </button>
            </div>
          </div>

          {/* Logout Section */}
          <div style={styles.logoutSection}>
            <button
              onClick={handleLogout}
              style={styles.logoutButton}
            >
              <FaSignOutAlt style={styles.logoutIcon} />
              Logout
            </button>
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
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
    textAlign: 'center'
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    background: 'white',
    borderRadius: '8px',
    padding: '32px',
    marginBottom: '24px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#2874f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarIcon: {
    fontSize: '32px',
    color: 'white'
  },
  headerInfo: {
    flex: 1
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
  profileSection: {
    background: 'white',
    borderRadius: '8px',
    padding: '32px',
    marginBottom: '24px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#212121'
  },
  editButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'none',
    border: '1px solid #2874f0',
    color: '#2874f0',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s'
  },
  editIcon: {
    fontSize: '12px'
  },
  infoGrid: {
    display: 'grid',
    gap: '20px'
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  infoLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#878787'
  },
  infoIcon: {
    fontSize: '14px',
    color: '#2874f0'
  },
  infoValue: {
    fontSize: '16px',
    color: '#212121',
    fontWeight: '500'
  },
  input: {
    padding: '12px 16px',
    border: '1px solid #dbdbdb',
    borderRadius: '4px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  editActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px'
  },
  saveButton: {
    padding: '12px 24px'
  },
  cancelButton: {
    padding: '12px 24px'
  },
  actionsSection: {
    background: 'white',
    borderRadius: '8px',
    padding: '32px',
    marginBottom: '24px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginTop: '20px'
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    background: 'none',
    border: '1px solid #dbdbdb',
    borderRadius: '8px',
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left'
  },
  actionIcon: {
    fontSize: '24px'
  },
  actionContent: {
    flex: 1
  },
  actionTitle: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#212121',
    marginBottom: '4px'
  },
  actionDescription: {
    fontSize: '12px',
    color: '#878787'
  },
  logoutSection: {
    background: 'white',
    borderRadius: '8px',
    padding: '32px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#ff4444',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'background-color 0.2s'
  },
  logoutIcon: {
    fontSize: '14px'
  }
};

export default Profile;
