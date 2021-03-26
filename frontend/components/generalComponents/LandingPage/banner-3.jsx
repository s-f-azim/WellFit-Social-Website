import { Button } from 'antd';
import { CreditCardOutlined, DislikeOutlined } from '@ant-design/icons';

const Banner3 = () => (
  <div className="banner3">
    <div className="inner_banner3">
      <div className="inner_banner3_content">
        <h1>
          <b>
            {' '}
            Courses by enthusiast, <br /> made for you.
          </b>
        </h1>
        <p>
          We offer a wide range of different courses that fits all types of styles and budgets.{' '}
          <br /> Made by your favorite creators.
        </p>
        <div className="banner_button_box">
          <Button size="large" className="banner3_button">
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
      <div className="inner_banner3_image">This will be an image maybe of screenshot?</div>
    </div>
  </div>
);
export default Banner3;
