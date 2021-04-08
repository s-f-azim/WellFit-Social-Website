/* eslint-disable no-nested-ternary */
import { Input, Select, Radio, Pagination, Row, Col, Empty } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import { FrownOutlined } from '@ant-design/icons';
import { getPeople } from '../actions/user';
import { getCourses } from '../actions/course';
import PeopleResults from '../components/generalComponents/Search/PeopleResults';
import CourseResults from '../components/generalComponents/Search/CourseResults';
import equip from '../data/equipment';
import PeopleFilter from '../components/generalComponents/Search/PeopleFilters';
import CourseFilter from '../components/generalComponents/Search/CourseFilters';
import SearchQuestionaire from '../components/generalComponents/Search/Search';
import searchRadius from '../actions/search';
import tags from '../data/tags';

const { Option } = Select;
const { Search } = Input;

const SearchBar = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [stags, setTags] = useState([]);
  const [etags, setETags] = useState([]);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchType, setSearchType] = useState(router.query.tab ? router.query.tab : 'People');
  const [query, setQuery] = useState({});
  let response;

  const searchName = async () => {
    response = null;
    if (searchType === 'People') {
      try {
        response = await getPeople(name, gender, age, stags, pageSize, currentPage);
      } catch (err) {
        console.log(err);
      }
    } else if (searchType === 'Courses') {
      try {
        response = await getCourses(name, stags, etags, pageSize, currentPage);
      } catch (err) {
        console.log(err);
      }
    } else if (searchType === 'Questionnaire' && query.values) {
      try {
        const { type, location } = query.values;
        response = await searchRadius(
          type,
          location,
          currentPage,
          query.category.name.replace(/\s/g, '')
        );
      } catch (err) {
        console.log(err);
      }
    }
    if (response) {
      setData(response.data.data);
      setTotal(response.data.pagination.total);
    }
  };
  useEffect(() => {
    searchName();
  }, [searchType, currentPage, query, pageSize]);

  const handlePaginationChange = (current, updatedPageSize) => {
    setCurrentPage(current);
    setPageSize(updatedPageSize);
  };

  const tagsOption = tags.map((tag) => (
    <Option key={tag} value={tag}>
      {tag}
    </Option>
  ));

  const equipOptions = equip.map((tag) => (
    <Option key={tag} value={tag}>
      {tag}
    </Option>
  ));
  return (
    <>
      <NextSeo
        title="Search Page"
        description="A page from which a user can search the site for questionnaires, courses, and people."
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Radio.Group
          style={{ paddingBottom: '2rem' }}
          onChange={(e) => {
            setData([]);
            setCurrentPage(1);
            setSearchType(e.target.value);
            setQuery({});
          }}
          defaultValue={router.query.tab ? router.query.tab : 'People'}
          size="large"
        >
          <Radio.Button value="Questionnaire">Questionnaire</Radio.Button>
          <Radio.Button value="People">People</Radio.Button>
          <Radio.Button value="Courses">Courses</Radio.Button>
        </Radio.Group>
        <Col>
          {searchType === 'Questionnaire' && !query.values && (
            <Row justify="center">
              <SearchQuestionaire setQuery={setQuery} />
            </Row>
          )}
          {searchType !== 'Questionnaire' && (
            <Row style={{ padding: '2em' }}>
              <Search
                type="text"
                enterButton="Search"
                size="large"
                onSearch={searchName}
                onChange={(e) => setName(e.target.value)}
                placeholder="Search for something..."
              />
            </Row>
          )}
          {searchType === 'People' && (
            <Row justify="center">
              <PeopleFilter
                setGender={setGender}
                setAge={setAge}
                setTags={setTags}
                tagsOption={tagsOption}
              />
            </Row>
          )}
          {searchType === 'Courses' && (
            <Row justify="center">
              <CourseFilter
                setTags={setTags}
                setETags={setETags}
                tagsOption={tagsOption}
                equipOptions={equipOptions}
              />
            </Row>
          )}
        </Col>
      </div>
      {(searchType === 'People' || (query.values && query.values.type === 'users')) &&
      data.length > 0 ? (
        <PeopleResults data={data} />
      ) : (searchType === 'Courses' || (query.values && query.values.type === 'courses')) &&
        data.length > 0 ? (
        <CourseResults data={data} />
      ) : (
        !query.values &&
        data.length <= 0 && (
          <Empty
            style={{ margin: '2em' }}
            description={
              <span>
                We didn't find anything that matched your search <FrownOutlined />
              </span>
            }
          />
        )
      )}
      <Row justify="center">
        {response !== null && (
          <Pagination
            responsive
            showSizeChanger
            onShowSizeChange={handlePaginationChange}
            defaultCurrent={0}
            total={total}
            current={currentPage}
            style={{ margin: '2rem', alignItems: 'center' }}
            onChange={handlePaginationChange}
          />
        )}
      </Row>
    </>
  );
};

export default SearchBar;
