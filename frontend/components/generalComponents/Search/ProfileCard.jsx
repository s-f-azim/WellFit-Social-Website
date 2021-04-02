/* eslint-disable no-nested-ternary */
import { UserOutlined } from '@ant-design/icons';
import { Card, Row, Col, Button, Typography, Divider } from 'antd';
import Image from 'next/image';

const ProfileCard = ({ content }) => {
  const profileDetails = {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  };

  return (
    <>
      <div className="profile-card">
        <Card style={{ borderColor: '#ffa277', borderRadius: '0.5rem', background: '#ffeee6' }}>
          <Row style={{ paddingBottom: '1rem' }}>
            <Col span={24}>
              <Typography.Title className="title" ellipsis style={{ width: '100%' }}>
                <UserOutlined /> {content.fName} {content.lName}
              </Typography.Title>
              <Divider style={{ borderTop: '1px solid #ffa277' }} />
            </Col>
          </Row>
          <Row>
            <Col className="card-image">
              <Image
                src={
                  content.photos[0]
                    ? `data:image/png;base64,${Buffer.from(content.photos[0].data).toString(
                        'base64'
                      )}`
                    : '/image-not-found.svg'
                }
                width={100}
                height={100}
              />
            </Col>
            <Col className="profile-details">
              <p>
                <strong>Registered as: </strong>
                {content.role === 'instructor'
                  ? content.trainerType && content.trainerType !== 'Other'
                    ? content.trainerType
                    : 'Instructor'
                  : 'Client'}
              </p>
              <p style={profileDetails}>
                Tags:{' '}
                {content.tags.length > 0 ? (
                  <>
                    {content.tags.map((tag) => (
                      <div className="tags">{tag}</div>
                    ))}
                  </>
                ) : (
                  'None Specified'
                )}
              </p>
              <p>
                <h5 style={{ color: '#ffa277' }}>
                  Followed by {content.follower ? content.follower.length : '0'} user(s).
                </h5>
                <h5 style={{ color: '#ffa277' }}>
                  Follows {content.follower ? content.following.length : '0'} other user(s).
                </h5>
              </p>
              <Button
                aria-label="goToProfilePage"
                style={{ color: '#ffa277' }}
                type="primary"
                href={`/users/${content._id}`}
                key={content._id}
              >
                Go to profile page
              </Button>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};
export default ProfileCard;
