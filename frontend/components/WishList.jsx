import { Space } from 'antd';
import CustomCard from './CustomCard';
import { useAuth } from '../services/auth';

const WishList = () => {
  const { user } = useAuth();

  return (
    <div>
      <Space direction="vertical" size="large">
        {user.wishList.length === 0 ? (
          <p> Your wish list is currently empty.</p>
        ) : (
          <>
            <CustomCard />
            <br />
            <br />
            <br />
            The length of the wishlist is {user.wishList.length}
            <br />
            The id of the course is: {user.wishList[0]}
            <br />
          </>
        )}
      </Space>
    </div>
  );
};

//border: 'solid', borderWidth: '0.1rem'

export default WishList;
