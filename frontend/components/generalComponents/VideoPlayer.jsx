import ReactPlayer from 'react-player/lazy';
import { Alert } from 'antd';

const VideoPlayer = ({ url }) =>
  ReactPlayer.canPlay(url) ? (
    <div className="player-wrapper">
      <ReactPlayer className="react-player" url={url} width="100%" height="100%" controls light />
    </div>
  ) : (
    <Alert message="Unsupported video" type="error" />
  );

export default VideoPlayer;
