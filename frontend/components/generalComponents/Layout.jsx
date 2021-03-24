import Navbar from '../userComponents/navigationComponents/Navbar';

const Layout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
  </>
);

export default Layout;
