import { useRouter } from 'next/router';
import { Space, Form, Input, Checkbox, Alert, Button, Row, Card, notification, Select } from 'antd';
import { SmileOutlined, RocketOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { signup } from '../services/auth';

const { Option } = Select;

// basic form styling
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
    const { role, email, fName, lName, password, address } = values;
    try {
      const response = await signup(role, email, fName, lName, password, address);
      if (response.data.success) {
        notification.open({
          message: 'Signed up successfully!',
          duration: 2,
          icon: <SmileOutlined style={{ color: '#63D0FF' }} />,
        });
        router.push('/login');
      }
    } catch (err) {
      setHasError(true);
    }
  };
  return (
    <div className="signup">
      <NextSeo
        title="Register Page"
        description="A page from which a user can register their WellFit account."
      />
      <Row type="flex" justify="center" align="middle" style={{ minHeight: '85vh' }}>
        <Card>
          <h1>
            A Healthier Life Awaits! <RocketOutlined />
          </h1>
          <Form form={form} name="register" onFinish={onFinish} scrollToFirstError>
            <Space direction="vertical" size="large">
              {hasError && (
                <Alert type="error" message="this user already exists, please try again" banner />
              )}
              <Form.Item
                name="role"
                label="Register as"
                rules={[
                  {
                    required: true,
                    message: 'Please select a role',
                  },
                ]}
              >
                <Select aria-label="select">
                  <Option value="client">Client</Option>
                  <Option value="instructor">Instructor</Option>
                </Select>
              </Form.Item>
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
                <Input aria-label="email" />
              </Form.Item>
              <Form.Item
                name="fName"
                label="First name"
                rules={[
                  {
                    min: 2,
                    message: 'Name should be 2 or more letters',
                  },
                  {
                    required: true,
                    message: 'Please enter your first name',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lName"
                label="Last name"
                rules={[
                  {
                    min: 2,
                    message: 'Name should be 2 or more letters',
                  },
                  {
                    required: true,
                    message: 'Please enter your last name',
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
                <Input.Password aria-label="password" />
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
                <Input.Password aria-label="confirm" />
              </Form.Item>
              <Form.Item label="Location (if applicable):" name="address">
                <Input aria-label="location" />
              </Form.Item>
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject('Please accept the terms and conditions'),
                  },
                ]}
              >
                <Checkbox aria-label="agreement">
                  I have read and agreed to the <a href="/TandCs">Terms and Conditions</a>.
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
    </div>
  );
};
export default Signup;
