import { updateUser } from "../utils/user.js";
import { useRouter } from "next/router";
import { UserContext } from "../contexts/UserContext.js";
import {
  Space,
  Form,
  Input,
  Checkbox,
  Alert,
  Button,
  Row,
  Card,
  Select,
  InputNumber,
  Menu,
  Tabs
} from "antd";
import { useState, useEffect, useContext } from "react";

const { Option } = Select;

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

const editProfilePage = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  //redirect to home page if user not logged in
  useEffect(() => {
    if (!user) router.push("/");
  }, []);
  const [hasError, setHasError] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
    const { gender, location, age, nickname, bio } = values;
    try {
      const response = await updateUser(gender, location, age, nickname, bio);
      if (response.data.success) {
        router.push("/");
      }
    } catch (err) {
      setHasError(true);
    }
  };

  const onFinishEdit = async (values) => {
    const { email, password } = values;
    try {
      const response = await updateUser(email, password);
      if (response.data.success) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      setHasError(true);
    }
  };

  const { TabPane } = Tabs;

  return (
    <Row
    type="flex"
    justify="center"
    align="middle"
    style={{ minHeight: "85vh" }}
    >
    <Card>
    <Tabs defaultActiveKey="1">
    <TabPane tab="Add Info" key="1">
    <Form
    {...formItemLayout}
    form={form}
    name="Update my info"
    onFinish={onFinish}
    scrollToFirstError
    >
    <Space direction="vertical" size="middle">
    {hasError && (
      <Alert
      type="error"
      message="something went wrong, please try again"
      banner
      />
    )}
    <h1 align="center">Modify profile information</h1>
    <Alert
    message="This helps instructors know about you right away"
    type="info"
    showIcon
    />
    <Form.Item name="gender" label="Gender">
    <Select placeholder="Select your gender">
    <Option value="Male">Male</Option>
    <Option value="Female">Female</Option>
    <Option value="Non-Binary"> Non-Binary</Option>
    <Option value="Prefer not to say">Prefer not to say</Option>
    </Select>
    </Form.Item>

    <Form.Item name="location" label="Location">
    <Select placeholder="Select your location">
    <Option value="Europe">Europe</Option>
    <Option value="Asia">Asia</Option>
    <Option value="North America">North America</Option>
    <Option value="South America">South America</Option>
    <Option value="Australia">Australia</Option>
    <Option value="Africa">Africa</Option>
    </Select>
    </Form.Item>

    <Form.Item
    name="age"
    label="Age"
    rules={[
      {
        type: "number",
        min: 0,
        max: 120,
      },
    ]}
    >
    <InputNumber />
    </Form.Item>

    <Form.Item name="nickname" label="Nickname">
    <Input />
    </Form.Item>

    <Form.Item name="bio" label="Bio">
    <Input.TextArea />
    </Form.Item>

    <Form.Item {...tailFormItemLayout}>
    <Button type="primary" htmlType="submit">
    Update my info
    </Button>
    </Form.Item>
    </Space>
    </Form>
    </TabPane>




    <TabPane tab="Edit Account" key="2">
    <Form
    {...formItemLayout}
    form={form}
    name="Edit my info"
    onFinish={onFinishEdit}
    scrollToFirstError
    >
    <Space direction="vertical" size="middle">
    {hasError && (
      <Alert
      type="error"
      message="something went wrong, please try again"
      banner
      />
    )}
    <h1 align="center">Change your email or password</h1>
    </Space>
    <Form.Item
    name="email"
    label="New email"
    rules={[
      {
        type: "email",
        message: "Invalid Email",
      }
    ]}
    >
    <Input />
    </Form.Item>
    <Form.Item
    name="password"
    label="New password"
    hasFeedback
    >
    <Input.Password />
    </Form.Item>
    <Form.Item
    name="confirm"
    label="Confirm Password"
    dependencies={["password"]}
    hasFeedback
    rules={[
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject("Sorry the passwords do not match");
        },
      }),
    ]}
    >
    <Input.Password />
    </Form.Item>
    <Form.Item className="submit" {...tailFormItemLayout}>
    <Button type="primary" htmlType="submit">
    Confirm
    </Button>
    </Form.Item>
    </Form>
    </TabPane>
    </Tabs>
    </Card>
    </Row>

  );
};

export default editProfilePage;
