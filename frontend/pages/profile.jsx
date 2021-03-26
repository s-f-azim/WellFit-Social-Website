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
} from '@ant-design/icons';
import React, { useState } from 'react';
import { Button, Row, Card, Tabs, Rate } from 'antd';
import '../styles/pages/profile.scss';
import { useSession, getSession } from 'next-auth/client';
import { Timeline } from 'react-twitter-widgets';
import FollowButton from '../components/userComponents/FollowButton';
import AccessDenied from '../components/generalComponents/AccessDenied';
import Suggestions from '../components/userComponents/SuggestedInstructors';
import WishList from '../components/userComponents/WishList';
import GetFollow from '../components/userComponents/GetFollow';


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
  const { TabPane } = Tabs;

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

    return (
      <div className="profilePage">
        <div className="profilePanel">
          <img className="profilePic" src={placeholderpic} />
        </div>

        <div className="infoPanel">
          <Card>
            <Row style={{ float: 'right' }}>
              <Rate
                className="priceRange"
                value={user ? (user.priceRange ? user.priceRange : 1) : 1}
                style={{ color: 'green' }}
                character={<PoundOutlined />}
                disabled="true"
              />
            </Row>
            <Row>
              <h1>
                {' '}
                {user ? `${user.fName} ${user.lName}` : 'NA'}{' '}
                {user ? (
                  user.gender === 'Male' ? (
                    <ManOutlined />
                  ) : user.gender == 'Female' ? (
                    <WomanOutlined />
                  ) : (
                    <UserOutlined />
                  )
                ) : (
                  <UserOutlined />
                )}
              </h1>
            </Row>
            <Row style={{ float: 'right' }}>
              <FollowButton userId="6041c7f777ed42181055ca68" />
            </Row>
            <Row>
              <h2>
                {' '}
                {user
                  ? user.trainerType
                    ? user.trainerType
                    : 'General Trainer'
                  : 'General Trainer'}{' '}
              </h2>
            </Row>
            <Row>
              <Button type="text" onClick={facebookLink} icon={<FacebookOutlined />} />
              <Button type="text" onClick={facebookLink} icon={<InstagramOutlined />} />
              <Button type="text" onClick={youtubeLink} icon={<GoogleOutlined />} />
              <Button type="text" onClick={twitterLink} icon={<TwitterOutlined />} />
            </Row>
          </Card>
        </div>

        <div className="leftPanel">
          <Row className="row">
            <Card className="card">
              <Tabs className="content">
                <TabPane tab="Qualifications">
                  <div className="qualifications">
                    <h3> {user ? (user.qualifications ? user.qualifications : '') : ''} </h3>
                    <h3>
                      {' '}
                      Speciality: {user
                        ? user.speciality
                          ? user.speciality
                          : 'Non Given'
                        : ''}{' '}
                    </h3>
                    <h3>
                      {' '}
                      Sessions:{' '}
                      {user
                        ? user.communicationFrequency
                          ? user.communicationFrequency
                          : 'N/A'
                        : ''}
                    </h3>
                  </div>

                  <div className="clientPreferences">
                    <h3>
                      {' '}
                      Gender Preference:{' '}
                      {user
                        ? user.clientGenderPreference
                          ? user.clientGenderPreference
                          : 'Any'
                        : ''}
                    </h3>
                    <h3>
                      {' '}
                      Fitness Level:{' '}
                      <Rate
                        style={{ color: 'green' }}
                        character={<PlusOutlined />}
                        value={user ? (user.clientFitness ? user.clientFitness[1] / 20 : 1) : 1}
                        disabled="true"
                      />
                    </h3>
                    <h3>
                      {' '}
                      Strength Level:{' '}
                      <Rate
                        style={{ color: 'green' }}
                        character={<PlusOutlined />}
                        value={user ? (user.clientStrength ? user.clientStrength[1] / 20 : 1) : 1}
                        disabled="true"
                      />
                    </h3>
                    <h3>
                      {' '}
                      Hypertroph Level:{' '}
                      <Rate
                        style={{ color: 'green' }}
                        character={<PlusOutlined />}
                        value={
                          user ? (user.clientHypertrophy ? user.clientHypertrophy[1] / 20 : 1) : 1
                        }
                        disabled="true"
                      />
                    </h3>
                  </div>
                </TabPane>
              </Tabs>
            </Card>
          </Row>
        </div>

        <div className="mainPanel">
          <Row>
            <Card>
              <Tabs defaultActiveKey="1">
                <TabPane tab="About" key="1">
                  <Row style={{ float: 'right' }}>
                    {' '}
                    <h3 className="nickname">
                      {' '}
                      {user ? (user.nickname ? `Nickname: ${user.nickname}` : '') : ''}{' '}
                    </h3>{' '}
                  </Row>
                  <Row>
                    {' '}
                    <h3 className="loc">
                      {' '}
                      Location: {user
                        ? user.location
                          ? user.location
                          : 'Not given'
                        : 'Not given'}{' '}
                    </h3>{' '}
                  </Row>
                  <Row style={{ float: 'right' }}>
                    {' '}
                    <h3 className="age">
                      {' '}
                      Age:{' '}
                      {user
                        ? user.birthday
                          ? getAge(user.birthday.slice(0, 10))
                          : 'Not given'
                        : 'Not given'}{' '}
                    </h3>{' '}
                  </Row>
                  <Row>
                    {' '}
                    <h3 className="bio"> {user ? (user.bio ? user.bio : '') : ''} </h3>{' '}
                  </Row>
                  <Row>
                    {' '}
                    <h3 className="tags">
                      {' '}
                      {user ? (user.tags ? `Interests: ${user.tags.join(', ')}` : '') : ''}{' '}
                    </h3>{' '}
                  </Row>

                  <Row />
                  <Row style={{ float: 'right' }}>
                    {' '}
                    <h3 className="coms">
                      {' '}
                      Contact:{' '}
                      {user
                        ? user.communicationModes
                          ? user.communicationModes.join(', ')
                          : 'Not given'
                        : ''}{' '}
                    </h3>{' '}
                  </Row>
                  <Row>
                    {' '}
                    <h3 className="serv">
                      {' '}
                      Service Format:{' '}
                      {user
                        ? user.serviceFormat
                          ? user.serviceFormat.join(', ')
                          : 'Not given'
                        : ''}{' '}
                    </h3>{' '}
                  </Row>
                  <Row>
                    {' '}
                    <h3>
                      {' '}
                      Accepted Payment Methods:{' '}
                      {user
                        ? user.paymentOptions
                          ? user.paymentOptions.join(', ')
                          : 'Not given'
                        : ''}{' '}
                    </h3>{' '}
                  </Row>
                  <Row>
                    {' '}
                    <h3 className="story">
                      {' '}
                      {user
                        ? user.customerStories
                          ? `Customer Stories: ${user.customerStories.join(', ')}`
                          : ''
                        : ''}{' '}
                    </h3>{' '}
                  </Row>
                </TabPane>
                <TabPane tab="Following" key="2">
			<GetFollow />
		</TabPane>
		<TabPane tab="Wishlist" key="3">
			<WishList />
		</TabPane>
		TabPane tab="Suggested Instructors" key="4">
			<Suggestions />
		</TabPane>
              </Tabs>
            </Card>
          </Row>
        </div>

        <div className="feedPanel">
          <Card>
            <Tabs tab="Linked Videos" defaultActiveKey="1">
              <TabPane tab="Linked Videos" key="1">
                <iframe
                  src={`https://www.youtube.com/embed/${videoID}`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen="true"
                  title="video"
                />
              </TabPane>
              <TabPane tab="Tweets" key="2">
                <div className="twitterFeed">
                  <Timeline
                    dataSource={{
                      sourceType: 'profile',
                      screenName: user.twitterScreenName ? user.twitterScreenName : 'reactjs',
                    }}
                    options={{
                      height: '400',
                      header: 'false',
                      nofooter: 'true',
                      noborders: 'true',
                    }}
                  />
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </div>
        <div className="reviewPanel">
          <Row>
            <Card>
              <Tabs>
                <TabPane tab="Reviews">PLACEHOLDER</TabPane>
              </Tabs>
            </Card>
          </Row>
        </div>
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
