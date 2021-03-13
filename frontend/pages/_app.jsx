import { BackTop } from 'antd';
import NProgress from 'nprogress';
import { ArrowUpOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../styles/main.scss';
import Head from 'next/head';
import Router from 'next/router';
import Layout from '../components/Layout';
import { AuthProvider } from '../services/auth';
import { Provider } from 'next-auth/client';
import { CookiesProvider } from 'react-cookie';
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider session={pageProps.session}>
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
                <div>
                  Top
                  <ArrowUpOutlined />
                </div>
              </BackTop>
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
        </CookiesProvider>
      </Provider>
    </>
  );
}

export default MyApp;
