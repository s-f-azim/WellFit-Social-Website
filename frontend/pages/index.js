import Head from "next/head";
import { Row, Col } from "antd";
//import TestElement from "../components/Navbar";
import Navbar1 from "../components/Navbar1";
import LandingText from "../components/LandingText";
import LandingImage from "../components/LandingImage";
import "../styles/landing.scss";

export default function Home() {
  return (
    <div>
      <Navbar1/>   
      <br/>
      <br/>
      <br/>
      <br/>

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

      <br/>
      <br/>
      <br/>
      <br/>
      
      <Col span={8} offset = {8} style = {{fontSize: "30px"}}>
        <Row style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
          <button className="blackBtn">
            What are you looking for?
          </button>
        </Row>
        <Row style={{display:"flex", justifyContent: "center", alignItems:"center", fontFamily: "Source Sans Pro"}}>
          OR
        </Row>
        <Row style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
          <u><a href= "" style= {{color: "black"}}>Browse our content</a></u>
        </Row>
      </Col>


      {/*<TestElement name="Nice" />*/}
      
    </div>
  );
}


