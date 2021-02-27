import Image from 'next/image'
import {Row, Col, Button} from 'antd';

const LandingText = () => {
  return (
    <div style={{
      display: "flex", alignItems: "center", height:"100%", verticalAlign:"middle"}}>
      <p className="landingText"> Connect with health enthusiasts.
      <br/>
      <br/>
      Enjoy a better lifestyle.</p>
    </div>
  );
}

const LandingImage = () => {
	return (
    <Image src="/../public/jogging.svg" layout = "intrinsic" width="550" height="550"/>
  );
}

const LandingFooter = () => {
  return (
    <div style={{textAlign: 'center', backgroundColor: 'white'}}>
      {/* Update this as soon as more information is available */}
      <p>(c) Copyright Stuff</p>
      <p>Maybe Pagetree </p>
    </div>
  );
}


const LandingPage = () => {
  return (
    <>
      <div style={{padding: '3rem', backgroundColor: 'white'}}>
        <Row>
          <Col md={{span:5}} span = {0}></Col>
          <Col xs={{span: 24}} md={{span: 4}} style={{}}>
            <LandingText/>
          </Col>
          <Col md={{span: 5}} span={0}></Col>
          <Col md={{span:10}} xs={{span:24}}>
            <LandingImage/>
          </Col>
        </Row>
        <Row style={{paddingTop: '1rem'}}>
          <Col lg={{span: 8}} span={0}></Col>
          <Col lg={{span: 8}} span={24} style = {{fontSize: "1.5rem"}}>
            <Row style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
              {/*TODO: Link to QUIZ */}
              <Button shape="round" size="large" type="primary">What are you looking for?</Button>
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
      </div>
      <LandingFooter/>
    </>
  );
}

export default LandingPage;
