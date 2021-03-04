import { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import Router, { useRouter } from 'next/router';
import api from '../services/api';

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log('hmm');
    async function loadUserFromCookies() {
      const token = Cookies.get('token');
      console.log(token);
      if (token) {
        console.log(token);
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
      Cookies.set('token', response.data.token, { expires: 30 });
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
      setUser(response.data.data);
    }
    return response;
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    delete api.defaults.headers.Authorization;
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, loading, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading || !isAuthenticated) {
    window.location.pathname = '/';
    return;
  }
  return children;
};
