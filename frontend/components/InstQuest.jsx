import {
  Alert,
  Form,
  Row,
  Card,
  Space,
  Input,
  Select,
  Collapse,
  Button,
} from "antd";
import { updateUser } from "../utils/user.js";
import { useRouter } from "next/router";
import { UserContext } from "../contexts/UserContext.js";
import { useState, useEffect, useContext } from "react";
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

const yourCareerText = (
  <h2> Your career </h2>
);
const communicationText = (
  <h2> Client Communication </h2>
);

const { Panel } = Collapse;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 11 },
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

// Instructor Questionnaire
const InstQuest = () => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const showAlert = () => {
    setIsAlertVisible(true);
  };

  const handleOk = () => {
    setIsAlertVisible(false);
  };

  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  //redirect to home page if user not logged in
  useEffect(() => {
    if (!user) router.push("/");
  }, []);
  const [hasError, setHasError] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await updateUser(values);
      if (response.data.success) {
        router.push("/");
      }
    } catch (err) {
      setHasError(true);
    }
  };

  return (
    <>
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
    <Collapse bordered={false} ghost = {true}>
    <Panel header={yourCareerText} key="1">

    <Form.Item
    name= "Trainer type"
    label= "Trainer type">
    <Select placeholder="Select your qualification">
    <Option value="Physique trainer">Physique trainer</Option>
    <Option value="Performance trainer">Performance trainer</Option>
    <Option value="Lifestyle trainer">Lifestyle trainer</Option>
    <Option value="Other">Other</Option>
    </Select>
    </Form.Item>

    <Form.Item
    name = "qualifications"
    label = "Qualifications">
    <Form.List name="qualifications">
    {(fields, { add, remove }) => (
      <>
      {fields.map(field => (
        <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
        <Form.Item
        {...field}
        name={[field.name, 'Qualification']}
        fieldKey={[field.fieldKey, 'Qualification']}
        >
        <Input style={{ width: "90%"}} placeholder="Enter your qualification" />
        <CloseOutlined style = {{color: "red", margin: "7px"}} onClick={() => remove(field.name)} />
        </Form.Item>
        </Space>
      ))}
      <Form.Item>
      <Button style={{ width: "60%"}} onClick={() => add()} block icon={<PlusOutlined style = {{color: "#33FF49"}} />}>
      Add a Qualification
      </Button>
      </Form.Item>
      </>
    )}
    </Form.List>
    </Form.Item>

    <Form.Item
    name = "specialty"
    label = "Field of expertise">
    <Input placeholder = "bodybuilding, Yoga, nutrition..."/>
    </Form.Item>

    <Form.Item
    name = "Customer stories"
    label = "Customer stories">
    <Form.List name="Customer stories">
    {(fields, { add, remove }) => (
      <>
      {fields.map(field => (
        <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
        <Form.Item
        {...field}
        name={[field.name, 'Customer story']}
        fieldKey={[field.fieldKey, 'Customer story']}
        >

        <TextArea showCount maxLength={200} style={{ width: "90%"}} placeholder="Enter a past customer story, or feedback received" />
        <CloseOutlined style = {{color: "red", margin: "7px"}} onClick={() => remove(field.name)} />
        </Form.Item>
        </Space>
      ))}
      <Form.Item>
      <Button style={{ width: "60%"}} onClick={() => add()} block icon={<PlusOutlined style = {{color: "#33FF49"}} />}>
      Add a customer story
      </Button>
      </Form.Item>
      </>
    )}
    </Form.List>
    </Form.Item>
    </Panel>
    
    <Panel header={communicationText} key="2">


    </Panel>
    </Collapse>

    <h2> Payment and rates </h2>
    <h2> Additional info </h2>

    <Form.Item {...tailFormItemLayout}>
    <Button type="primary" htmlType="submit">
    Update/Confirm my info
    </Button>
    </Form.Item>
    </Space>
    </Form>
    </>
  )
}
export default InstQuest;




// for instructors:
/*
avaialble packages
price range
service format
communication frequency
preferred way of Communication
Payment options
preferred experience level in:
-overall fitness
-hypertrophy
-strength
preferred gender to work with
*/
