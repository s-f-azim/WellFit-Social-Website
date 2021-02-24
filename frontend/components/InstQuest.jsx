import {
  Alert,
  Form,
  Row,
  Card,
  Space,
} from "antd";
import { updateUser } from "../utils/user.js";
import { useRouter } from "next/router";
import { UserContext } from "../contexts/UserContext.js";
import { useState, useEffect, useContext } from "react";

const infoAlertText = (
  <h4>
  Adding information on this page helps us tailor our
  <br/>
  services to make your experience more unique,
  <br/>
  but you are not required to provide any information.
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
    <h2> Physical Data: </h2>
    <Form.Item>
    </Form.Item>
    </Space>
    </Form>
    </>
  )
}
export default InstQuest;


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
