import { BackTop } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../styles/main.scss';
import Head from 'next/head';
import { useState, useMemo } from 'react';
import Layout from '../components/Layout';
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
          <BackTop>
            <div>
              Top
              <ArrowUpOutlined />
            </div>
          </BackTop>
          <Component {...pageProps} />
        </Layout>
      </UserContext.Provider>
    </>
  );
}

export default MyApp;
