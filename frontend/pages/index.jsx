import Head from "next/head";
import Navbar2 from "../components/Navbar2";
import LandingPage from "../components/LandingText";
import React, {Component} from 'react'
import { Button } from "antd";
import { Layout, Row, Col } from "antd";
import Navbar1 from "../components/Navbar1";
import LandingText from "../components/LandingText";
import "../styles/landing.scss";
const {Content, Footer} = Layout;
const user = {
  name: "Oskar",
  age: 13,
  occupation: "Test"
};


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


