import Image from 'next/image';
import { Button } from 'antd';
import { useSession } from 'next-auth/client';
import template from '../../../data/frontPageText';

const Banner1 = () => {
  const [session, loading] = useSession();
  return (
    <div className="banner1">
      <div className="inner_banner1">
        <div className="inner_banner1_content">
          <h1 className="headerText">
            <b>{template.banner1.header}</b>
          </h1>
          <h2>{template.banner1.subheader}</h2>
          <div className="banner_button_box">
            <Button className="banner_button" href={session ? '/search' : '/signup'} size="large">
              <b>
                {session ? template.banner1.button_signed_in : template.banner1.button_signed_out}
              </b>
            </Button>
          </div>
        </div>
        <div className="inner_banner1_image">
          <Image alt="Two people jogging" src="/jogging.svg" width="600px" height="600px" />
        </div>
      </div>
    </div>
  );
};

export default Banner1;
