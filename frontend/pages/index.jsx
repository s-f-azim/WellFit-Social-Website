import React, { useContext, useEffect } from 'react';
import LandingPage from '../components/LandingPage';
import AdminDashboard from '../components/AdminDashboard';
import UserContext from '../contexts/UserContext';
import { getCookie } from '../utils/auth';

// eslint-disable-next-line no-unused-vars
export default function Home({ token, userCookie }) {
  const { user, setUser } = useContext(UserContext);
  // on componont mount check if the user exists in the cookies
  useEffect(() => {
    if (getCookie('user') && getCookie('user') !== null) {
      setUser(JSON.parse(getCookie('user')));
    }
  }, []);
  return (
    <>{user ? user.role === 'admin' ? <AdminDashboard /> : <LandingPage /> : <LandingPage />}</>
  );
}

export function getServerSideProps({ req }) {
  return {
    props: {
      token: req.cookies.token || '',
      userCookie: req.cookies.user || null,
    },
  };
}
