<<<<<<< HEAD
// import { Layout } from "antd";
import "antd/dist/antd.css";
import Layout from "../components/Layout.jsx";
import "../styles/main.scss";
=======
import 'antd/dist/antd.css';
import Head from 'next/head';
import Layout from '../components/Layout';
import '../styles/main.scss';
>>>>>>> 36e158b1fdba44ada89fcdb1fdcd151775b54e34
// import { env } from "../config.js";
import { useState, useMemo } from 'react';
import UserContext from '../contexts/UserContext';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
<<<<<<< HEAD
    <UserContext.Provider value={providerValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
=======
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
>>>>>>> 36e158b1fdba44ada89fcdb1fdcd151775b54e34
  );
}

export default MyApp;
