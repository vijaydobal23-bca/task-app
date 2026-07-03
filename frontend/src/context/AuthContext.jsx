import { createContext, useState, useEffect } from 'react';
import { loginService, logoutService, registerService } from '../services/api';
import toast from 'react-hot-toast';

// 1. Create a Context to share authentication data across the entire app
export const AuthContext = createContext();

// 2. Create a Provider component that will wrap our app and provide the data
export const AuthProvider = ({ children }) => {
  // State to hold the current logged-in user's information
  const [user, setUser] = useState(null);
  // State to track if we are currently checking the user's login status (used for loading screens)
  const [loading, setLoading] = useState(true);

  // 3. useEffect runs once when the app starts to check if a user is already logged in
  useEffect(() => {
    // Check local storage (browser memory) for a saved user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // If found, set the user state
    }
    setLoading(false); // Stop the loading spinner
  }, []);

  // 4. Login function: Calls the backend API and saves the user if successful
  const login = async (userData) => {
    try {
      const data = await loginService(userData); // Send data to backend
      setUser(data); // Update React state
      localStorage.setItem('user', JSON.stringify(data)); // Save to browser memory so they stay logged in
      toast.success('Logged in successfully!');
      return true; // Return true so the login page knows it was successful
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return false; // Return false if login failed
    }
  };

  // 5. Register function: Creates a new user and logs them in immediately
  const register = async (userData) => {
    try {
      const data = await registerService(userData);
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      toast.success('Registered successfully!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  // 6. Logout function: Clears the user from state and browser memory
  const logout = async () => {
    try {
      await logoutService(); // Tell backend to log out (clear cookies if any)
    } catch (error) {
      console.error('Logout API failed', error);
    } finally {
      setUser(null); // Clear React state
      localStorage.removeItem('user'); // Clear browser memory
      toast.success('Logged out successfully!');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
