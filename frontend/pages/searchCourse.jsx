import { Row, Card, Col, Modal, Typography, Carousel, Steps } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import { tags, categories } from '../data/questions';

const searchPage = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ margin: '2rem', minHeight: '65vh', padding: '2rem' }}
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        {categories.map((category) => (
          <Col className="category-container">
            <Image src={category.photo} height={450} width={450} objectFit="contain" />
            <Typography.Title>{category.name}</Typography.Title>
          </Col>
        ))}
      </Row>
      <Modal></Modal>
    </>
  );
};
export default searchPage;
