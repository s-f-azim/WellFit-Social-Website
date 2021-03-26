/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Typography, Menu, Dropdown } from 'antd';
import { useState } from 'react';
import {
  UserOutlined,
  MenuOutlined,
  CloseOutlined,
  ContactsOutlined,
  ProfileOutlined,
  CheckCircleTwoTone,
  SearchOutlined,
  ToolOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import ProfileBar from './ProfileBar';

const { Title } = Typography;

const LoggedInMenu = ({ session, profileOpen, setProfileOpen }) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const onUserNameClick = () => {
    setProfileOpen(!profileOpen);
    closeMobileMenu();
  };

  const courseMenu = (
    <Menu>
      <Menu.Item>
        <Link href="/courses">
          <Button type="text" className="menuButton" onClick={closeMobileMenu}>
            <SearchOutlined /> Browse
          </Button>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/courses/create">
          <Button type="text" className="menuButton" onClick={closeMobileMenu}>
            <ToolOutlined /> Create
          </Button>
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="buttons">
        <ul className={click ? 'nav-options activs' : 'nav-options'}>
          <li className="option">
            {session.user.role === 'instructor' ? (
              <Dropdown overlay={courseMenu} trigger={['click']}>
                <Button type="link" className="menuButton">
                  <ProfileOutlined /> Courses <DownOutlined />
                </Button>
              </Dropdown>
            ) : (
              <Link href="/courses">
                <Button type="link" className="menuButton">
                  <ProfileOutlined /> Courses
                </Button>
              </Link>
            )}
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <Link href="/search">
              <Button type="link" className="menuButton">
                <ContactsOutlined />
                Instructors
              </Button>
            </Link>
          </li>
          <li className="option">
            <Button type="link" className="menuButton" onClick={onUserNameClick}>
              <UserOutlined /> {session.user.fName}
              {session.user.verified && <CheckCircleTwoTone twoToneColor="#096dd9" />}
            </Button>
          </li>
        </ul>
      </div>

      <div className=" mobile-menu">
        {click ? (
          <a className="" onClick={handleClick}>
            <CloseOutlined />
          </a>
        ) : (
          <a className="" onClick={handleClick}>
            <MenuOutlined />
          </a>
        )}
      </div>
    </>
  );
};
const LoggedOutMenu = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <div className="buttons">
        <ul className={click ? 'nav-options activs' : 'nav-options'}>
          <li className="option" onClick={closeMobileMenu}>
            <Link href="/login">
              <Button size="large" shape="round" type="primary">
                Sign In
              </Button>
            </Link>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <Link href="/signup">
              <Button size="large" shape="round">
                Sign up
              </Button>
            </Link>
          </li>
        </ul>
      </div>

      <div className="mobile-menu">
        {click ? (
          <a className="" onClick={handleClick}>
            <CloseOutlined />
          </a>
        ) : (
          <a className="" onClick={handleClick}>
            <MenuOutlined />
          </a>
        )}
      </div>
    </>
  );
};

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [session] = useSession();

  return (
    <>
      <nav className="topheader" style={{ backgroundColor: 'white' }}>
        <Title level={1} className="logo-text">
          <a href="/">
            <div>
              Well<span style={{ color: '#ffa277' }}>F</span>it
            </div>
          </a>
        </Title>
        {!session ? (
          <LoggedOutMenu />
        ) : (
          <>
            <LoggedInMenu
              session={session}
              profileOpen={profileOpen}
              setProfileOpen={setProfileOpen}
            />
            <ProfileBar
              session={session}
              profileOpen={profileOpen}
              setProfileOpen={setProfileOpen}
            />
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
