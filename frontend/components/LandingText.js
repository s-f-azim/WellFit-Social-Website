import jogging from '../public/jogging.png';
import {Layout, Row, Col } from 'antd';

const {Content} = Layout;
const LandingText = () => {
  return (
      <div className="bigText">
        <p> Connect with health enthusiasts.</p>
        <p> Enjoy a better lifestyle.</p>
      </div>
  )
}
const LandingImage = () => {
	return (
    <img src= {jogging}></img>
    )
}
const LandingPage = () => {
  return (
  <Content style={{padding: '50px', backgroundColor: 'white'}}>
    <Row style={{paddingTop: '5%'}}>
      <Col md={{span:5}} span = {0}></Col>
      <Col xs={{span: 24}} md={{span: 4}}>
        <LandingText/>
      </Col>
      <Col md={{span: 5}} span={0}></Col>
      <Col md={{span:10}}>
        <LandingImage/>
      </Col>
    </Row>
    <Row style={{paddingTop: '5%'}}>
      <Col lg={{span: 8}} span={0}></Col>
      <Col lg={{span: 8}} span={24} style = {{fontSize: "30px"}}>
        <Row style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
          {/*TODO: Link to QUIZ */}
          <button className="blackBtn">
            What are you looking for?
          </button>
        </Row>
        <Row style={{display:"flex", justifyContent: "center", alignItems:"center" }}>
          OR
        </Row>
        <Row style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
          {/* TODO: Link to all CONTENT */}
          <u><a href= "" style= {{color: "black"}}>Browse our content</a></u>
        </Row>
      </Col>
      <Col lg={{span: 8}} span={0}></Col>
    </Row>
    {/* TODO: Add more CONTENT */}
  </Content>);
}

export default LandingPage;
