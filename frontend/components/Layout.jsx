import Nav from "../components/Nav.jsx";
import Navbar from "../components/Navbar.jsx";

const Layout = ({ children }) => {
  return (
    <>
      {/*<Nav /> */}
      <Navbar/>
      <main>{children}</main>
    </>
  );
};

export default Layout;
