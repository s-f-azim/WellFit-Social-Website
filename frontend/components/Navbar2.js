import {Layout, Menu, Icon, Breadcrumb, Button, Typography, Input, Space, Row, Col} from 'antd';
const {Header} = Layout;
const {Search} = Input;
const { Title } = Typography;
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext.js";
import { getCookie } from "../utils/auth.js";
import ProfileBar from "./ProfileBar";


const LoggedInMenu = ({ profileOpen, setProfileOpen }) => {
    const { user, setUser } = useContext(UserContext);
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    
    return (
        <>
        <div className="buttons">
            <ul className={click ? "nav-options activs" : "nav-options"}>
                <li className="option" onClick={closeMobileMenu}>
                    <Button type="link" href="#">Courses</Button>
                </li>
                <li className="option" onClick={closeMobileMenu}>
                    <Button type="link" href="#">Instructors</Button>
                </li>
                <li className="option" >
                    <Button type="link" onClick={() => setProfileOpen(!profileOpen)}><img src={require("../public/person.svg")} /> {user.name}</Button>
                </li>
                <li className="option">
                    <Search placeholder="Search our Site" enterButton />
                </li>
            </ul>
        </div>
        
        <div className=" mobile-menu" >
          {click ? (
            <a className="" onClick={handleClick}>
                <img style={{width:'35px', height:'35px'}} src={require("../public/x.svg")}/>
            </a>
          ) : (
            <a className="" onClick={handleClick}>
                <img style={{width:'35px', height:'35px'}} src={require("../public/list.svg")}/>
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
            <ul className={click ? "nav-options activs" : "nav-options"}>
                <li className="option" onClick={closeMobileMenu}>
                    <Button type="primary" href="/login">Sign In</Button>
                </li>
                <li className="option" onClick={closeMobileMenu}>
                    <Button type="link" href="/signup">Sign Up</Button>
                </li>
            </ul>
        </div>
        
        <div className=" mobile-menu" >
          {click ? (
            <a className="" onClick={handleClick}>
                <img style={{width:'35px', height:'35px'}} src={require("../public/x.svg")}/>
            </a>
          ) : (
            <a className="" onClick={handleClick}>
                <img style={{width:'35px', height:'35px'}} src={require("../public/list.svg")}/>
            </a>
          )}
        </div>
      </>
    );
  };

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  // on componont mount check if the user exists in the cookies
  useEffect(() => {
    if (getCookie("user")) setUser(JSON.parse(getCookie("user")));
     }, []);
  return (  
    <>  
        <Header className="topheader" style={{backgroundColor: "white"}}>
            <Title level={2} className="logo-text">InstaFit</Title>
                {
                    user===null ? <LoggedOutMenu/> : <>
                        <LoggedInMenu profileOpen={profileOpen} setProfileOpen={setProfileOpen}/>     
                        <ProfileBar profileOpen={profileOpen} setProfileOpen={setProfileOpen}/>
                    </>
                }
        </Header>
    </>);

}
    

 

export default Navbar;