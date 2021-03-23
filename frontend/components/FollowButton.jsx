import { Button } from 'antd';
import { addingFollowUser } from '../actions/user';

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
