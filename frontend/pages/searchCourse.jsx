import { Row } from 'antd';
import { NextSeo } from 'next-seo';
import SearchCard from '../components/generalComponents/Search/SearchCard';
import categories from '../data/categories';

const searchPage = () => (
  <>
    <NextSeo
      title="Search Course Page"
      description="A page from which search results are displayed as cards."
    />
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
  </>
);
export default searchPage;
