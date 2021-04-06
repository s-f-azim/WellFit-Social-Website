import {
  CheckOutlined,
  QuestionOutlined,
  InstagramOutlined,
  GoogleOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import Router, { useRouter } from 'next/router';
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
import { useSession, getSession } from 'next-auth/client';
import { NextSeo } from 'next-seo';
import updateUser from '../actions/user';
import InstQuest from '../components/userComponents/questionnaires/InstQuest';
import AccessDenied from '../components/generalComponents/AccessDenied';
import ClientQuest from '../components/userComponents/questionnaires/clientQuest';
import API from '../config';

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

const tags = [
  'GetFit',
  'Cardio',
  'Cycling',
  'FitFam',
  'FitLife',
  'Fitness',
  'FitnessMotivation',
  'FitnessAddict',
  'GetStrong',
  'LiftHeavy',
  'GirlsWhoLift',
  'GymLife',
  'GymTime',
  'NoPainNoGain',
  'PersonalTrainer',
  'Sweat',
  'Weights',
  'WeightLifting',
  'Workout',
];

const facebookOuthHandler = (e) => {
  e.preventDefault();
  window.open(`${API}/users/oauth/facebook`, '_self');
};
const googleOuthHandler = (e) => {
  e.preventDefault();
  window.open(`${API}/users/oauth/google`, '_self');
};
// Insta oauth login
const instaOauthHandler = (e) => {
  e.preventDefault();
  window.open(`${API}/users/oauth/instagram`, '_self');
};

const twitterOauthHandler = (e) => {
  e.preventDefault();
  window.open(`${API}/users/oauth/twitter`, '_self');
};
const editProfilePage = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  const { tab } = router.query ? router.query : '1';
  if (typeof window !== 'undefined' && loading) return null;

  if (session) {
    const { user } = session;
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    const infoAlertText =
      user.role === 'client' ? (
        <p>
          Adding information on this page helps us tailor our services and allows instructors to be
          more suited to your needs, as well as found for you more efficiently. We encourage but do
          not require you to provide any of this information.
        </p>
      ) : (
        <p>
          Adding information on this page helps us tailor our services and allows clients to be
          matched more efficiently, as well as letting them know who you are and how you work before
          initiating contact. We encourage but do not require you to provide this information.
        </p>
      );

    const showAlert = () => {
      setIsAlertVisible(true);
    };

    const handleOk = () => {
      setIsAlertVisible(false);
    };

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
          Router.push('/');
        }
      } catch (err) {
        console.log(err);
        setHasError(true);
      }
    };
    let date = new Date();
    date.setFullYear(date.getFullYear() - 16);
    date = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    const { TabPane } = Tabs;

    return (
      <div className="EditProfile">
        <NextSeo
          title="Edit Profile Page"
          description="A page from which a user can edit information relating to their profile, such as their tags, location or credentials."
        />
        <Row type="flex" justify="center" align="middle">
          <Card>
            <Tabs defaultActiveKey={tab} tabPosition="left">
              <TabPane tab="Basic Info" key="1">
                <Form form={form} name="Update my info" onFinish={onFinish} scrollToFirstError>
                  <Space direction="vertical" size="middle">
                    {hasError && (
                      <Alert type="error" message="something went wrong, please try again" banner />
                    )}
                    <h1>
                      Add/Edit basic profile information <UserOutlined />
                    </h1>
                    <Alert
                      message="This helps professionals know about you right away"
                      type="info"
                      showIcon
                    />
                    <Form.Item name="gender" label="Gender">
                      <Select
                        aria-label="gender"
                        defaultValue={user.gender ? user.gender : null}
                        placeholder="Select your gender"
                      >
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                        <Option value="Non-Binary"> Non-Binary</Option>
                        <Option value="Prefer not to say">Prefer not to say</Option>
                      </Select>
                    </Form.Item>

                    {/* <Form.Item name="location" label="Location">
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
                  </Form.Item> */}

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
                      <Input
                        aria-label="nickname"
                        defaultValue={user.nickname ? user.nickname : null}
                      />
                    </Form.Item>

                    <Form.Item name="bio" label="Bio">
                      <Input.TextArea
                        aria-label="bio"
                        maxLength={200}
                        showCount
                        defaultValue={user.bio ? user.bio : null}
                      />
                    </Form.Item>

                    <Form.Item name="tags" label="Tags">
                      <Select
                        aria-label="tags"
                        mode="tags"
                        style={{ display: 'flex', flexFlow: 'column wrap', flexGrow: '2' }}
                        placeholder="Select your interests"
                        defaultValue={user.tags ? user.tags : null}
                        rules={[
                          {
                            type: 'string',
                          },
                        ]}
                      >
                        {tags.map((x) => (
                          <Option value={x}>{x}</Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                      <Button aria-label="update" type="primary" htmlType="submit">
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
                    <Button type="text" shape="circle" onClick={showAlert}>
                      <h2>
                        <QuestionOutlined />
                      </h2>
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
                {user.role === 'client' ? (
                  <ClientQuest session={session} />
                ) : (
                  <InstQuest session={session} />
                )}
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
                    <h1>
                      Change your email or password <LockOutlined />
                    </h1>
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
                    <Input aria-label="email" />
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
                    <Button aria-label="confirm" type="primary" htmlType="submit">
                      Confirm
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
              <TabPane tab="Link Social Media" key="4">
                <h1>
                  Link your social media accounts <LinkOutlined />
                </h1>
                <ul>
                  <Row>
                    <li>
                      <Button type="text" onClick={facebookOuthHandler}>
                        Link your Facebook account
                        <FacebookOutlined />
                      </Button>
                    </li>
                  </Row>
                  <Row>
                    <li>
                      <Button type="text" onClick={instaOauthHandler}>
                        Link your Instagram account
                        <InstagramOutlined />
                      </Button>
                    </li>
                  </Row>
                  <Row>
                    <li>
                      <Button type="text" onClick={googleOuthHandler}>
                        Link your Google account
                        <GoogleOutlined />
                      </Button>
                    </li>
                  </Row>
                  <Row>
                    <li>
                      <Button type="text" onClick={twitterOauthHandler}>
                        Link your Twitter account
                        <TwitterOutlined />
                      </Button>
                    </li>
                  </Row>
                </ul>
              </TabPane>
            </Tabs>
          </Card>
        </Row>
      </div>
    );
  }
  return <AccessDenied />;
};
export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}

export default editProfilePage;
