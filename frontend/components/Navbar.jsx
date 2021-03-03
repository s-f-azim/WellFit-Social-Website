import { Button, Typography, Input } from 'antd';
const { Search } = Input;
const { Title } = Typography;
import { useState, useContext } from 'react';
import Link from 'next/link';
import UserContext from '../contexts/UserContext';
import ProfileBar from './ProfileBar';

const LoggedInMenu = ({ profileOpen, setProfileOpen }) => {
  const { user, setUser } = useContext(UserContext);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

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
            <Button type="link" className="menuButton" onClick={() => setProfileOpen(!profileOpen)}>
              <img src={require('../public/person.svg')} /> {user.name}
            </Button>
          </li>
        </ul>
      </div>

      <div className=" mobile-menu">
        {click ? (
          <a className="" onClick={handleClick}>
            <img style={{ width: '35px', height: '35px' }} src={require('../public/x.svg')} />
          </a>
        ) : (
          <a className="" onClick={handleClick}>
            <img style={{ width: '35px', height: '35px' }} src={require('../public/list.svg')} />
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
            <img style={{ width: '35px', height: '35px' }} src={require('../public/x.svg')} />
          </a>
        ) : (
          <a className="" onClick={handleClick}>
            <img style={{ width: '35px', height: '35px' }} src={require('../public/list.svg')} />
          </a>
        )}
      </div>
    </>
  );
};

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <>
      <nav className="topheader" style={{ backgroundColor: 'white' }}>
        <Title level={1} className="logo-text">
          <a href="/"> InstaFit </a>
        </Title>
        {user === null ? (
          <LoggedOutMenu />
        ) : (
          <>
            <LoggedInMenu profileOpen={profileOpen} setProfileOpen={setProfileOpen} />
            <ProfileBar profileOpen={profileOpen} setProfileOpen={setProfileOpen} />
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
