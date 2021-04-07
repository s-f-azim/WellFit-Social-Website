/* eslint-disable no-underscore-dangle */
import Link from 'next/link';
import { Avatar, notification } from 'antd';
import { useRouter } from 'next/router';
import {
  SettingOutlined,
  EditOutlined,
  LogoutOutlined,
  CheckOutlined,
  CloseOutlined,
  SendOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/client';
import { logout } from '../../../services/auth';
import { getUserPhotos } from '../../../actions/user';

const ProfileBar = ({ session, profileOpen, setProfileOpen }) => {
  const router = useRouter();
  const [photo, setPhoto] = useState();

  const signout = async () => {
    setProfileOpen(false);
    await logout();
    notification.open({
      message: 'Signed out',
      duration: 2,
      icon: <CheckOutlined style={{ color: '#70FF00' }} />,
    });
    signOut({ redirect: false });
    router.replace('/login');
  };

  const GoToeditProfile = () => {
    setProfileOpen(false);
    router.push('/editProfile');
  };

  useEffect(() => setProfileOpen(false), [router.pathname]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getUserPhotos(session.user._id);
        if (res.data.data[0]) setPhoto(res.data.data[0]);
      } catch (error) {
        setPhoto(null);
      }
    }
    fetchData();
  }, []);

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
        src={
          photo ? (
            `data:image/png;base64,${Buffer.from(photo).toString('base64')}`
          ) : (
            <h1>
              <UserOutlined />
            </h1>
          )
        }
      />
      <h1 className="item">
        <UserOutlined />
        <Link href={`/users/${session.user._id}`}>{session.user.fName}</Link>
      </h1>
      <div className="item edit" onClick={GoToeditProfile}>
        <EditOutlined />
        <h1>Edit profile</h1>
      </div>
      <div className="item">
        <SendOutlined />
        <h1>
          <Link href="/chats">Chats</Link>
        </h1>
      </div>
      <div className="item">
        <SettingOutlined />
        <h1>
          <Link href="/settings">Settings</Link>
        </h1>
      </div>
      {session.user.role === 'admin' && (
        <div className="item">
          <SettingOutlined />
          <h1>
            <Link href="/adminDashboard">Admin</Link>
          </h1>
        </div>
      )}

      <div onClick={signout} className="item logout">
        <LogoutOutlined />
        <h1>Logout</h1>
      </div>
    </div>
  );
};

export default ProfileBar;
