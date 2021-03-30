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
        <p>Benefit from interactions with your favorite instructors</p>
        <p>Chat in real time with your instructors or other users.</p>
        <p> Have questions about your workouts or nutrition?</p>
        <p> Send a message and get a fast answer</p>
      </div>
      <div className="banner5_chats">
        <Image layout="intrinsic" src="/computer.svg" width="500px" height="500px" />
      </div>
      <div className="banner5_content">
        <h1>
          <b>Follow and Interact</b>
        </h1>
        <p>Follow other users and instructors</p>
        <p>Post your thought or links to other resources</p>
        <p>See what others have to say</p>
      </div>
    </div>
  </div>
);

export default Banner5;
