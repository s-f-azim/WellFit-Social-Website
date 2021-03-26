import Image from 'next/image';
import { Row, Col, Card } from 'antd';

const InstructorResults = ({ data }) => {
  const getAge = (birthday) =>
    Math.floor((new Date() - new Date(birthday)) / 1000 / 60 / 60 / 24 / 365);

  return (
    <>
      <Row style={{ marginTop: '2rem', marginLeft: '2rem' }}>
        {data.map((val) => (
          <Col xs={24} md={8}>
            <Card
              key={parseInt(val, 3)}
              title={`${val.fName} ${val.lName}`}
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
                      : 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2476&q=80'
                  }
                />
              }
              extra={<a href="/profile">Profile</a>}
              style={{ width: '90%', marginTop: '2rem' }}
            >
              <p> Gender: {val.gender ? val.gender : 'Not given :('}</p>
              <p> Age : {val.birthday ? getAge(val.birthday) : 'Not given :('}</p>
              <p>
                {' '}
                Tags:{' '}
                {val.tags.map((tag) => (
                  <>{tag} </>
                ))}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
export default InstructorResults;
