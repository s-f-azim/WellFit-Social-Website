/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-nested-ternary */
import {
  PlusOutlined,
  PoundOutlined,
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
} from '@ant-design/icons';
import React, { useState } from 'react';
import { Button, Row, Card, Tabs, Rate, Col, Divider } from 'antd';
import '../styles/pages/profile.scss';
import { useSession, getSession } from 'next-auth/client';
import { Timeline } from 'react-twitter-widgets';
import FollowButton from '../components/userComponents/FollowButton';
import ReportButton from '../components/userComponents/ReportButton';
import AccessDenied from '../components/generalComponents/AccessDenied';
import Suggestions from '../components/userComponents/SuggestedInstructors';
import WishList from '../components/userComponents/WishList';
import UserFeed from '../components/userComponents/postComponents/UserFeed';
import UserPosts from '../components/userComponents/postComponents/UserPosts';
import TrendingUsers from '../components/userComponents/TrendingUsers';

const placeholderpic =
  'data:image/jpeg;base64,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';

const ProfilePage = (props) => {
  const [session, loading] = useSession();
  const [youtubeChannel, setyoutubeChannel] = useState([]);
  const [videoID, setvideoID] = useState([]);
  const [didLoad, setDidLoad] = useState(false);

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
    const { user } = session;
    fetchData(user);
    const twitterLink = () => {
      window.location.href = `https://www.twitter.com/${user.twitterScreenName}`;
    };

    const { TabPane } = Tabs;

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
      <div className="profilePage">
        <Divider>
          <h2>
            My Profile <UserOutlined />
          </h2>
        </Divider>
        <Row justify="space-around">
          <Col>
            <Card>
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
                <strong> About me: </strong>
                {user.bio ? user.bio : 'No bio entered, edit your profile to display it.'}
              </h4>
              <h5 style={{ color: 'grey' }}>Followed by {user.follower.length} user(s).</h5>
              <h5 style={{ color: 'grey' }}>Follows {user.following.length} other user(s).</h5>
            </Card>
          </Col>
          <Col>
            <Card
              className="profileImage"
              style={{ width: 300 }}
              actions={[<EditOutlined key="edit" />]}
            >
              <img className="profilePic" src={placeholderpic} />
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
            My Feed <FileOutlined />
          </h2>
        </Divider>
        <Row justify="space-around">
          <Col span={20}>
            <UserFeed />
          </Col>
        </Row>
        <Divider>
          <h2>
            My Posts <FileOutlined />
          </h2>
        </Divider>
        <Row justify="space-around">
          <Col span={20}>
            <UserPosts id={user._id} />
          </Col>
        </Row>
        {user.role === 'client' && (
          <div>
            <Divider>
              <h2>
                My Course Wishlist <SearchOutlined />
              </h2>
            </Divider>
            <Row justify="space-around">
              <Col>
                <WishList />
              </Col>
            </Row>
          </div>
        )}
        <Divider>
          <h2>
            Discover Trending Users <SearchOutlined />
          </h2>
        </Divider>
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
      </div>
    );
  }
  return <AccessDenied />;
};

export default ProfilePage;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
