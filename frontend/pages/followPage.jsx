import { useEffect, useState } from 'react';
import { useSession, getSession } from 'next-auth/client';
import { Card, Space, Button } from 'antd';
import FollowButton from '../components/userComponents/FollowButton';
import AccessDenied from '../components/generalComponents/AccessDenied';
import GetFollow from '../components/userComponents/GetFollow';
import {
  getFollowingList,
  addingFollowUser,
  getFollowerList,
  getSuggestedInstructors,
} from '../actions/user';
import TrendingUsers from '../components/userComponents/TrendingUsers';

export default function FollowPage() {
  const [session, loading] = useSession();
  if (typeof window !== 'undefined' && loading) return null;

  if (session) {
    const [following, setFollowing] = useState([]);
    const [follower, setFollower] = useState([]);
    let followingData;
    let followerData;

    useEffect(async () => {
      followingData = await getFollowingList();
      followerData = await getFollowerList();
      setFollowing(followingData.data.data);
      setFollower(followerData.data.data);
    }, []);

    const addFollowUser = async () => {
      console.log('clicked');
    };

    return (
      <>
        <br />

        <Space>
          <TrendingUsers />
          {session.user.role === 'client' && <getSuggestedInstructors />}
        </Space>

        <br />
        <Card>
          <h2>Following List</h2>
          <GetFollow data={following} />
        </Card>
        <br />
        <Card>
          <h2>Follower List</h2>
          <GetFollow data={follower} />
        </Card>
      </>
    );
  }
  return <AccessDenied />;
  // Instead of the hard coded userID there should be a programmed get userID from visiting profile
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
