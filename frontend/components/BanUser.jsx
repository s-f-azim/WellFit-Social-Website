import { useState } from 'react';
import { Button, Form, notification, Space, Alert, Input, Card } from 'antd';
import { CheckOutlined, DownCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { deleteSpecificUser } from '../actions/user';

const BanUser = ({ users }) => {
  const router = useRouter();
  const [hasError, setHasError] = useState(false);
  const [form] = Form.useForm();

  const onDeleteUser = async (values) => {
    const { deleteEmail } = values;
    try {
      // eslint-disable-next-line no-underscore-dangle
      const toBan = users.filter((user) => user.email === deleteEmail)[0]._id;

      const response = await deleteSpecificUser(toBan);
      notification.open({
        message: 'user account has been deleted',
        duration: 3,
        icon: <CheckOutlined style={{ color: '#33FF49' }} />,
      });

      router.replace(router.asPath);
      form.resetFields();
      setHasError(false);
    } catch (err) {
      setHasError(true);
    }
  };

  const onBanUser = async (values) => {
    const { banEmail } = values;
    try {
      // eslint-disable-next-line no-underscore-dangle
      const toBan = users.filter((user) => user.email === banEmail)[0]._id;

      const response = await deleteSpecificUser(toBan);
      notification.open({
        message: 'user account has been deleted',
        duration: 3,
        icon: <CheckOutlined style={{ color: '#33FF49' }} />,
      });

      router.replace(router.asPath);
      form.resetFields();
      setHasError(false);
    } catch (err) {
      setHasError(true);
    }
  };

  return (
    <Card>
      <Form form={form} name="Delete a user" onFinish={onDeleteUser}>
        <Space direction="vertical" size="middle">
          {hasError && (
            <Alert type="error" message="something went wrong, please try again" banner />
          )}
          <h3>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Delete an account (enter user's email) <DownCircleOutlined />
          </h3>
          <Form.Item
            name="deleteEmail"
            rules={[
              {
                type: 'email',
                message: 'Invalid Email',
              },
              {
                required: true,
                message: 'Please enter an email',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              <WarningOutlined /> Delete user
            </Button>
          </Form.Item>
        </Space>
      </Form>

      <Form form={form} name="Ban a user" onFinish={onBanUser}>
        <Space direction="vertical" size="middle">
          {hasError && (
            <Alert type="error" message="something went wrong, please try again" banner />
          )}
          <h3>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Ban an account (enter user's email) <DownCircleOutlined />
          </h3>
          <Form.Item
            name="banEmail"
            rules={[
              {
                type: 'email',
                message: 'Invalid Email',
              },
              {
                required: true,
                message: 'Please enter an email',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              <WarningOutlined /> Perma ban user
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Card>
  );
};

export default BanUser;
