import {
  Alert,
  Form,
  Space,
  Input,
  Select,
  Collapse,
  Button,
  notification,
  InputNumber,
} from 'antd';

import { CheckOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useState } from 'react';
import updateUser from '../../../actions/user';

const { Option } = Select;

const yourCareerText = <h2> Personal information </h2>;

const preferencesText = <h2> Preferences </h2>;

const additionalText = <h2> Additional information </h2>;

const { Panel } = Collapse;
const { TextArea } = Input;

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
const clientQuest = ({ session }) => {
  const router = useRouter();
  const { user } = session;
  const [hasError, setHasError] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await updateUser(values);
      if (response.data.success) {
        notification.open({
          message: 'Information updated!',
          duration: 2,
          icon: <CheckOutlined style={{ color: '#33FF49' }} />,
        });
        session.user = response.data.data;
        router.push('/');
      }
    } catch (err) {
      setHasError(true);
    }
  };

  return (
    <>
      <Form form={form} name="Update my info" onFinish={onFinish} scrollToFirstError>
        <Space direction="vertical" size="middle">
          {hasError && (
            <Alert type="error" message="something went wrong, please try again" banner />
          )}
          <Collapse bordered={false} ghost>
            <Panel header={yourCareerText} key="1">
              <Form.Item
                label="What is your weight? (kg)"
                name="weight"
                rules={[
                  {
                    type: 'number',
                    min: 0,
                    message: 'Please enter positive numbers only',
                  },
                ]}
              >
                <InputNumber aria-label="weight" defaultValue={user.weight ? user.weight : null} />
              </Form.Item>
              <Form.Item
                label="What is your height? (cm)"
                name="height"
                rules={[
                  {
                    type: 'number',
                    min: 0,
                    message: 'Please enter positive numbers only',
                  },
                ]}
              >
                <InputNumber aria-label="height" defaultValue={user.height ? user.height : null} />
              </Form.Item>
              <Form.Item label="What is your Fitness Level?" name="fitnessLevel">
                <Select
                  aria-label="fitness level"
                  allowClear
                  defaultValue={user.fitnessLevel ? user.fitnessLevel : null}
                >
                  <Option value="beginner">Beginner</Option>
                  <Option value="intermediate">Intermediate</Option>
                  <Option value="advanced">Advanced</Option>
                </Select>
              </Form.Item>
            </Panel>
            <Panel header={preferencesText} key="2">
              <Form.Item label="Preferred instructor's gender?" name="preferredGender">
                <Select
                  aria-label="instructor gender"
                  allowClear
                  defaultValue={user.preferredGender ? user.preferredGender : null}
                >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="any">Any</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Preferred training duration? (minutes)"
                name="trainingDuration"
                rules={[
                  {
                    type: 'number',
                    min: 0,
                    message: 'Please enter positive numbers only',
                  },
                  {
                    validator: async (_, value) => {
                      if (!value || Number.isInteger(value)) return Promise.resolve();
                      return Promise.reject('Please enter a whole number');
                    },
                  },
                ]}
              >
                <InputNumber
                  aria-label="training duration"
                  defaultValue={user.trainingDuration ? user.trainingDuration : null}
                />
              </Form.Item>
            </Panel>
            <Panel header={additionalText} key="3">
              <Form.Item label="What equipment do you have?" name="trainingEquipment">
                <Select
                  aria-label="training equipment"
                  mode="multiple"
                  allowClear
                  defaultValue={user.trainingEquipment ? user.trainingEquipment : []}
                >
                  <Option value="dumbbells">Dumbbells</Option>
                  <Option value="barbells">Barbells</Option>
                  <Option value="resistanceBands">Resistance Bands</Option>
                  <Option value="treadmill">Treadmill</Option>
                  <Option value="cardioMachines">Cardio Machines</Option>
                  <Option value="kettlebells">Kettlebells</Option>
                  <Option value="freeWeights">Free weights</Option>
                  <Option value="battleRopes">Battle Ropes</Option>
                  <Option value="jumRope">Jump rope</Option>
                  <Option value="mats">Training mat</Option>
                  <Option value="abWheel">Ab wheel</Option>
                </Select>
              </Form.Item>
            </Panel>
          </Collapse>

          <Form.Item {...tailFormItemLayout}>
            <Button aria-label="save" type="primary" htmlType="submit">
              Save info
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </>
  );
};
export default clientQuest;
