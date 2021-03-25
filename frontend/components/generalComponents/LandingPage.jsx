import Image from 'next/image';
import { Row, Col, Button } from 'antd';
import Banner1 from './LandingPage/banner-1';
import Banner2 from './LandingPage/banner-2';
import TrendingUsers from '../userComponents/TrendingUsers';

const LandingText = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      verticalAlign: 'middle',
    }}
  >
    <Row className="landing-text">
      Connect with health enthusiasts.
      <br />
      <br />
      Enjoy a better lifestyle.
    </Row>
  </div>
);

const LandingImage = () => <Image src="/jogging.svg" layout="intrinsic" width="550" height="550" />;

const LandingFooter = () => (
  <div style={{ textAlign: 'center', backgroundColor: 'white' }}>
    {/* Update this as soon as more information is available */}
    <p>(c) Copyright Stuff</p>
    <p>Maybe Pagetree </p>
  </div>
);

const LandingPage = () => (
  <>
    <Banner1 />
    <Banner2 />
    <div style={{ padding: '2rem', backgroundColor: 'white' }}>
      <Row>
        <Col md={{ span: 5 }} span={0} />
        <Col xs={{ span: 24 }} md={{ span: 4 }} style={{}}>
          <LandingText />
        </Col>
        <Col md={{ span: 2 }} span={0} />
        <Col md={{ span: 10 }} xs={{ span: 24 }}>
          <LandingImage />
        </Col>
        <Col md={{ span: 10 }} span={0} />
        <Col md={{ span: 10 }} span={0}>
          <TrendingUsers />
        </Col>
      </Row>
      <Row style={{ paddingTop: '2rem' }}>
        <Col lg={{ span: 8 }} span={0} />
        <Col lg={{ span: 8 }} span={24} style={{ fontSize: '1.5rem' }}>
          <Row
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* TODO: Link to QUIZ */}
            <Button shape="round" size="large" type="primary">
              What are you looking for?
            </Button>
          </Row>
          <Row
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            OR
          </Row>
          <Row
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* TODO: Link to all CONTENT */}
            <u>
              <a href="" style={{ color: 'black' }}>
                Browse our content
              </a>
            </u>
          </Row>
        </Col>
        <Col lg={{ span: 8 }} span={0} />
      </Row>
      {/* TODO: Add more CONTENT */}
    </div>
    <LandingFooter />
  </>
);

export default LandingPage;
