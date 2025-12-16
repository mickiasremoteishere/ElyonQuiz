import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Admin {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'superadmin';
}

interface AdminAuthContextType {
  admin: Admin | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// Mock admin data
const mockAdmins: Record<string, { password: string; admin: Admin }> = {
  'admin': {
    password: 'admin123',
    admin: {
      id: '1',
      username: 'admin',
      name: 'System Administrator',
      role: 'superadmin',
    },
  },
  'teacher': {
    password: 'teacher123',
    admin: {
      id: '2',
      username: 'teacher',
      name: 'John Teacher',
      role: 'admin',
    },
  },
};

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(() => {
    const saved = localStorage.getItem('admin');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (username: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const adminData = mockAdmins[username.toLowerCase()];
    if (adminData && adminData.password === password) {
      setAdmin(adminData.admin);
      localStorage.setItem('admin', JSON.stringify(adminData.admin));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
