import { Card, Row, Col, Button, Typography } from 'antd';
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
                {content.fName} {content.lName}
              </Typography.Title>
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
              <p>Gender:{content.gender ? ` ${content.gender}` : ' Not specified'}</p>

              <p style={profileDetails}>
                Tags:{' '}
                {content.tags.length > 0 ? (
                  <>
                    {content.tags.map((tag) => (
                      <div className="tags">{tag}</div>
                    ))}
                  </>
                ) : (
                  'Not specified'
                )}
              </p>

              <Button type="primary" href={`/users/${content._id}`} key={content._id}>
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
