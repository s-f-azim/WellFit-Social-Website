import { Layout } from "antd";
import "antd/dist/antd.css";
import "../styles/main.scss";
const { Header, Footer, Content } = Layout;
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Header></Header>
      <Content>
        <Component {...pageProps} />
      </Content>
      <Footer>Test</Footer>
    </Layout>
  );
}

export default MyApp;
