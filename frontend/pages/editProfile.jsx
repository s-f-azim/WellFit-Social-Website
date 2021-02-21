import axios from "axios";
import { useRouter } from "next/router";
import API from "../config";
import { Space, Form, Input, Checkbox, Alert, Button, Row, Card, Select } from "antd";
import { useState } from "react";

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
  const [hasError, setHasError] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const { gender, location } = values;
    try {
      const response = await axios.patch(`${API}/users/editProfile`, {
        gender: gender,
        location: location,
      });
      if (response.data.success) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
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
    <Space direction="vertical" size="large">
    {hasError && (
      <Alert
      type="error"
      message="something went wrong, please try again"
      banner
      />
    )}
    <Form.Item
    name="gender"
    label="gender"
    rules={[
      {
        required: true,
        message: "Please select your gender",
      },
    ]}
    >

    <Select placeholder="Select your gender">
    <Option value="male">Male</Option>
    <Option value="lucy">Female</Option>
    <Option value="nonbinary"> Non-Binary</Option>
    <Option value="prefernottosay">Prefer not to say</Option>
    </Select>
    </Form.Item>

    <Form.Item
    name="location"
    label="Location"
    rules={[
      {
        required: true,
        message: "Please select your location",
      },
    ]}
    >
    <Select placeholder="Select your location">
    <Option value="europe">Europe</Option>
    <Option value="asia">Asia</Option>
    <Option value="NA">North America</Option>
    <Option value="SA">South America</Option>
    <Option value="australia">Australia</Option>
    <Option value="africa">Africa</Option>
    </Select>
    </Form.Item>

    <Form.Item {...tailFormItemLayout}>
    <Button type="primary" htmlType="submit">
    Update my info
    </Button>
    </Form.Item>
    </Space>
    </Form>
    </Card>
    </Row>
  )
}

export default editProfilePage;
