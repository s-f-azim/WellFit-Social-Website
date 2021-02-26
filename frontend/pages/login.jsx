import { useRouter } from "next/router";
import {
  Space,
  Form,
  Input,
  Col,
  Checkbox,
  Alert,
  Button,
  Row,
  Card,
} from "antd";
import {
  InstagramOutlined,
  GoogleOutlined,
  TwitterOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import API from "../config.js";
import { useState, useContext } from "react";
import { signin, authenticate } from "../utils/auth.js";
import { UserContext } from "../contexts/UserContext.js";

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
  const { user, setUser } = useContext(UserContext);
  // normal login handler
  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      const response = await signin(email, password);
      if (response.data.success) {
        setUser(response.data.data);
        authenticate(response.data, () => {
          router.push("/");
        });
      }
    } catch (err) {
      setHasError(true);
    }
  };
  // Google oauth login
  const googleOuthHandler = (e) => {
    e.preventDefault();
    window.open(`${API}/users/oauth/google`, "_self");
  };
  // Insta oauth login
  const instaHandler = (e) => {
    e.preventDefault();
    window.open(`${API}/users/oauth/google`, "_self");
  };
  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "85vh" }}
    >
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
              <Alert type="error" message="Unable to login" banner />
            )}
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                  message: "Invalid Email",
                },
                {
                  required: true,
                  message: "Please enter your email",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
              hasFeedback
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
              <div className="buttons">
                <Button type="primary" onClick={instaHandler}>
                  <InstagramOutlined />
                </Button>
                <Button type="primary" onClick={googleOuthHandler}>
                  <GoogleOutlined />
                </Button>
                <Button type="primary" onClick={instaHandler}>
                  <InstagramOutlined />
                </Button>
                <Button type="primary" onClick={googleOuthHandler}>
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
