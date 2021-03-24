import { useEffect, useState } from 'react';
import { useSession, getSession } from 'next-auth/client';
import { Card, Space, Button } from 'antd';
import FollowButton from '../components/userComponents/FollowButton';
import GetFollow from '../components/userComponents/GetFollow';
import { getFollowingList, addingFollowUser, getFollowerList } from '../actions/user';

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
      await addingFollowUser('6050ca769110b216e6e638c9');
    };

    return (
      <>
        <br />
        <Card>
          <Space>
            <h2>Default Follow Button</h2>
            <br />
            <Button type="primary" onClick={addFollowUser}>
              Follow
            </Button>
            {/* <FollowButton userId= /> */}
          </Space>
        </Card>
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
  return <p>Access Denied</p>;
  // Instead of the hard coded userID there should be a programmed get userID from visiting profile
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
