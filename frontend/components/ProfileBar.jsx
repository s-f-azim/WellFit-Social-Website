import { Avatar } from "antd";
import {
  AntDesignOutlined,
  SettingOutlined,
  HistoryOutlined,
  EditOutlined,
  LogoutOutlined,
  CloseOutlined,
} from "@ant-design/icons";
const ProfileBar = ({ profileOpen, setProfileOpen }) => {
  return (
    <div className={`profile-bar ${profileOpen ? "active" : ""}`}>
      <CloseOutlined onClick={() => setProfileOpen(false)} />
      <Avatar
        className="profile-pic"
        size={{ xs: 59, sm: 68, md: 75, lg: 85, xl: 95, xxl: 130 }}
        icon={<AntDesignOutlined />}
      />
      <h1>Name</h1>
      <div className="item">
        <HistoryOutlined />
        <h1>Purchase history</h1>
      </div>
      <div className="item">
        <EditOutlined />
        <h1>Edit profile</h1>
      </div>
      <div className="item">
        <HistoryOutlined />
        <h1>Change goals</h1>
      </div>
      <div className="item">
        <SettingOutlined />
        <h1>Settings</h1>
      </div>
      <div className="item logout">
        <LogoutOutlined />
        <h1>Logout</h1>
      </div>
    </div>
  );
};

export default ProfileBar;
