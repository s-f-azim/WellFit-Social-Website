import Image from 'next/image';
import { Input, Row, Col, Card, Select } from 'antd';
import { useState } from 'react';
import axios from 'axios';

const { Option } = Select;
const { Search } = Input;

const users = [
  { name: 'Oskar', age: 19, tags: ['abs', 'core', 'cardio'] },
  { name: 'Oskar6', age: 19, tags: ['abs', 'core', 'cardio'] },
  { name: 'Oskar5', age: 19, tags: ['abs', 'core', 'cardio'] },
  { name: 'Oskar2', age: 19, tags: ['abs', 'test2', 'cardio'] },
  { name: 'Oskar3', age: 19, tags: ['abs', 'test3', 'cardio'] },
  { name: 'Oskar4', age: 19, tags: ['abs', 'test4', 'cardio'] },
];

const SearchBar = () => {
  const [q, setQuery] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(0);
  const [stags, setTags] = useState([]);
  const [data, setData] = useState(users);
  const searchName = (qP, genderP) => {
    axios
      .get(
        `http://localhost:4000/api/users/instructors/?q=${qP}&&gender=${genderP}&&age=${age}&&tags=${stags.join(
          ','
        )}`
      )
      .then(({ result }) => {
        setData(result.data);
      });
  };
  const tags = [
    <Option key={13} value="GetFit">
      GetFit
    </Option>,
    <Option key={23} value="Cardio">
      Cardio
    </Option>,
    <Option key={33} value="Sweat">
      Sweat
    </Option>,
    <Option key={43} value="Cycling">
      Cycling
    </Option>,
    <Option key={53} value="FitFam">
      FitFam
    </Option>,
    <Option key={63} value="FitLife">
      FitLife
    </Option>,
    <Option key={73} value="Fitness">
      Fitness
    </Option>,
    <Option key={83} value="FitnessMotivation">
      FitnessMotivation
    </Option>,
    <Option key={93} value="FitnessAddict">
      FitnessAddict
    </Option>,
    <Option key={103} value="GetStrong">
      GetStrong
    </Option>,
    <Option key={113} value="LiftHeavy">
      LiftHeavy
    </Option>,
    <Option key={123} value="GirlsWhoLift">
      GirlsWhoLift
    </Option>,
    <Option key={133} value="GymLife">
      GymLife
    </Option>,
    <Option key={143} value="GymTime">
      GymTime
    </Option>,
    <Option key={153} value="NoPainNoGain">
      NoPainNoGain
    </Option>,
    <Option key={163} value="PersonalTrainer">
      PersonalTrainer
    </Option>,
    <Option key={173} value="Weights">
      Weights
    </Option>,
    <Option key={183} value="WeightLifting">
      WeightLifting
    </Option>,
    <Option key={193} value="Workout">
      Workout
    </Option>,
  ];
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
          onSearch={searchName(q, gender)}
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
            {tags}
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
