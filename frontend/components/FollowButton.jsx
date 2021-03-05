import { addingFollowUser } from '../actions/user.js';
import { Button } from 'antd';

const FollowButton = ({ userId }) => {
  const addFollowUser = async () => {
    await addingFollowUser(userId);
  };
  return (
    <Button type="primary" onClick={addFollowUser}>
      Follow
    </Button>
  );
};

export default FollowButton;
