import Image from 'next/image';
import { Button } from 'antd';

const Banner1 = () => (
  <div className="banner1">
    <div className="inner_banner1">
      <div className="inner_banner1_content">
        <h1 className="headerText">
          <b>Enjoy a better lifestyle.</b>
        </h1>
        <h2>Wellfit helps you connect health enthusiast and learn what works for you.</h2>
        <div className="banner_button_box">
          <Button className="banner_button" size="large">
            <b>Join Wellfit</b>
          </Button>
        </div>
      </div>
      <div className="inner_banner1_image">
        <Image src="/jogging.svg" width="600px" height="600px" />
      </div>
    </div>
  </div>
);

export default Banner1;
