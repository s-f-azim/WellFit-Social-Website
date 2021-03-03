import { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookieh';
import Router, { useRouter } from 'next/router';
import api from '../services/api';

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [load, setLoading] = useState(true);
  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('token');
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: responseData } = await api.get('users/me');
        if (responseData.data) setUser(responseData.data);
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const login = async (email, password) => {
    const response = await api.post('users/login', { email, password });
    if (response.data.token) {
      Cookie.set('token', response.data.token, { expires: 30 });
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
      setUser(response.data.data);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    delete api.defaults.headers.Authorization;
    window.location.pathname = '/login';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading || (!isAuthenticated && window.location !== '/login')) return <LoadingScree />;
  return children;
};
