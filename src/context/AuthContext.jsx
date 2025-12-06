import { createContext, useContext, useMemo, useState } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('neosite_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('neosite_token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const persist = (payload) => {
    setUser(payload.user);
    setToken(payload.token);
    localStorage.setItem('neosite_user', JSON.stringify(payload.user));
    localStorage.setItem('neosite_token', payload.token);
  };

  const clearSession = () => {
    localStorage.removeItem('neosite_user');
    localStorage.removeItem('neosite_token');
    setUser(null);
    setToken(null);
  };

  const login = async (credentials) => {
    setLoading(true);
    setError('');
    try {
      const payload = await api.authLogin(credentials);
      persist(payload);
      return payload;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    setError('');
    try {
      const result = await api.authRegister(payload);
      persist(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearSession();
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      error,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
    }),
    [user, token, loading, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
