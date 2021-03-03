import Questionnaire from '../components/Questionnaire.jsx';
import { Layout, Row, Col } from 'antd';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
//import { UserContext } from "../contexts/UserContext.js";

const { Content, Footer } = Layout;

export default function Preferences() {
  const router = useRouter();
  //  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
    //if (!user) router.push("/");
  }, []);

  return (
    <Row style={{ height: '100vh' }} align="middle">
      <Col lg={{ span: 14, offset: 5 }}>
        <Questionnaire />
      </Col>
    </Row>
  );
}
