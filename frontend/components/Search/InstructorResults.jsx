import Image from 'next/image';
import { Input, Row, Col, Card, Select, Radio } from 'antd';
import { useState } from 'react';
import { getInstructors } from '../../actions/user';

const { Option } = Select;
const { Search } = Input;

const InstructorResults = ({ data }) => (
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
            <p> Gender: {val.gender}</p>
            <p> Age: {val.age}</p>
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
export default InstructorResults;
