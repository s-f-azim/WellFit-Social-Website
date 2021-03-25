import Image from 'next/image';

const Banner1 = () => (
  <div className="banner1">
    <div className="inner_banner1">
      <div className="inner_banner1_content">
        Connect with health enthusiasts. Enjoy a better lifestyle.
      </div>
      <div className="inner_banner1_image">
        <Image src="/jogging.svg" width="700px" height="700px" />
      </div>
    </div>
  </div>
);

export default Banner1;
