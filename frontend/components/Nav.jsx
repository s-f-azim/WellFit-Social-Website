import Link from "next/link";
import { Menu, Icon, Button } from "antd";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext.js";
import { getCookie } from "../utils/auth.js";
import ProfileTopBar from "./ProfileTopBar";
import ProfileBar from "./ProfileBar";
const Nav = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  // on componont mount check if the user exists in the cookies
  useEffect(() => {
    if (getCookie("user")) setUser(JSON.parse(getCookie("user")));
  }, []);

  return (
    <Menu mode="horizontal" style={{ padding: "2rem", border: "none" }}>
      {!user ? (
        <>
          <Menu.Item key="1">
            <Link href="/signup">
              <Button shape="round" size="large">
                Register
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
            <ProfileTopBar
              profileOpen={profileOpen}
              setProfileOpen={setProfileOpen}
            />
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
