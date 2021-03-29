import Image from 'next/image';

const Banner5 = () => (
  <div className="banner5">
    <div className="inner_banner5">
      <div className="banner5_chats">
        <Image layout="intrinsic" src="/Chat_Right.svg" width="500px" height="200px" />
        <Image layout="intrinsic" src="/Chat_Left.svg" width="500px" height="200px" />
      </div>
      <div className="banner5_content">
        <h1>
          <b>Get individual help</b>
        </h1>
        <p>
          Chat in real time with your instructors or other users. Ask about your workouts or
          nutrition and get fast replies.
        </p>
      </div>
    </div>
  </div>
);

export default Banner5;
