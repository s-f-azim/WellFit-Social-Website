import { Select } from 'antd';

const { Option } = Select;

const PeopleFilter = ({ setGender, setAge, setTags, tagsOption }) => (
  <div
    id="filterrow"
    style={{
      display: 'flex',
      flexFlow: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '2rem',
      width: '80%',
    }}
  >
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
      defaultValue="instructor"
      style={{ marginLeft: '1rem', marginRight: '1rem' }}
      placeholder="Role"
      onChange={setAge}
    >
      <Option value="instructor">instructor</Option>
      <Option value="client">client</Option>
    </Select>
    <Select
      style={{
        marginLeft: '1rem',
        marginRight: '1rem',
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

export default PeopleFilter;
