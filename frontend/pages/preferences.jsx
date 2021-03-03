import { Row, Col } from 'antd';
import Questionnaire from '../components/Questionnaire';
// import { UserContext } from "../contexts/UserContext.js";

export default function Preferences() {
  return (
    <Row style={{ height: '100vh' }} align="middle">
      <Col lg={{ span: 14, offset: 5 }}>
        <Questionnaire />
      </Col>
    </Row>
  );
}
