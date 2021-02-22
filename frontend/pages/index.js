import Head from "next/head";
import Navbar2 from "../components/Navbar2";
import React, {Component} from 'react'
import { Button } from "antd";
import { Layout, Row, Col } from "antd";
import Navbar1 from "../components/Navbar1";
import LandingText from "../components/LandingText";
import LandingImage from "../components/LandingImage";
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
      <Content style={{padding: '50px', backgroundColor: 'white'}}>
        <Row>
          <Col span = {4}></Col>
          <Col span = {6}>
            <LandingText/>
          </Col>
          <Col span = {5}></Col>
          <Col>
            <LandingImage/>
          </Col>
        </Row>
        <Row style={{paddingTop: '10%'}}>
          <Col span={8} offset = {8} style = {{fontSize: "30px"}}>
            <Row style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
              {/*TODO: Link to QUIZ */}
              <button className="blackBtn">
                What are you looking for?
              </button>
            </Row>
            <Row style={{display:"flex", justifyContent: "center", alignItems:"center" /*, fontFamily: "Source Sans Pro"*/ }}>
              OR
            </Row>
            <Row style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
              {/* TODO: Link to all CONTENT */}
              <u><a href= "" style= {{color: "black"}}>Browse our content</a></u>
            </Row>
          </Col>
        </Row>
        {/* TODO: Add more CONTENT */}
      </Content>

      {/*<TestElement name="Nice" />*/}
      <Footer style={{textAlign: 'center', backgroundColor: 'white'}}>
        {/* Update this as soon as more information is available */}
        <p>(c) Copyright Stuff</p>
        <p>Maybe Pagetree </p>
      </Footer>
    </Layout>
  );
}


