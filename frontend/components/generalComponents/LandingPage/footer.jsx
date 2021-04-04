import { Button } from 'antd';

const Footer = () => (
  <div className="footer_banner">
    <div className="inner_footer_banner">
      <div className="footer_box">
        <h2>
          Well<span style={{ color: '#ffa277' }}>F</span>it
        </h2>
        <h3>
          <b>Curious?</b>
        </h3>
        <Button className="footerButton" href="/signup" size="large">
          Join now!
        </Button>
      </div>
      <div className="footer_box_links">
        <h4>
          <b>Legal Stuff</b>
        </h4>
        <ul>
          <li>Privacy Policy</li>
          <li>GDPR Notice</li>
          <li>
            <a href="/TandCs">Terms of Use</a>
          </li>
        </ul>
      </div>
      <div className="footer_box_links">
        <h4>
          <b>Quick links</b>
        </h4>
        <ul>
          <li>
            <a href="/search">Search</a>
          </li>
          <li>
            <a href="/login">Log In</a>
          </li>
          <li>
            <a href="/signup">Sign Up</a>
          </li>
          <li>Contact Us</li>
        </ul>
      </div>
      <p className="copyright">
        <b>&#169; Wellfit 2021</b>
        <br />
        <a href="https://www.freepik.com/vectors/background">
          Background vector created by tartila - www.freepik.com
        </a>
        <br />
      </p>
    </div>
  </div>
);
export default Footer;
