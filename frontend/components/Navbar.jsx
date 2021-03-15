/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Typography, Input } from 'antd';
import { useState } from 'react';
import { UserOutlined, MenuOutlined, CloseOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import ProfileBar from './ProfileBar';

const { Search } = Input;
const { Title } = Typography;

const LoggedInMenu = ({ session, profileOpen, setProfileOpen }) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const onUserNameClick = () => {
    setProfileOpen(!profileOpen);
    closeMobileMenu();
  };

  return (
    <>
      <div className="buttons">
        <ul className={click ? 'nav-options activs' : 'nav-options'}>
          <li className="option">
            <Search placeholder="Search our Site" enterButton />
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <Link href="#">
              <Button type="link" className="menuButton">
                Courses
              </Button>
            </Link>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <Link href="#">
              <Button type="link" className="menuButton">
                Instructors
              </Button>
            </Link>
          </li>
          <li className="option">
            <Button type="link" className="menuButton" onClick={onUserNameClick}>
              <UserOutlined /> {session.user.fName}
              {session.user.verified && <CheckCircleTwoTone twoToneColor="#52c41a" />}
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
          <a href="/"> QuickFit </a>
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
