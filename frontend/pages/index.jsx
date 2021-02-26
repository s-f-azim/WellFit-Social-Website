import Head from "next/head";
import { useContext, useEffect } from "react";
import { Button } from "antd";
import { UserContext } from "../contexts/UserContext.js";
import { getCookie } from "../utils/auth.js";

export default function Home({ token, userCookie }) {
  const { user, setUser } = useContext(UserContext);
  // on componont mount check if the user exists in the cookies
  useEffect(() => {
    if (getCookie("user") && getCookie("user") !== null)
      setUser(JSON.parse(getCookie("user")));
  }, []);
  return <div></div>;
}
export function getServerSideProps({ req, res }) {
  return {
    props: {
      token: req.cookies.token || "",
      userCookie: req.cookies.user || null,
    },
  };
}
