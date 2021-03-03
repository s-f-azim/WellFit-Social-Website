import { useRouter } from 'next/router';
import { Space, Form, Input, Checkbox, Alert, Button, Row, Card } from 'antd';
import { useState } from 'react';
import { signup } from '../utils/auth';

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
const Signup = () => {
  const router = useRouter();
  const [hasError, setHasError] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const { email, name, password } = values;
    try {
      const response = await signup(name, email, password);
      if (response.data.success) {
        router.push('/');
      }
    } catch (err) {
      setHasError(true);
    }
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
            {hasError && (
              <Alert type="error" message="this user already exists please try again" banner />
            )}
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
              name="name"
              label="Name"
              rules={[
                {
                  min: 3,
                  message: 'Name should be 3 or more letters',
                },
                {
                  required: true,
                  message: 'Please enter your name',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please enter your password' },
                { min: 8, message: 'Password must be minimum 8 characters' },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Sorry the passwords do not match');
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject('Please accept the consumer agreement'),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                I have read the <a href="/">agreement</a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Card>
    </Row>
  );
};
export default Signup;
