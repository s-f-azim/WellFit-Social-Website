import Head from "next/head";
import LandingPage from "../components/LandingPage";
import React, {Component} from 'react'
import { Layout, Row, Col } from "antd";
const {Content, Footer} = Layout;

export default function Home() {
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


