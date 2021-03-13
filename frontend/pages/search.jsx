import Image from 'next/image';
import { Input, Row, Col, Card, Select } from 'antd';
import { useState } from 'react';
import { getInstructors } from '../actions/user';

const { Option } = Select;
const { Search } = Input;

const SearchBar = () => {
  const [q, setQuery] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [stags, setTags] = useState([]);
  const [data, setData] = useState([]);
  const searchName = async () => {
    console.log(`${age} ${q} ${gender} ` + ` TAGS : ${stags}`);
    const response = await getInstructors(q, gender, age, stags);
    setData(response.data.data);
  };
  /* can be replaced by data/tags  */
  const tags = [
    'GetFit',
    'Cardio',
    'Cycling',
    'FitFam',
    'FitLife',
    'Fitness',
    'FitnessMotivation',
    'FitnessAddict',
    'GetStrong',
    'LiftHeavy',
    'GirlsWhoLift',
    'GymLife',
    'GymTime',
    'NoPainNoGain',
    'PersonalTrainer',
    'Sweat',
    'Weights',
    'WeightLifting',
    'Workout',
  ];
  const tagsOption = tags.map((tag) => (
    <Option key={tag.id} value={tag}>
      {tag}
    </Option>
  ));
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Search
          type="text"
          enterButton="Search"
          size="large"
          onSearch={searchName}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search me..."
          style={{ width: '90%' }}
        />
        {/* TODO: ADD LINK TO PROFILE! */}
        <div id="filterrow" style={{ display: 'block', paddingTop: '2rem', width: '80%' }}>
          <Select
            defaultValue="All Genders"
            style={{ marginLeft: '1rem', marginRight: '1rem' }}
            placeholder="Gender"
            onChange={setGender}
          >
            <Option value="Female">Female</Option>
            <Option value="Male">Male</Option>
            <Option value="Non-Binary">Non-Binary</Option>
            <Option value="">All Genders</Option>
          </Select>

          <Select
            defaultValue="All Ages"
            style={{ marginLeft: '1rem', marginRight: '1rem' }}
            placeholder="Age"
            onChange={setAge}
          >
            <Option value="0">All Ages</Option>
            <Option value="23">18-28</Option>
            <Option value="34">29-39</Option>
            <Option value="45">40-50</Option>
            <Option value="56">51-61</Option>
            <Option value="62">62+</Option>
          </Select>
          <Select
            style={{
              marginLeft: '1rem',
              marginRight: '1rem',
              marginTop: '1rem',
              display: 'inline-block',
              width: '50%',
            }}
            mode="multiple"
            placeholder="Tags"
            onChange={setTags}
          >
            {tagsOption}
          </Select>
        </div>
      </div>

      <Row style={{ marginTop: '2rem', marginLeft: '2rem' }}>
        {data.map((val) => (
          <Col xs={24} md={8}>
            <Card
              key={parseInt(val, 3)}
              title={val.name}
              cover={
                <Image
                  alt="Avatar"
                  layout="responsive"
                  width="440px"
                  height="440px"
                  src={val.avatar ? val.avatar : '/alex-suprun-ZHvM3XIOHoE-unsplash-2.jpg'}
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
};

export default SearchBar;
