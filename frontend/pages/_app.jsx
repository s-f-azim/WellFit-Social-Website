import { BackTop } from 'antd';
import NProgress from 'nprogress';
import { ArrowUpOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../styles/main.scss';
import Head from 'next/head';
import Router from 'next/router';
import { Provider } from 'next-auth/client';
import Layout from '../components/Layout';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function MyApp({ Component, pageProps }) {
  return (
    <Provider
      session={pageProps.session}
      options={{
        clientMaxAge: 60 * 2 * 60, // Re-fetch session if cache is older than 2 hours
        keepAlive: 60 * 60,
      }}
    >
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Layout>
        <BackTop>
          <div>
            Top
            <ArrowUpOutlined />
          </div>
        </BackTop>
        <Component {...pageProps}  />
      </Layout>
    </Provider>
  );
}

export default MyApp;
