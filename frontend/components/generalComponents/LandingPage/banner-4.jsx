import { useState, useEffect } from 'react';
import { Card, Anchor } from 'antd';
import { useSession } from 'next-auth/client';
import { getTrendingUsersLimit } from '../../../actions/user';

const { Meta } = Card;
const { Link } = Anchor;

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

  const InstrCard = (item) => {
    const life = '';
    return (
      <a>
        <h1>fefhe</h1>
      </a>
    );
  };

  return (
    <div className="banner4">
      <div className="inner_banner4">
        <h1>Explore leading instructors </h1>
        <h3>Anything from fitness to meditation</h3>
        {showState ? (
          <div className="banner4_boxes">
            {list.map((item) => (
              <div className="instructorCard">
                <a href={session ? `users/${item._id}` : ''}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt="example"
                        src={
                          item.photos[0]
                            ? item.photos[0]
                            : '/alex-suprun-ZHvM3XIOHoE-unsplash-2.jpg'
                        }
                      />
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
          'Doesnt work'
        )}
      </div>
    </div>
  );
};
export default Banner4;
