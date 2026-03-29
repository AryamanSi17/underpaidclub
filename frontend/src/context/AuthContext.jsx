import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('tuc_token');
    if (token) {
      api.get('/api/auth/me')
        .then((res) => setUser(res.data.data))
        .catch(() => {
          localStorage.removeItem('tuc_token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const requestOTP = async (email, name) => {
    const res = await api.post('/api/auth/request-otp', { email, name });
    return res.data;
  };

  const verifyOTP = async (email, otp) => {
    const res = await api.post('/api/auth/verify-otp', { email, otp });
    const { token, user: userData } = res.data.data;
    localStorage.setItem('tuc_token', token);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('tuc_token');
    setUser(null);
  };

  const refreshUser = async () => {
    const res = await api.get('/api/auth/me');
    setUser(res.data.data);
    return res.data.data;
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, requestOTP, verifyOTP, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
