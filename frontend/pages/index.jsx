import Head from "next/head";
import Navbar2 from "../components/Navbar2";
import LandingPage from "../components/LandingText";
import React, {Component} from 'react'
import { Layout, Row, Col } from "antd";
import Navbar1 from "../components/Navbar1";
const {Content, Footer} = Layout;


export default function Home() {
  return (
    <Layout>
      <Navbar2 user={null}/>   
      <LandingPage/>
      <Footer style={{textAlign: 'center', backgroundColor: 'white'}}>
        {/* Update this as soon as more information is available */}
        <p>(c) Copyright Stuff</p>
        <p>Maybe Pagetree </p>
      </Footer>
    </Layout>
  );
}


