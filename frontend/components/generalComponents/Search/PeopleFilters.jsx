import { Select } from 'antd';

const { Option } = Select;

const PeopleFilter = ({ setGender, setAge, setTags, tagsOption }) => (
  <div id="filterrow">
    <Select
      aria-label="gender selection"
      initialValues="All Genders"
      className="peopleSelectDrop"
      placeholder="Gender"
      onChange={setGender}
    >
      <Option value="Female">Female</Option>
      <Option value="Male">Male</Option>
      <Option value="Non-Binary">Non-Binary</Option>
      <Option value="">All Genders</Option>
    </Select>

    <Select
      aria-label="role selection"
      defaultValue="Registered as "
      className="peopleSelectDrop"
      placeholder="Role"
      onChange={setAge}
    >
      <Option value="instructor">instructor</Option>
      <Option value="client">client</Option>
    </Select>
    <Select
      aria-label="tag selection"
      className="peopleSelectTags"
      mode="multiple"
      placeholder="Tags"
      onChange={setTags}
    >
      {tagsOption}
    </Select>
  </div>
);

export default PeopleFilter;
