import { useState } from 'react';
import { Button, Form, notification, Space, Alert, Input } from 'antd';
import { CheckOutlined, DownCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { deleteSpecificUser } from '../../actions/user';

const DeleteUser = ({ users }) => {
  const router = useRouter();
  const [hasError, setHasError] = useState(false);
  const [form] = Form.useForm();

  const onDeleteUser = async (values) => {
    const { deleteEmail } = values;
    try {
      // eslint-disable-next-line no-underscore-dangle
      const toDelete = users.filter((user) => user.email === deleteEmail)[0]._id;

      const response = await deleteSpecificUser(toDelete);
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
    <>
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
            <Input aria-label="email" />
          </Form.Item>

          <Form.Item>
            <Button aria-label="delete" type="primary" htmlType="submit">
              <WarningOutlined /> Delete user
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </>
  );
};

export default DeleteUser;
