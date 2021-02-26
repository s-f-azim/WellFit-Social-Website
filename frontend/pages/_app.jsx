import "antd/dist/antd.css";
import Layout from "../components/Layout.jsx";
import "../styles/main.scss";
// import { env } from "../config.js";
import { useState, useMemo } from "react";
import { UserContext } from "../contexts/UserContext.js";
function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <UserContext.Provider value={providerValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  );
}

export default MyApp;
