/**
 * This service handles all authentication-related API calls
 * and manages authentication state
 */

const API_URL = 'https://api.example.com';

// Helper function for handling API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    // If server returns error message, use it, otherwise use generic error
    const errorMessage = data?.message || 'An error occurred';
    throw new Error(errorMessage);
  }
  
  return data;
};

/**
 * Login user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {boolean} rememberMe - Whether to remember the user
 * @returns {Promise} - Promise with user data or error
 */
export const login = async (email, password, rememberMe = false) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, rememberMe }),
    });
    
    const data = await handleResponse(response);
    
    // Save token and user data to localStorage or sessionStorage
    if (data.token) {
      if (rememberMe) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user', JSON.stringify(data.user));
      }
    }
    
    return data;
  } catch (error) {
    // For demo purposes, simulate successful login
    if (process.env.NODE_ENV === 'development') {
      console.log('Using mock login response in development');
      const mockUser = {
        id: '12345',
        fullName: 'Demo User',
        email: email,
        token: 'fake-jwt-token-12345',
      };
      
      localStorage.setItem('token', mockUser.token);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return mockUser;
    }
    
    throw error;
  }
};

/**
 * Register a new user
 * @param {object} userData - User registration data
 * @returns {Promise} - Promise with user data or error
 */
export const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    return await handleResponse(response);
  } catch (error) {
    // For demo purposes, simulate successful registration
    if (process.env.NODE_ENV === 'development') {
      console.log('Using mock registration response in development');
      return {
        success: true,
        message: 'Registration successful',
      };
    }
    
    throw error;
  }
};

/**
 * Log out the current user
 */
export const logout = () => {
  // Remove auth items from storage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  
  // In a real app, you might want to make an API call to invalidate the token
  // e.g., await fetch(`${API_URL}/logout`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
  
  // Reload the page or redirect to login
  window.location.href = '/';
};

/**
 * Check if user is logged in
 * @returns {boolean} - True if user is logged in
 */
export const isLoggedIn = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return !!token;
};

/**
 * Get current user information
 * @returns {object|null} - User data or null if not logged in
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Get authentication token
 * @returns {string|null} - Auth token or null
 */
export const getToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

export default {
  login,
  register,
  logout,
  isLoggedIn,
  getCurrentUser,
  getToken
};

// services/searchAPI.js
export const fetchLastSearches = async (userId) => {
  // Simulate API call with delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["Classic T-Shirt", "Denim Jeans", "Wool Sweater", "Summer Dress", "Leather Jacket"]);
    }, 1000);
  });
};