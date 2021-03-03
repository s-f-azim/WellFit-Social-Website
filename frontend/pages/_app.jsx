import { useState, useMemo } from 'react';
import 'antd/dist/antd.css';
import Head from 'next/head';
import Layout from '../components/Layout';
import '../styles/main.scss';

// import { env } from "../config.js";

import UserContext from '../contexts/UserContext';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <UserContext.Provider value={providerValue}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext.Provider>
    </>
  );
}

export default MyApp;
