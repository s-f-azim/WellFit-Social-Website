import Questionnaire from "../components/Questionnaire.jsx";
import {
  Layout,
  Row,
  Col,
  Card,
} from "antd";

const { Content, Footer } = Layout;

export default function Preferences() {
  return (
    <Row>
      <Col span={14} offset={5} >
          <Questionnaire />
      </Col>
    </Row>
  );
}