import Link from 'next/link';
import { Avatar } from 'antd';
import { useRouter } from 'next/router';
import {
  AntDesignOutlined,
  SettingOutlined,
  HistoryOutlined,
  EditOutlined,
  LogoutOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useAuth } from '../services/auth';

const ProfileBar = ({ profileOpen, setProfileOpen }) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const signout = async () => {
    const response = await logout();
    router.push('/');
  };
  return (
    <div className={`profile-bar ${profileOpen ? 'active' : ''}`}>
      <CloseOutlined onClick={() => setProfileOpen(false)} />
      <Avatar
        className="profile-pic"
        size={{
          xs: 59,
          sm: 68,
          md: 75,
          lg: 85,
          xl: 95,
          xxl: 130,
        }}
        icon={<AntDesignOutlined />}
      />
      <h1>{user.name}</h1>
      <div className="item">
        <HistoryOutlined />
        <h1>Purchase history</h1>
      </div>
      <div className="item">
        <EditOutlined />
        <h1 onClick={() => setProfileOpen(false)}>
          <Link href="/editProfile">Edit profile</Link>
        </h1>
      </div>
      <div className="item">
        <HistoryOutlined />
        <h1>Change goals</h1>
      </div>
      <div className="item">
        <SettingOutlined />
        <h1>Settings</h1>
      </div>
      <div onClick={signout} className="item logout">
        <LogoutOutlined />
        <h1>Logout</h1>
      </div>
    </div>
  );
};

export default ProfileBar;
