import { Layout } from "antd";
import "antd/dist/antd.css";
import "../styles/main.scss";
import Nav from "../components/Nav.jsx";
const { Header, Footer, Content } = Layout;
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Header>
        <Nav />
      </Header>
      <Content>
        <Component {...pageProps} />
      </Content>
      <Footer>Test</Footer>
    </Layout>
  );
}

export default MyApp;
