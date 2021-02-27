/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Avatar } from 'antd';
import { AntDesignOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

const ProfileTopBar = ({ profileOpen, setProfileOpen }) => {
  const { user } = useContext(UserContext);
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="profile-top-bar"
      onClick={() => setProfileOpen(!profileOpen)}
    >
      <Avatar
        size={{
          xs: 20, sm: 22, md: 25, lg: 30, xl: 35, xxl: 50,
        }}
        icon={<AntDesignOutlined />}
      />
      <h2>{user.name}</h2>
      <CaretDownOutlined />
    </div>
  );
};

export default ProfileTopBar;
