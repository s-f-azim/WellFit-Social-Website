import { Row } from 'antd';
import SearchCard from './SearchCard';
import { categories } from '../../../data/questions';

const Search = () => (
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
export default Search;
