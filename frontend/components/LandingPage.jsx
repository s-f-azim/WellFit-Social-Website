import Image from 'next/image'
import {Row, Col, Button} from 'antd';

const LandingText = () => {
  return (
    <div style={{fontSize: "3em"}}>
      <p> Connect with health enthusiasts.</p>
      <p> Enjoy a better lifestyle.</p>
    </div>
  );
}

const LandingImage = () => {
	return (
    <Image src="/../public/jogging.svg" layout = "fill"/>
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
        <Row style={{paddingTop: '5%'}}>
          <Col md={{span:5}} span = {0}></Col>
          <Col xs={{span: 24}} md={{span: 4}}>
            <LandingText/>
          </Col>
          <Col md={{span: 5}} span={0}></Col>
          <Col md={{span:10}} style={{objectFit: "contain"}}>
            <LandingImage/>
          </Col>
        </Row>
        <Row style={{paddingTop: '5%'}}>
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
