import {
  Alert,
  Form,
  Row,
  Card,
  Space,
  Col,
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
    <h2> Your career: </h2>
    <h2> Communication: </h2>
    <h2> Payment and rates: </h2>
    <h2> Additional info: </h2>
    <Form.Item>
    </Form.Item>
    </Space>
    </Form>
    </>
  )
}
export default InstQuest;

// For client:
/*
profilePicture
weight
height
bmi -> slider
goals
pregnancy (women) check box
fitnessLevel slider
hypertrophyLevel slider
strengthLevel slider
caloricIntake dropdown
injuries (past present) inputs added to list
past or present steroid use (optional) same
healthConditions same
gymAvailable checkbox?
preferredTrainingDuration slider
*/
