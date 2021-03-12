import { BackTop } from 'antd';
import NProgress from 'nprogress';
import { ArrowUpOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../styles/main.scss';
import Head from 'next/head';
import Router from 'next/router';
import { CookiesProvider } from 'react-cookie';
import Layout from '../components/Layout';
import { AuthProvider } from '../services/auth';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <CookiesProvider>
        <AuthProvider>
          <Layout>
            <BackTop>
              <h1>
                <ArrowUpOutlined />
              </h1>
            </BackTop>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </CookiesProvider>
    </>
  );
}

export default MyApp;
