import Link from "next/link";
import { Menu, Icon, Button } from "antd";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext.js";
import ProfileTopBar from "./ProfileTopBar";
import ProfileBar from "./ProfileBar";
const Nav = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const { user } = useContext(UserContext);
  return (
    <Menu mode="horizontal" style={{ padding: "2rem", border: "none" }}>
      {!user ? (
        <>
          <Menu.Item key="1">
            <Link href="/signup">
              <Button shape="round" size="large">
                Join Us
              </Button>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/login">
              <Button shape="round" size="large" type="primary">
                Login
              </Button>
            </Link>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item className="modified-item" key="3">
            <ProfileTopBar setProfileOpen={setProfileOpen} />
          </Menu.Item>
          <ProfileBar
            profileOpen={profileOpen}
            setProfileOpen={setProfileOpen}
          />
        </>
      )}
    </Menu>
  );
};

export default Nav;
