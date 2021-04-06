import Image from 'next/image';
import template from '../../../data/frontPageText';

const Banner5 = () => (
  <div className="banner5">
    <div className="inner_banner5">
      <div className="banner5_chats">
        <Image layout="intrinsic" src="/Chat_Right.svg" width="500px" height="200px" />
        <Image layout="intrinsic" src="/Chat_Left.svg" width="500px" height="200px" />
      </div>
      <div className="banner5_content">
        <h1>
          <b>{template.banner5.card1.cardHeader}</b>
        </h1>
        <p>{template.banner5.card1.cardText}</p>
      </div>

      <div className="banner5_content_flip">
        <h1>
          <b>{template.banner5.card2.cardHeader}</b>
        </h1>
        <p>{template.banner5.card2.cardText}</p>
      </div>
      <div className="banner5_chats_flip">
        <Image layout="intrinsic" src="/computer.svg" width="300px" height="200px" />
      </div>
      <div className="banner5_chats_mobile">
        <Image layout="intrinsic" src="/computer.svg" width="500px" height="500px" />
      </div>
      <div className="banner5_content_mobile">
        <h1>
          <b>{template.banner5.card2.cardHeader}</b>
        </h1>
        <p>{template.banner5.card2.cardText}</p>
      </div>

      <div className="banner5_chats">
        <Image layout="intrinsic" src="/Group.svg" width="500px" height="500px" />
      </div>
      <div className="banner5_content">
        <h1>
          <b>{template.banner5.card3.cardHeader}</b>
        </h1>
        <p>{template.banner5.card3.cardText}</p>
      </div>
    </div>
  </div>
);

export default Banner5;
