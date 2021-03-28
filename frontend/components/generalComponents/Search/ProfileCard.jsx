import { Card, Row, Col, Space, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import api from '../../../services/api';

const ProfileCard = ({ content }) => {
  return (
    <>
      <div>
        <Card className="profile-card" style={{ borderColor: 'black', borderRadius: '1rem' }}>
          <div style={{ paddingBottom: '5rem' }}>
            <h1 className="title">{`${content.fName} ${content.lName}`}</h1>
          </div>
          <Row style={{ maxHeight: '50%' }}>
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
            <Col>
              <p>Gender:{content.gender ? ` ${content.gender}` : ' Not specified'}</p>
              <p>
                Tags:{' '}
                {content.tags.length > 0 ? (
                  <Space direction="horizontal">
                    {content.tags.map((tag) => (
                      <div className="emphasised-item">{tag}</div>
                    ))}
                  </Space>
                ) : (
                  'Not specified'
                )}
              </p>
              <Button type="primary" href={`/users/${content._id}`}>
                Go to profile
              </Button>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};
export default ProfileCard;
