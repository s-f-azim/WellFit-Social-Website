//
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
		<img src="https://s3-alpha-sig.figma.com/img/9882/070d/89648261265b05143b10a7f5effd1a58?Expires=1614556800&Signature=LCKg2bBIkB8lHfUByJ7Iuc~9cg-b3MlaqbFLRorQvsgBnHgBrtSrueCx2mGcrp3vm6f1Hav4AKJKBgOrzCTvQO5mee-wmiOjdN3WfjY2D0ZEamnRFKxepxChsFanK83f01-eFnveRn3swbnmdsKO8lH2dSlyPGClvOXGn5c7Pk4F8YtNwv1wU9TXplZIOUwMjqFneEkAJFpUe-RVY3gumIpNNFglcs7B0xVPXkUBrQ0T~iek~L8yxKqSWGlgHzsVRh41cfXMtc-YrKkNC-SLPH66DGTBh0ye2p08SX4xTWJ3FJ~1PUxK2KKktXYqiQOi1gaW3i~thB1Y6K5YiXMO2g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"></img>
	)
}
const LandingPage = () => {
  return (
  <Content style={{padding: '50px', backgroundColor: 'white'}}>
    <Row style={{paddingTop: '5%'}}>
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
  </Content>);
}

export default LandingPage;
