import { Button } from 'antd';
import Image from 'next/image';
import { CreditCardOutlined, DislikeOutlined } from '@ant-design/icons';
import tags from '../../../data/tags';

const TagCard = tags.map((tag) => (
  <div className="scroll_item">
    <a href="/search" style={{ color: 'black', textDecoration: 'none' }}>
      {tag}
    </a>
  </div>
));

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
          <Image src="/mediai_mage.png" width="231px" height="500px" />
        </div>
      </div>
      <div className="inner_banner3_tagscroll">
        <h1>
          <b>Explore our tags and categories</b>
        </h1>
        <p>Wide range of tags and categories to help you find whats right for you.</p>
        <div className="scrollable">{TagCard}</div>
      </div>
    </div>
  </div>
);
export default Banner3;