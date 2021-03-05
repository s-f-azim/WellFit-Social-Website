import { CheckOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Space,
  Form,
  Input,
  Alert,
  Button,
  Row,
  Card,
  Select,
  DatePicker,
  Modal,
  notification,
  Tabs,
} from 'antd';
import updateUser from '../actions/user';
import InstQuest from '../components/InstQuest';
import { useAuth } from '../services/auth';

const { Option } = Select;

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

const tags = ['#GetFit',
  '#Cardio',
  '#Cycling',
  '#FitFam',
  '#FitLife',
  '#Fitness',
  '#FitnessMotivation',
  '#FitnessAddict', 
  '#GetStrong',
  '#LiftHeavy',
  '#GirlsWhoLift',
  '#GymLife',
  '#GymTime',
  '#NoPainNoGain',
  '#PersonalTrainer',
  '#Sweat',
  '#Weights',
  '#WeightLifting',
  '#Workout'];

const childTags = tags.map(x => <Option value={x}>{x}</Option>);

const infoAlertText = (
  <p>
    Adding information on this page helps us tailor our services and allows clients to be matched
    more efficiently, as well as letting them know who you are and how you work before initiating
    contact. We encourage but do not require you to provide this information.
  </p>
);

const editProfilePage = () => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const showAlert = () => {
    setIsAlertVisible(true);
  };

  const handleOk = () => {
    setIsAlertVisible(false);
  };

  const router = useRouter();
  const { user, setUser } = useAuth();

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
        setUser(response.data.data);
        router.push('/');
      }
    } catch (err) {
      setHasError(true);
    }
  };
  let date = new Date();
  date.setFullYear(date.getFullYear() - 16);
  date = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  const { TabPane } = Tabs;

  return (
    <Row type="flex" justify="center" align="middle">
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Basic Info" key="1">
            <Form form={form} name="Update my info" onFinish={onFinish} scrollToFirstError>
              <Space direction="vertical" size="middle">
                {hasError && (
                  <Alert type="error" message="something went wrong, please try again" banner />
                )}
                <h1>Add/Edit basic profile information</h1>
                <Alert
                  message="This helps professionals know about you right away"
                  type="info"
                  showIcon
                />
                <Form.Item name="gender" label="Gender">
                  <Select
                    defaultValue={user.gender ? user.gender : null}
                    placeholder="Select your gender"
                  >
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                    <Option value="Non-Binary"> Non-Binary</Option>
                    <Option value="Prefer not to say">Prefer not to say</Option>
                  </Select>
                </Form.Item>

                <Form.Item name="location" label="Location">
                  <Select
                    defaultValue={user.location ? user.location : null}
                    placeholder="Select your location"
                  >
                    <Option value="Europe">Europe</Option>
                    <Option value="Asia">Asia</Option>
                    <Option value="North America">North America</Option>
                    <Option value="South America">South America</Option>
                    <Option value="Australia">Australia</Option>
                    <Option value="Africa">Africa</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="birthday"
                  label="Birthday"
                  rules={[
                    {
                      type: 'object',
                      message: 'Please select your birthday',
                    },
                  ]}
                >
                  <DatePicker
                    defaultPickerValue={user.birtdhay ? user.birthday : null}
                    disabledDate={(d) => !d || d.isAfter(date)}
                  />
                </Form.Item>

                <Form.Item name="nickname" label="Nickname">
                  <Input defaultValue={user.nickname ? user.nickname : null} />
                </Form.Item>

                <Form.Item name="bio" label="Bio">
                  <Input.TextArea maxLength={300} defaultValue={user.bio ? user.bio : null} />
                </Form.Item>

                <Form.Item name="tags" label="Tags">
                  <Select mode="tags" 
                    style={{display: 'flex', flexFlow: 'column wrap',flexGrow: '2'}} 
                    placeholder="Select your interests"
                    rules={[
                      {
                        type: "string",
                      }
                    ]}>
                      {childTags}
                  </Select>
                  
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Update my info
                  </Button>
                </Form.Item>
              </Space>
            </Form>
          </TabPane>

          <TabPane tab="Detailed info" key="2">
            <h1>
              Add/Edit in-depth profile information
              <>
                <Button type="primary" shape="circle" onClick={showAlert}>
                  ?
                </Button>
                <Modal
                  closable={false}
                  cancelButtonProps={{ style: { display: 'none' } }}
                  title="This info is optional"
                  visible={isAlertVisible}
                  onOk={handleOk}
                >
                  {infoAlertText}
                </Modal>
              </>
            </h1>
            <InstQuest />
          </TabPane>

          <TabPane tab="Credentials" key="3">
            <Form form={form} name="Edit my info" onFinish={onFinish} scrollToFirstError>
              <Space direction="vertical" size="middle">
                {hasError && (
                  <Alert
                    type="error"
                    message="Make sure both passwords match and are over 8 characters"
                    banner
                  />
                )}
                <h1>Change your email or password</h1>
              </Space>
              <Form.Item
                name="email"
                label="New email"
                rules={[
                  {
                    type: 'email',
                    message: 'Invalid Email',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="password" label="New password" hasFeedback>
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      // eslint-disable-next-line prefer-promise-reject-errors
                      return Promise.reject('Sorry the passwords do not match');
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item {...tailFormItemLayout} className="submit">
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
