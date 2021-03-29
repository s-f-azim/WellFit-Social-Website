import Image from 'next/image';
import { Row, Col, Card } from 'antd';

const CourseResults = ({ data }) => (
  <Row style={{ marginTop: '2rem', marginLeft: '2rem' }}>
    {data.map((val) => (
      <Col xs={24} md={8}>
        <Card
          key={parseInt(val, 3)}
          title={`${val.title} - ${val.price} €`}
          cover={
            <Image
              alt="Avatar"
              layout="responsive"
              width="440px"
              height="440px"
              /* Placeholder image */
              src={
                val.avatar
                  ? val.avatar
                  : 'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8c3BvcnR5fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60'
              }
            />
          }
          style={{ width: '90%', marginTop: '2rem' }}
          extra={<a href="/profile">Coursepage</a>}
        >
          <p> Tags: {val.tags && val.tags.map((tag) => <>{tag} </>)}</p>
          <p>
            {' '}
            Equipment needed:{' '}
            {val.trainingEquipment && val.trainingEquipment.length !== 0
              ? val.trainingEquipment.map((tag) => <>{tag} </>)
              : 'None'}
          </p>
        </Card>
      </Col>
    ))}
  </Row>
);

export default CourseResults;
