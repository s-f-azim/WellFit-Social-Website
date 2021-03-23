import Image from 'next/image';
import { Input, Row, Col, Card, Select, Radio, Slider } from 'antd';
import { useState } from 'react';
import { getInstructors } from '../actions/user';
import { getCourses } from '../actions/course';
import InstructorResults from '../components/Search/InstructorResults';
import CourseResults from '../components/Search/CourseResults';
import equip from '../data/equipment';
import InstructorFilter from '../components/Search/InstructorFilters';
import CourseFilter from '../components/Search/CourseFilters';

const { Option } = Select;
const { Search } = Input;

const SearchBar = () => {
  const [q, setQuery] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [stags, setTags] = useState([]);
  const [etags, setETags] = useState([]);
  const [data, setData] = useState([]);
  const [searchType, setSearchType] = useState('Instructors');
  const searchName = async () => {
    console.log(`${searchType} ${age} ${q} ${gender}  TAGS : ${stags} ETAGS : ${etags} `);
    let response = 'Nothing';
    if (searchType === 'Instructors') {
      response = await getInstructors(q, gender, age, stags);
    } else if (searchType === 'Courses') {
      console.log(searchType);
      response = await getCourses(q, stags, etags);
    }
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

  const equipOptions = equip.map((tag) => (
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
        <Radio.Group
          style={{ paddingBottom: '2rem' }}
          onChange={(e) => {
            setSearchType(e.target.value);
            console.log(`changed input to ${e.target.value}`);
            searchName();
          }}
          defaultValue="Instructors"
          size="large"
        >
          <Radio.Button value="Instructors">Instructors</Radio.Button>
          <Radio.Button value="Courses">Courses</Radio.Button>
          <Radio.Button value="Collections">Collections</Radio.Button>
        </Radio.Group>
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
        {searchType == 'Instructors' ? (
          <InstructorFilter
            setGender={setGender}
            setAge={setAge}
            setTags={setTags}
            tagsOption={tagsOption}
          />
        ) : (
          <CourseFilter
            setTags={setTags}
            setETags={setETags}
            tagsOption={tagsOption}
            equipOptions={equipOptions}
          />
        )}
      </div>
      {searchType === 'Instructors' ? (
        <InstructorResults data={data} />
      ) : (
        <CourseResults data={data} />
      )}
    </>
  );
};

export default SearchBar;
