import Image from 'next/image';
import { Row } from 'antd';
import Banner1 from './banner-1';
import Banner2 from './banner-2';
import Banner3 from './banner-3';
import Banner4 from './banner-4';
import Banner5 from './banner-5';
import Footer from './footer';

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

const LandingImage = () => (
  <Image alt="Two people jogging" src="/jogging.svg" layout="intrinsic" width="550" height="550" />
);

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
    <Banner3 />
    <Banner4 />
    <Banner5 />
    <Footer />
  </>
);

export default LandingPage;
