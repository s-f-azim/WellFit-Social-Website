import ReactPlayer from 'react-player';

const VideoPlayer = ({ url }) => (
  <div className='player-wrapper'>
    <ReactPlayer
      className='react-player'
      url={url}
      width='100%'
      height='100%'
      controls
      light
    />
  </div>
);

export default VideoPlayer;