import { Button } from 'antd';
import Image from 'next/image';
import { CreditCardOutlined, DislikeOutlined } from '@ant-design/icons';
import template from '../../../data/frontPageText';

const Banner3 = () => (
  <div className="banner3">
    <div className="inner_banner3">
      <div className="inner_banner3_content">
        <h1>
          <b>{template.banner3.header}</b>
        </h1>
        <p>{template.banner3.subheader_1}</p>
        <div className="banner_button_box">
          <Button size="large" href="/search" className="banner3_button">
            What are you looking for?
          </Button>
        </div>
        <div className="infoGrid">
          <div className="infoCard">
            <CreditCardOutlined style={{ color: 'w', fontSize: '2rem' }} />
            <br />
            <b>{template.banner3.card1.cardHeader}</b>
            <br />
            {template.banner3.card1.cardText}
          </div>
          <div className="infoCard">
            <DislikeOutlined style={{ fontSize: '2rem', color: 'black' }} />
            <br />
            <b>{template.banner3.card2.cardHeader}</b>
            <br />
            {template.banner3.card2.cardText}
          </div>
        </div>
      </div>
      <div className="inner_banner3_image">
        <div className="banner3_screen">
          <Image
            alt="A Phone with a site preview on the screen"
            src="/wellfit_vert.png"
            width="231px"
            height="500px"
          />
        </div>
      </div>
    </div>
  </div>
);
export default Banner3;
