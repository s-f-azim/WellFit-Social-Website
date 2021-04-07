import { Row, Col } from 'antd';
import ProfileCard from './ProfileCard';

const PeopleResults = ({ data }) => (
  <Row
    type="flex"
    align="middle"
    justify="center"
    style={{ margin: '5rem', minHeight: '65vh', padding: '2rem' }}
    gutter={[
      { xs: 8, sm: 16, md: 24, lg: 32 },
      { xs: 8, sm: 16, md: 24, lg: 32 },
    ]}
  >
    {data.map((user) => (
      <Col key={user._id}>
        <ProfileCard content={user} />
      </Col>
    ))}
  </Row>
);
export default PeopleResults;
