import { Row, Card, Col, Modal, Typography, Carousel, Steps } from 'antd';
import Image from 'next/image';
import SearchCard from '../components/Search';
import { tags, categories } from '../data/questions';

const searchPage = () => {
  return (
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
        <SearchCard category={category} />
      ))}
    </Row>
  );
};
export default searchPage;
