import React, { useState } from 'react'

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      //simulate api call
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockUser = { id: 1, email: credentials.email, name: 'Greendee Roper' };
      setUser(mockUser);
      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      //simula api call
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockUser = { id: 1, email: userData.email, name: userData.name };
      setUser(mockUser);
      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: 'Signup failed' };
    } finally {
      setLoading(false);
    }
  };

  // const logout = () => {
  //   setUser(null);
  // };
  
  const logout = async () => {
    setLoading(true);
    try {
      //simule api call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(null);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Logout failed' };
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, login, signup, logout };
}

export default useAuth