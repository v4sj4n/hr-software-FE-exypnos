import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    const storedUserRole = localStorage.getItem('user_role');
    console.log('Token from localStorage:', access_token);
    if (access_token && storedUserRole) {
      setIsAuthenticated(true);
      setUserRole(storedUserRole);
      console.log('User authenticated with role:', storedUserRole);
    } else {
      console.log('No token or role found');
    }
  }, []);

  const login = (access_token: string, role: string) => {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('user_role', role);
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};