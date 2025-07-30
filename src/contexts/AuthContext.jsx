import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user data - in real app, this would come from API
  const mockUsers = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@company.com',
      department: 'HR',
      role: 'user'
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@company.com',
      department: 'Finance',
      role: 'user'
    },
    {
      id: 3,
      name: 'Charlie Brown',
      email: 'charlie@company.com',
      department: 'IT',
      role: 'user'
    },
    {
      id: 4,
      name: 'Diana Wilson',
      email: 'diana@company.com',
      department: 'Administration',
      role: 'admin'
    },
    {
      id: 5,
      name: 'Super Admin',
      email: 'super@admin.com',
      department: 'All',
      role: 'superadmin'
    }
  ];

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login - in real app, this would be an API call
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return { success: true, user: foundUser };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const signup = (userData) => {
    // Mock signup - in real app, this would be an API call
    const newUser = {
      id: Date.now(),
      ...userData,
      role: 'user'
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const canAccessDepartment = (fileDepartment) => {
    if (!user) return false;
    if (user.role === 'admin') return true; // Admins can see all departments
    return user.department === fileDepartment;
  };

  const canAccessFile = (file) => {
    if (!user) return false;
    if (user.role === 'admin') return true; // Admins can see all files
    return user.department === file.department;
  };

  const value = {
    user,
    login,
    signup,
    logout,
    canAccessDepartment,
    canAccessFile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 