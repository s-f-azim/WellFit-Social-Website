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
  Pagination,
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
    const { gender, location } = values;
    try {
      const response = await updateUser(gender, location, age, nickname, bio);
      if (response.data.success) {
        router.push("/");
      }
    } catch (err) {
      setHasError(true);
    }
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
    <h1 align = "center">Add profile information</h1>
    <Alert message="This helps instructors know about you right away" type="warning" showIcon />
    <Form.Item
    name="gender"
    label="Gender"
    rules={[
      {

      },
    ]}
    >
    <Select placeholder="Select your gender">
    <Option value="Male">Male</Option>
    <Option value="Female">Female</Option>
    <Option value="Non-Binary"> Non-Binary</Option>
    <Option value="Prefer not to say">Prefer not to say</Option>
    </Select>
    </Form.Item>

    <Form.Item
    name="location"
    label="Location"
    rules={[
      {

      },
    ]}
    >
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
          type: 'number',
          min: 0,
          max: 120,
        },
      ]}
    >
      <InputNumber />
    </Form.Item>

    <Form.Item
      name="nickname"
      label="Nickname"
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="bio"
      label="Bio"

    >
      <Input.TextArea />
    </Form.Item>

    <Form.Item {...tailFormItemLayout}>
    <Button type="primary" htmlType="submit">
    Update my info
    </Button>
    </Form.Item>
    <Pagination simple defaultCurrent={1} total={20} />
    </Space>
    </Form>
    </Card>
    </Row>
  );
};

export default editProfilePage;
