import Image from 'next/image';

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
            <p>Explore courses from fitness to nutrition or general wellness.</p>
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
            <p>Follow your favorite trainers and instructors to see what they have to say.</p>
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
            <p>Chat and interact with your instructors.</p>
          </div>
        </div>
        <div className="card inner_banner_content2">
          <div className="cardImage">
            <Image src="/Asset_4.svg" height="150px" width="150px" />
          </div>

          <div className="cardText">
            <h3>
              <b>Better yourself</b>
            </h3>
            <p>Be Well, be Fit.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Banner2;
