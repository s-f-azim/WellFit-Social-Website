import { Layout } from "antd";
import "antd/dist/antd.css";
import "../styles/main.scss";
// import { env } from "../config.js";
import Nav from "../components/Nav.jsx";
import { useState, useMemo } from "react";
import { UserContext } from "../contexts/UserContext.js";
const { Header, Footer, Content } = Layout;
function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <UserContext.Provider value={providerValue}>
      <Layout>
        <Content>
          <Component {...pageProps} />
        </Content>
      </Layout>
    </UserContext.Provider>
  );
}

export default MyApp;
