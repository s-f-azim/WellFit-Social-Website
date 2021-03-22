import { useRouter } from 'next/router';
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/client';
import { Space, Form, Input, Alert, Button, Row, Card, notification, Modal } from 'antd';
import {
  InstagramOutlined,
  GoogleOutlined,
  FacebookOutlined,
  SmileOutlined,
  QuestionOutlined,
} from '@ant-design/icons';
import { login } from '../services/auth';
import API from '../services/api';

// layout and styling for form
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Login = () => {
  const router = useRouter();
  const [hasError, setHasError] = useState(false);
  const [form] = Form.useForm();

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const showAlert = () => {
    setIsAlertVisible(true);
  };

  const handleOk = () => {
    setIsAlertVisible(false);
  };

  const errorInfoText = (
    <p>
      You may have failed to login for the following reasons:
      <ul>
        <li>You have entered incorrect details, make sure caps lock is turned off.</li>
        <li>You have deleted your account or asked us to delete it for you</li>
        <li>Our website is undergoing maintenance and our servers are currently unavailable</li>
        <li>
          You have been banned from WellFit for irresponsible behaviour. Contact us to appeal this
          decision if you feel it is unfair.
        </li>
      </ul>
    </p>
  );

  const errorText = (
    <>
      Unable to login
      <Button type="link" danger onClick={showAlert}>
        <QuestionOutlined />
      </Button>
      <Modal
        closable={false}
        cancelButtonProps={{ style: { display: 'none' } }}
        title="Why can't I login?"
        visible={isAlertVisible}
        onOk={handleOk}
      >
        {errorInfoText}
      </Modal>
    </>
  );

  // normal login handler
  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      // await login(email, password);
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if (res?.error) throw new error('Unable to login');
      await login(email, password);
      notification.open({
        message: 'Welcome back!',
        duration: 2,
        icon: <SmileOutlined style={{ color: '#63D0FF' }} />,
      });
      router.push('/');
    } catch (err) {
      setHasError(true);
    }
  };
  // Google oauth login
  const googleOuthHandler = (e) => {
    e.preventDefault();
    window.open(`${API}/users/oauth/google`, '_self');
  };
  // Insta oauth login
  const instaOauthHandler = (e) => {
    e.preventDefault();
    window.open(`${API}/users/oauth/instagram`, '_self');
  };
  // facebook oauth login
  const facebookOuthHandler = (e) => {
    e.preventDefault();
    window.open(`${API}/users/oauth/facebook`, '_self');
  };
  return (
    <Row type="flex" justify="center" align="middle" style={{ minHeight: '85vh' }}>
      <Card>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Space direction="vertical" size="large">
            {hasError && <Alert type="error" message={errorText} banner />}
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: 'email',
                  message: 'Invalid Email',
                },
                {
                  required: true,
                  message: 'Please enter your email',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item className="submit" {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <h3>Or login with</h3>
              <div className="buttons-form">
                <Button type="primary" onClick={instaOauthHandler}>
                  <InstagramOutlined />
                </Button>
                <Button type="primary" onClick={googleOuthHandler}>
                  <GoogleOutlined />
                </Button>
                <Button type="primary" onClick={facebookOuthHandler}>
                  <FacebookOutlined />
                </Button>
              </div>
            </Form.Item>
          </Space>
        </Form>
      </Card>
    </Row>
  );
};
export default Login;
