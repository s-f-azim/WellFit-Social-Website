/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-nested-ternary */
import {
  InstagramOutlined,
  GoogleOutlined,
  FacebookOutlined,
  TwitterOutlined,
  ManOutlined,
  WomanOutlined,
  UserOutlined,
  FileOutlined,
  CheckOutlined,
  EditOutlined,
  CheckCircleTwoTone,
  CloseCircleOutlined,
  SearchOutlined,
  RiseOutlined,
  TeamOutlined,
  FileDoneOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Space,
  Row,
  Card,
  Col,
  Divider,
  Modal,
  Collapse,
  Avatar,
  Skeleton,
  notification,
  Upload,
  message,
} from 'antd';
import { useSession, getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import Suggestions from '../../components/userComponents/SuggestedInstructors';
import WishList from '../../components/userComponents/WishList';
import UserFeed from '../../components/userComponents/postComponents/UserFeed';
import UserPosts from '../../components/userComponents/postComponents/UserPosts';
import TrendingUsers from '../../components/userComponents/TrendingUsers';
import GetFollow from '../../components/userComponents/GetFollow';
import FavouriteList from '../../components/userComponents/FavouriteList';
import { createReport } from '../../actions/request';
import {
  getFollowingList,
  getFollowerList,
  addingFollowUser,
  uploadImages,
} from '../../actions/user';
import api from '../../services/api';
import { UserReview } from '../../components/userComponents/reviewComponents/Review';

const User = ({ user }) => {
  const [session, loading] = useSession();
  const [isFollowing, setIsFollowing] = useState(false);

  const [isFollowingModalVisible, setIsFollowingModalVisible] = useState(false);
  const [isFollowerModalVisible, setFollowerIsModalVisible] = useState(false);
  const [following, setFollowing] = useState([]);
  const [follower, setFollower] = useState([]);
  const [followNum, setFollowNum] = useState(0);
  const [followerNum, setFollowerNum] = useState(0);
  const router = useRouter();
  if (router.isFallback) {
    return <Skeleton active />;
  }

  useEffect(async () => {
    try {
      const followingData = await getFollowingList(user._id);
      const followerData = await getFollowerList(user._id);
      setFollowing(followingData.data.data);
      setFollower(followerData.data.data);
      setFollowNum(followingData.data.data.length);
      setFollowerNum(followerData.data.data.length);
      setFollowerIsModalVisible(false);
      setIsFollowingModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  }, [router.query]);
  useEffect(() => {
    if (
      session &&
      session.user &&
      follower.length > 0 &&
      follower.some((e) => e._id === session.user._id)
    ) {
      setIsFollowing(true);
    }
  }, [follower, session]);

  if (typeof window !== 'undefined' && loading) return null;

  const { Panel } = Collapse;

  const showFollowingModal = () => {
    setIsFollowingModalVisible(true);
  };
  const showFollowerModal = () => {
    setFollowerIsModalVisible(true);
  };

  const handleFollowingCancel = () => {
    setIsFollowingModalVisible(false);
  };
  const handleFollowerCancel = () => {
    setFollowerIsModalVisible(false);
  };
  const handleFollow = async (id) => {
    try {
      await addingFollowUser(id);
      if (!session.user.following.includes(id)) {
        session.user.following = [id, ...session.user.following];
        setIsFollowing(true);
        setFollowerNum(followerNum + 1);
      } else {
        const index = session.user.following.indexOf(id);
        session.user.following.splice(index, 1);
        setIsFollowing(false);
        setFollowerNum(followerNum - 1);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleReport = async (id) => {
    try {
      await createReport('report', 'something', id);
      notification.open({
        message: 'Report submitted, thanks for helping us!',
        duration: 3,
        icon: <CheckOutlined />,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const verified = (
    <p>
      Verified User <CheckCircleTwoTone twoToneColor="#096dd9" />
    </p>
  );

  const unverified = (
    <p style={{ color: 'red' }}>
      Unverified User <CloseCircleOutlined />
    </p>
  );

  const trendingInstructors = (
    <h3>
      <strong>
        Trending Instructors <RiseOutlined />
      </strong>
    </h3>
  );

  const qualifs = (
    <h4>
      <strong>Qualifications: </strong>
      {user.qualifications.join(', ')}
    </h4>
  );

  const speciality = (
    <h4>
      <strong>Speciality: </strong>
      {user.speciality}
    </h4>
  );

  const communicationFrequency = (
    <h4>
      <strong>Can meet: </strong>
      {user.communicationFrequency}
    </h4>
  );

  const communicationModes = (
    <h4>
      <strong>Joinable via: </strong>
      {user.communicationModes.join(', ')}
    </h4>
  );

  const paymentFrequency = (
    <h4>
      <strong>Pay for services: </strong>
      {user.paymentFrequency}
    </h4>
  );

  const paymentOptions = (
    <h4>
      <strong>Accepts Payment by: </strong>
      {user.paymentOptions.join(', ')}
    </h4>
  );

  const format = (
    <h4>
      <strong>Services are: </strong>
      {user.serviceFormat.join(', ')}
    </h4>
  );

  const Uploader = () => {
    const props = {
      beforeUpload: (file) => {
        const isValidFormat = ['image/png', 'image/jpg', 'image/jpeg'].includes(file.type);
        if (!isValidFormat) message.error('Invalid Format: only png, jpg or jpeg');
        return isValidFormat;
      },
      onChange: async ({ file }) => {
        if (file.status === 'done') {
          const formData = new FormData();
          formData.append('images', file.originFileObj);
          await uploadImages(formData);
          message.success('Profile picture updated!');
        }
      },
      maxCount: 1,
      accept: ['image/png', 'image/jpg', 'image/jpeg'],
      showUploadList: false,
    };
    return (
      <Upload {...props}>
        <Button icon={<EditOutlined />} />
      </Upload>
    );
  };

  return (
    <div className="userPage">
      <NextSeo
        title="User Profile Page"
        description="A page containing all the information about a specific user."
      />
      <Row justify="space-around">
        <Col>
          <Divider>
            <h2>
              Profile <UserOutlined />
            </h2>
          </Divider>
          <Row justify="space-around">
            <Col>
              <Card
                className="userImage"
                style={{ width: 300 }}
                actions={session && session.user._id === user._id && [<Uploader />]}
              >
                <Avatar
                  style={{ width: '100%', height: '100%' }}
                  size={{
                    xs: 94,
                    sm: 102,
                    md: 110,
                    lg: 124,
                    xl: 140,
                    xxl: 160,
                  }}
                  src={
                    user.photos[0] ? (
                      `data:image/png;base64,${user.photos[0].toString('base64')}`
                    ) : (
                      <UserOutlined />
                    )
                  }
                />
              </Card>
            </Col>
            <Col>
              <Card style={{ border: '0px' }}>
                <h3>{user.verified ? verified : unverified}</h3>
                <h1>
                  {user ? `${user.fName} ${user.lName} ` : 'Name not Found'}
                  {user ? (
                    user.gender === 'Male' ? (
                      <ManOutlined />
                    ) : user.gender === 'Female' ? (
                      <WomanOutlined />
                    ) : (
                      <UserOutlined />
                    )
                  ) : (
                    <UserOutlined />
                  )}
                </h1>
                {session && session.user._id !== user._id && (
                  <Space style={{ marginBottom: '0.5rem' }}>
                    <Button
                      type={isFollowing ? 'default' : 'primary'}
                      onClick={() => handleFollow(user._id)}
                    >
                      {isFollowing ? 'Unfollow' : 'Follow'}
                    </Button>
                    <Button onClick={() => handleReport(user._id)}>Report</Button>
                  </Space>
                )}
                <h3>
                  <strong>Socials: </strong>
                  <Button type="text" icon={<FacebookOutlined />} />
                  <Button type="text" icon={<InstagramOutlined />} />
                  <Button type="text" icon={<GoogleOutlined />} />
                  <Button type="text" icon={<TwitterOutlined />} />
                </h3>
                <h3>
                  <strong>Registered as: </strong>
                  <h2>
                    {user.role === 'instructor'
                      ? user.trainerType && user.trainerType !== 'Other'
                        ? user.trainerType
                        : 'Instructor'
                      : 'Client'}
                  </h2>
                </h3>

                <h4 style={{ minwidth: '30%' }}>
                  <strong> About: </strong>
                  {user.bio ? user.bio : 'No bio entered, edit your profile to display it.'}
                </h4>
                <Button type="link" onClick={showFollowerModal} size="small">
                  <h5 style={{ color: '#ffa277' }}>Followed by {followerNum} user(s).</h5>
                </Button>
                <Modal
                  title="Followers"
                  visible={isFollowerModalVisible}
                  okButtonProps={{ style: { display: 'none' } }}
                  cancelButtonProps={{ style: { display: 'none' } }}
                  onCancel={handleFollowerCancel}
                >
                  <Card>
                    <GetFollow data={follower} />
                  </Card>
                </Modal>
                <Button type="link" onClick={showFollowingModal} size="small">
                  <h5 style={{ color: '#ffa277' }}>Follows {followNum} other user(s).</h5>
                </Button>
                <Modal
                  title="Following"
                  visible={isFollowingModalVisible}
                  okButtonProps={{ style: { display: 'none' } }}
                  cancelButtonProps={{ style: { display: 'none' } }}
                  onCancel={handleFollowingCancel}
                >
                  <Card>
                    <GetFollow data={following} />
                  </Card>
                </Modal>
              </Card>
            </Col>
            {user.role === 'instructor' && (
              <Col>
                <br />
                <br />
                <br />
                <div>
                  <h3> {user.qualifications.length > 0 && qualifs} </h3>
                  <h3>{user.speciality && speciality}</h3>
                  <h3>{user.communicationFrequency && communicationFrequency}</h3>
                  <h3>{user.communicationModes.length > 0 && communicationModes}</h3>
                  <h3>{user.paymentFrequency && paymentFrequency}</h3>
                  <h3>{user.paymentOptions.length > 0 && paymentOptions}</h3>
                  <h3>{user.serviceFormat.length > 0 && format}</h3>
                </div>
              </Col>
            )}
          </Row>
          <Divider>
            <h2>
              Social Hub <TeamOutlined />
            </h2>
          </Divider>
          <Card style={{ border: '0px' }}>
            <Collapse bordered={false} ghost>
              <Panel
                header={
                  <h2>
                    Published Posts <FileOutlined />
                  </h2>
                }
                key="1"
              >
                <Row justify="space-around">
                  <Col span={20}>
                    <UserPosts id={user._id} />
                  </Col>
                </Row>
              </Panel>
              {session && session.user._id === user._id && (
                <>
                  <Panel
                    header={
                      <h2>
                        My Feed <FileOutlined />
                      </h2>
                    }
                    key="2"
                  >
                    <Row justify="space-around">
                      <Col span={20}>
                        <UserFeed />
                      </Col>
                    </Row>
                  </Panel>

                  <Panel
                    header={
                      <h2>
                        Favourite Posts <HeartOutlined />
                      </h2>
                    }
                    key="6"
                  >
                    <Row justify="space-around">
                      <Col span={20}>
                        <FavouriteList />
                      </Col>
                    </Row>
                  </Panel>

                  {user.role === 'client' && (
                    <>
                      <Panel
                        header={
                          <h2>
                            My Course Wishlist <SearchOutlined />
                          </h2>
                        }
                        key="3"
                      >
                        <Row justify="space-around">
                          <Col>
                            <WishList />
                          </Col>
                        </Row>
                      </Panel>
                    </>
                  )}
                  <Panel
                    header={
                      <h2>
                        Discover Trending Users <SearchOutlined />
                      </h2>
                    }
                    key="4"
                  >
                    <Row justify="space-around">
                      <Col>
                        <Card title={trendingInstructors} />
                        <Suggestions />
                      </Col>
                    </Row>

                    <Divider />
                    <Row justify="space-around">
                      <Col>
                        <TrendingUsers />
                      </Col>
                    </Row>
                  </Panel>
                </>
              )}
              {session && session.user._id !== user._id && (
                <Panel
                  header={
                    <h2>
                      User reviews <FileDoneOutlined />
                    </h2>
                  }
                  key="5"
                >
                  <Row justify="space-around">
                    <Col span={24}>
                      <UserReview id={user._id} />
                    </Col>
                  </Row>
                </Panel>
              )}
            </Collapse>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

// check if the id was given and prerender the page using the above template
// this is using incremental static regeneration to rehydrate the page every 1 minutes
export const getStaticProps = async ({ params }) => {
  const userId = params ? params.id : undefined;
  let response;
  try {
    response = await api.get(`/users/${userId}`);
  } catch (error) {
    console.log(error);
  }

  if (response) {
    return { props: { user: response.data.data }, revalidate: 60 * 2 };
  }

  return {
    notFound: true,
  };
};

// create all the pages possible for each individual user and make it static to improve performance significantly
// each page will be at url/users/id
export const getStaticPaths = async () => {
  const { data } = await api.get(`/users?limit=50`);
  const paths = data.data.map((user) => ({
    params: {
      id: user._id.toString(),
    },
  }));
  return { fallback: true, paths };
};

export default User;
