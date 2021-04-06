import Image from 'next/image';
import template from '../../../data/frontPageText';

const Banner2 = () => (
  <div className="banner2">
    <div className="inner_banner2">
      <h1 className="cardHeader">{template.banner2.header}</h1>
      <div className="inner_banner2_boxes">
        <div className="card inner_banner_content2">
          <div className="cardImage">
            <Image src="/Asset_1.svg" height="150px" width="150px" />
          </div>
          <div className="cardText">
            <h3>
              <b>{template.banner2.card1.cardHeader}</b>
            </h3>
            <p>{template.banner2.card1.cardText}</p>
          </div>
        </div>
        <div className="card inner_banner_content2">
          <div className="cardImage">
            <Image src="/Asset_3.svg" height="150px" width="150px" />
          </div>
          <div className="cardText">
            <h3>
              <b>{template.banner2.card2.cardHeader}</b>
            </h3>
            <p>{template.banner2.card2.cardText}</p>
          </div>
        </div>
        <div className="card inner_banner_content2">
          <div className="cardImage">
            <Image src="/Asset_2.svg" height="150px" width="150px" />
          </div>
          <div className="cardText">
            <h3>
              <b>{template.banner2.card3.cardHeader}</b>
            </h3>
            <p>{template.banner2.card3.cardText}</p>
          </div>
        </div>
        <div className="card inner_banner_content2">
          <div className="cardImage">
            <Image src="/Asset_4.svg" height="150px" width="150px" />
          </div>

          <div className="cardText">
            <h3>
              <b>{template.banner2.card4.cardHeader}</b>
            </h3>
            <p>{template.banner2.card4.cardText}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Banner2;
