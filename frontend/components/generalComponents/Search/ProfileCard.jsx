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
              <Typography.Title className="userTitle" ellipsis style={{ width: '100%' }}>
                <UserOutlined /> {content.fName} {content.lName}
              </Typography.Title>
              <Divider style={{ borderTop: '1px solid #ffa277' }} />
            </Col>
          </Row>
          <Row>
            <Col className="card-image">
              <Image
                alt="The profile picture of the user who's page you are visiting"
                src={
                  content.photos[0]
                    ? `data:image/png;base64,${content.photos[0].toString('base64')}`
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
              <div style={profileDetails}>
                Tags:{' '}
                {content.tags.length > 0 ? (
                  <>
                    {content.tags.map((tag) => (
                      <div className="tags" key={tag}>
                        {tag}
                      </div>
                    ))}
                  </>
                ) : (
                  'None Specified'
                )}
              </div>
              <p />

              <h5 style={{ color: '#ffa277' }}>
                <p style={{ marginBottom: '0.5em' }}>
                  Followed by {content.follower ? content.follower.length : '0'} user(s)
                </p>
                <p style={{ marginBottom: '1.2em' }}>
                  Follows {content.follower ? content.following.length : '0'} other user(s).
                </p>
              </h5>
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
