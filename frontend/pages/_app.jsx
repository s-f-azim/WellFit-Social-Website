import { useState, useMemo } from 'react';
import 'antd/dist/antd.css';
import Layout from '../components/Layout';
import '../styles/main.scss';
// import { env } from "../config.js";
import UserContext from '../contexts/UserContext';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <UserContext.Provider value={providerValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  );
}

export default MyApp;
