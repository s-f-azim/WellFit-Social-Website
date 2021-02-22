import {Layout, Menu, Breadcrumb, Button, Typography} from 'antd';
import {useState} from 'react';
const {Header, Content, Sider} = Layout;
const { Title } = Typography;


function RightButtons({user}) {
    return(
       <>
       <Menu mode="horizontal" className="buttons">
           <Menu.Item>
               <Button type="link">
                   Join us
               </Button>
           </Menu.Item>
           <Menu.Item>
               <Button type="primary">
                   Login
               </Button>
           </Menu.Item>
       </Menu>
       </>

    );
}

function LoggedInButtons({user}) {
    return(
        <div className="buttons">
            {/* TODO: add link to user profile*/}
            <Button type="primary" >
                {`Welcome ${user.name}`}
            </Button>
        </div>
    );
}


function Navbar2({user}) {
    return (    
        <Header className="topheader" style={{backgroundColor: "white"}}>
            <div className="logo" type="flex">
                <Title level={3} className="logo-text">InstaFit</Title>
            </div> 
            
            {user===null ? <RightButtons user={user}/> : <LoggedInButtons user={user}/>}
        </Header>);
  }

 

export default Navbar2;