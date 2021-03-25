import Image from 'next/image';
import { Button } from 'antd';

const Banner2 = () => (
  <div className="banner2">
    <div className="inner_banner2">
      <h1 className="cardHeader">Choose what works for you</h1>
      <div className="inner_banner2_boxes">
        <div className="card inner_banner_content2">
          <div className="cardImage">
            <Image src="/Asset_1.svg" height="150px" width="150px" />
          </div>
          <div className="cardText">
            <h3>
              <b>Take courses</b>
            </h3>
            <p>Need to put some text in here soon i guess.</p>
          </div>
        </div>
        <div className="card inner_banner_content2">
          <div className="cardImage">
            <Image src="/Asset_3.svg" height="150px" width="150px" />
          </div>
          <div className="cardText">
            <h3>
              <b>Engange with trainers</b>
            </h3>
            <p>
              Mauris tincidunt, augue vel pharetra pretium, sem eros mattis felis, eu fermentum.{' '}
            </p>
          </div>
        </div>
        <div className="card inner_banner_content2">
          <div className="cardImage">
            <Image src="/Asset_2.svg" height="150px" width="150px" />
          </div>
          <div className="cardText">
            <h3>
              <b>Get 1-1 support and advice</b>
            </h3>
            <p>Maybe the clients know what she wants</p>
          </div>
        </div>
        <div className="card inner_banner_content2">
          <div className="cardImage">
            <Image src="/Asset_4.svg" height="150px" width="150px" />
          </div>

          <div className="cardText">
            <h3>
              <b>What else??</b>
              <span
                style={{
                  display: 'inline',
                  verticalAlign: 'super',
                  fontSize: '0.8rem',
                  color: 'brown',
                }}
              >
                Soon&#8482;
              </span>
            </h3>
            <p>Discover something else idk what to put</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Banner2;
