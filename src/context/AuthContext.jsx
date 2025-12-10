import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('neosite_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('neosite_token'));
  const [checkingAuth, setCheckingAuth] = useState(Boolean(localStorage.getItem('neosite_token')));
  const [hasVerified, setHasVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const persist = (payload) => {
    setUser(payload.user);
    setToken(payload.token);
    setHasVerified(true);
    localStorage.setItem('neosite_user', JSON.stringify(payload.user));
    localStorage.setItem('neosite_token', payload.token);
  };

  const clearSession = () => {
    localStorage.removeItem('neosite_user');
    localStorage.removeItem('neosite_token');
    setUser(null);
    setToken(null);
    setHasVerified(false);
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

  const verifySession = async (tokenValue) => {
    if (!tokenValue) {
      setHasVerified(false);
      return;
    }
    setCheckingAuth(true);
    try {
      const profile = await api.authMe(tokenValue);
      const profileUser = profile.user || profile;
      if (profileUser) {
        setUser(profileUser);
        setHasVerified(true);
        localStorage.setItem('neosite_user', JSON.stringify(profileUser));
      }
    } catch (err) {
      clearSession();
    } finally {
      setCheckingAuth(false);
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

  useEffect(() => {
    verifySession(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const logout = () => {
    clearSession();
  };

  const value = useMemo(
    () => ({
      user,
      token,
      checkingAuth,
      loading,
      error,
      isAuthenticated: Boolean(token && user && hasVerified),
      login,
      register,
      logout,
      verifySession,
    }),
    [user, token, loading, error, checkingAuth, hasVerified],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
