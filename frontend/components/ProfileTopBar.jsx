import { Avatar } from "antd";
import { AntDesignOutlined, CaretDownOutlined } from "@ant-design/icons";
const ProfileTopBar = ({ setProfileOpen }) => {
  return (
    <div className="profile-top-bar" onClick={() => setProfileOpen(true)}>
      <Avatar
        size={{ xs: 20, sm: 22, md: 25, lg: 30, xl: 35, xxl: 50 }}
        icon={<AntDesignOutlined />}
      />
      <h2>Name</h2>
      <CaretDownOutlined />
    </div>
  );
};

export default ProfileTopBar;
