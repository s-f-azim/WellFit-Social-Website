import { useState, useEffect } from 'react';
import { Card } from 'antd';
import Image from 'next/image';
import { useSession } from 'next-auth/client';
import { UserOutlined } from '@ant-design/icons';
import { getTrendingUsersLimit } from '../../../actions/user';
import template from '../../../data/frontPageText';

const { Meta } = Card;

const Banner4 = () => {
  // List of suggested instructors
  const [showState, setShowState] = useState(false);
  const [list, setList] = useState({});
  const [session, loading] = useSession();
  // Fetches suggested instructors once after initial render
  useEffect(async () => {
    try {
      const response = await getTrendingUsersLimit(6);
      if (response.data.success && response.data.data.length !== 0) {
        setList(response.data.data);
        setShowState(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="banner4">
      <div className="inner_banner4">
        <h1>{template.banner4.header} </h1>
        {showState ? (
          <div className="banner4_boxes">
            {list.map((item) => (
              <div className="instructorCard">
                <a href={`users/${item._id}`}>
                  <Card
                    hoverable
                    cover={
                      item.photos[0] ? (
                        <Image
                          className="testing"
                          objectFit="cover"
                          height="800px"
                          width="800px"
                          alt="Picture of an instructor"
                          src={`data:image/png;base64,${item.photos[0].toString('base64')}`}
                        />
                      ) : (
                        <UserOutlined />
                      )
                    }
                  >
                    <Meta
                      title={item.screenname ? item.screenname : `${item.fName} ${item.lName}`}
                      description={item.bio ? item.bio : null}
                    />
                  </Card>
                </a>
              </div>
            ))}
          </div>
        ) : (
          'No instructors have signed up yet!'
        )}
      </div>
    </div>
  );
};
export default Banner4;
