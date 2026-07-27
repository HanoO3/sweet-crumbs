import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('userInfo');
      return saved ? JSON.parse(saved) : null;
    } catch (err) {
      console.error('Failed to parse saved user from localStorage:', err);
      localStorage.removeItem('userInfo');
      return null;
    }
  });

  const login = (userData) => {
    try {
      localStorage.setItem('userInfo', JSON.stringify(userData));
      setUser(userData);
    } catch (err) {
      console.error('Failed to save user to localStorage:', err);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('userInfo');
    } catch (err) {
      console.error('Failed to clear user from localStorage:', err);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}