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
  EditOutlined,
  CheckCircleTwoTone,
  CloseCircleOutlined,
  SearchOutlined,
  RiseOutlined,
  TeamOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Button, Space, Row, Card, Col, Divider, Modal, Collapse, Avatar } from 'antd';
import { useSession, getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import FollowButton from '../../components/userComponents/FollowButton';
import ReportButton from '../../components/userComponents/ReportButton';
import AccessDenied from '../../components/generalComponents/AccessDenied';
import Suggestions from '../../components/userComponents/SuggestedInstructors';
import WishList from '../../components/userComponents/WishList';
import UserFeed from '../../components/userComponents/postComponents/UserFeed';
import UserPosts from '../../components/userComponents/postComponents/UserPosts';
import TrendingUsers from '../../components/userComponents/TrendingUsers';
import GetFollow from '../../components/userComponents/GetFollow';
import { createRequest } from '../../actions/request';
import { getFollowingList, getFollowerList, addingFollowUser } from '../../actions/user';
import api from '../../services/api';
import { CourseReview, UserReview } from '../../components/userComponents/reviewComponents/Review';
import Course from '../courses/[id]';

const User = ({ user }) => {
  const [session, loading] = useSession();
  const [youtubeChannel, setyoutubeChannel] = useState([]);
  const [videoID, setvideoID] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [didLoad, setDidLoad] = useState(false);
  const [isFollowingModalVisible, setIsFollowingModalVisible] = useState(false);
  const [isFollowerModalVisible, setFollowerIsModalVisible] = useState(false);
  const [following, setFollowing] = useState([]);
  const [follower, setFollower] = useState([]);
  const [currentUser, setCurrentUser] = useState(false);
  const router = useRouter();

  useEffect(async () => {
    if (session && session.user._id === user._id) {
      setCurrentUser(true);
    }
    if (session && session.user) setIsFollowing(session.user.following.includes(user._id));
    const followingData = await getFollowingList(user._id);
    const followerData = await getFollowerList(user._id);
    setFollowing(followingData.data.data);
    setFollower(followerData.data.data);
    setFollowerIsModalVisible(false);
    setIsFollowingModalVisible(false);
  }, [router.query]);

  const fetchData = async (user) => {
    if (user) {
      if (!didLoad) {
        setDidLoad(true);
        try {
          await fetch(
            'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDypjf2fxXKDQPhL6H-HuBqkFxxwxzxuek&channelId=UC-fxx_bLuZN0KOdPMKPleFw&part=id&order=date&maxResults=20'
          )
            .then((x) => x.json())
            .then((z) => {
              setvideoID(z.items[0].id.videoId);
            });
        } catch {
          console.log('fail');
          setvideoID('dGcsHMXbSOA');
          setyoutubeChannel('UCQR2B4SkuyugJV1GZm61rQA');
        }
      }
    }
  };

  if (typeof window !== 'undefined' && loading) return null;

  const getAge = (birthDate) =>
    Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

  const youtubeLink = async () => {
    window.location.href = `https://www.youtube.com/channel/${youtubeChannel}`;
  };

  const facebookLink = async () => {
    window.location.href = '/404';
  };

  if (session) {
    fetchData(user);

    const twitterLink = () => {
      window.location.href = `https://www.twitter.com/${user.twitterScreenName}`;
    };

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
          console.log('hey there');
          session.user.following = [id, ...session.user.following];
          setIsFollowing(true);
        } else {
          console.log('hmm');
          const index = session.user.following.indexOf(id);
          session.user.following.splice(index, 1);
          setIsFollowing(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    const handleReport = async (id) => {
      try {
        await createRequest('report', 'something', id);
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

    return (
      <div className="userPage">
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
                  actions={[<EditOutlined key="edit" />]}
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
                    icon={<UserOutlined />}
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
                    <Button type="text" onClick={facebookLink} icon={<FacebookOutlined />} />
                    <Button type="text" onClick={facebookLink} icon={<InstagramOutlined />} />
                    <Button type="text" onClick={youtubeLink} icon={<GoogleOutlined />} />
                    <Button type="text" onClick={twitterLink} icon={<TwitterOutlined />} />
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

                  <h4>
                    <strong> About: </strong>
                    {user.bio ? user.bio : 'No bio entered, edit your profile to display it.'}
                  </h4>
                  <Button type="link" onClick={showFollowerModal} size="small">
                    <h5 style={{ color: '#ffa277' }}>
                      Followed by {user.follower.length} user(s).
                    </h5>
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
                    <h5 style={{ color: '#ffa277' }}>
                      Follows {user.following.length} other user(s).
                    </h5>
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
                    {user.role === 'client' && currentUser && (
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
                  <>
                    <Panel
                      header={
                        <h2>
                          User reviews <FileDoneOutlined />
                        </h2>
                      }
                      key="5"
                    >
                      <Row justify="space-around">
                        <Col>
                          <UserReview id={user._id} />
                        </Col>
                      </Row>
                    </Panel>
                  </>
                )}
              </Collapse>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
  return <AccessDenied />;
};

// check if the id was given and prerender the page using the above template
// this is using incremental static regeneration to rehydrate the page every 10 minutes
export const getStaticProps = async ({ params }) => {
  const userId = params ? params.id : undefined;
  const response = await api.get(`/users/${userId}`);
  return { props: { user: response.data.data }, revalidate: 60 * 10 };
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
