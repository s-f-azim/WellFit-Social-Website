import { BackTop } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../styles/main.scss';
import Head from 'next/head';
import { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import { AuthProvider } from '../services/auth';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AuthProvider>
        <Layout>
          <BackTop>
            <div>
              Top
              <ArrowUpOutlined />
            </div>
          </BackTop>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  );
}

export default MyApp;
