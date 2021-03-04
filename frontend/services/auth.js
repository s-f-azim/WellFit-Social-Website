import { createContext, useState, useContext, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import api from '../services/api';
import { useCookies } from 'react-cookie';

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const { pathname, events } = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  useEffect(() => {
    async function loadUserFromCookies() {
      // const token = cookies;
      // const { data: responseData } = await api.get('users/me');
      // if (responseData.data) setUser(responseData.data);
      /* if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: responseData } = await api.get('users/me');
      } */
      setLoading(false);
    }
    loadUserFromCookies();
  }, [pathname]);

  const login = async (email, password) => {
    const response = await api.post('users/login', { email, password });
    if (response.data.token) {
      setCookie('token', response.data.token);
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
      setUser(response.data.data);
    }
    return response;
  };

  const logout = async () => {
    removeCookie('token');
    setUser(null);
    delete api.defaults.headers.Authorization;
    await api.get('users/logout');
    Router.push('/');
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
    return <div>loading</div>;
  }
  return children;
};
