import {
  Alert,
  Form,
  Row,
  Card,
  Space,
  Input,
  Select,
} from "antd";
import { updateUser } from "../utils/user.js";
import { useRouter } from "next/router";
import { UserContext } from "../contexts/UserContext.js";
import { useState, useEffect, useContext } from "react";

const infoAlertText = (
  <h4>
  Adding information on this page helps us tailor our
  <br/>
  services and allows client to be matched more
  <br/>
  efficiently, as well as knowing who you are and how
  <br/>
  you work before initiating contact. We encourage
  <br/>
  but do not require you to provide this information.
  </h4>
)

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

// Instructor Questionnaire
const InstQuest = () => {
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
    <Alert
    message="This page is optional"
    description= {infoAlertText}
    type="info"
    showIcon
    />
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
    <br/>
    <h2> Overview of your profile: </h2>
    <Form.Item
    name= "Qualification"
    label= "Qualification(s)">
    <Select placeholder="Select your qualification">
    <Option value="Physique trainer">Physique trainer</Option>
    <Option value="Performance trainer">Performance trainer</Option>
    <Option value="Lifestyle trainer">Lifestyle trainer</Option>
    <Option value="Other">Other/Several of the above</Option>
    </Select>
    </Form.Item>
    <h2> Your career: </h2>
    <h2> Communication: </h2>
    <h2> Payment and rates: </h2>
    <h2> Additional info: </h2>
    </Space>
    </Form>
    </>
  )
}
export default InstQuest;




// for instructors:
/*
achievements
official diplomas?
speciality as instructor
feedback from other clients
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
