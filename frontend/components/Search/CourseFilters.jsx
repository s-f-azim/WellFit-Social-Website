import { Select } from 'antd';

const CourseFilter = ({ tagsOption, equipOptions, setTags, setETags }) => (
  <>
    <div id="filterrow" style={{ display: 'block', paddingTop: '2rem', width: '80%' }}>
      <Select
        style={{
          marginLeft: '1rem',
          marginRight: '1rem',
          marginTop: '1rem',
          display: 'inline-block',
          width: '40%',
          minWidth: '400px',
        }}
        mode="multiple"
        placeholder="Equipment needed"
        onChange={setETags}
      >
        {equipOptions}
      </Select>
      <Select
        style={{
          marginLeft: '1rem',
          marginRight: '1rem',
          marginTop: '1rem',
          display: 'inline-block',
          width: '40%',
          minWidth: '400px',
        }}
        mode="multiple"
        placeholder="Tags"
        onChange={setTags}
      >
        {tagsOption}
      </Select>
    </div>
  </>
);

export default CourseFilter;
