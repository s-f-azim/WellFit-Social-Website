import Head from "next/head";
import LandingPage from "../components/LandingPage";
import React, {Component} from 'react'
import { Layout } from "antd";
const {Content, Footer} = Layout;
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext.js";
import { getCookie } from "../utils/auth.js";

export default function Home({ token, userCookie }) {
  const { user, setUser } = useContext(UserContext);
  // on componont mount check if the user exists in the cookies
  useEffect(() => {
    if (getCookie("user") && getCookie("user") !== null)
      setUser(JSON.parse(getCookie("user")));
  }, []);
  return (
    <Layout>  
      <LandingPage/>
      <Footer style={{textAlign: 'center', backgroundColor: 'white'}}>
        {/* Update this as soon as more information is available */}
        <p>(c) Copyright Stuff</p>
        <p>Maybe Pagetree </p>
      </Footer>
    </Layout>
  );
}

export function getServerSideProps({ req, res }) {
  return {
    props: {
      token: req.cookies.token || "",
      userCookie: req.cookies.user || null,
    },
  };
}


