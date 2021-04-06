import { Button } from 'antd';
import Image from 'next/image';
import { CreditCardOutlined, DislikeOutlined } from '@ant-design/icons';
import tags from '../../../data/tags';

const Banner3 = () => (
  <div className="banner3">
    <div className="inner_banner3">
      <div className="inner_banner3_content">
        <h1>
          <b>
            Courses by professionals, <br /> made for you.
          </b>
        </h1>
        <p>
          Find a wide range of different courses that fit all needs and budgets, <br /> Directly
          from your favorite creators.
        </p>
        <div className="banner_button_box">
          <Button size="large" href="/search" className="banner3_button">
            What are you looking for?
          </Button>
        </div>
        <div className="infoGrid">
          <div className="infoCard">
            <CreditCardOutlined style={{ color: 'w', fontSize: '2rem' }} />
            <br />
            <b>Payment by us.</b>
            <br />
            No more wiring money and hoping you get your product.
          </div>
          <div className="infoCard">
            <DislikeOutlined style={{ fontSize: '2rem', color: 'black' }} />
            <br />
            <b>No Fun? No Problem.</b>
            <br /> Easy refunds should you not be satisfied.
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
