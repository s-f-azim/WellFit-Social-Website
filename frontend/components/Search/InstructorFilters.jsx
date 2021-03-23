import Image from 'next/image';
import { Input, Row, Col, Card, Select, Radio, Slider } from 'antd';

const { Option } = Select;
const { Search } = Input;

const InstructorFilter = ({ setGender, setAge, setTags, tagsOption }) => (
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
        minWidth: '400px',
      }}
      mode="multiple"
      placeholder="Tags"
      onChange={setTags}
    >
      {tagsOption}
    </Select>
  </div>
);

export default InstructorFilter;
