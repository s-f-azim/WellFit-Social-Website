import { Select, Row, Col } from 'antd';

const CourseFilter = ({ tagsOption, equipOptions, setTags, setETags }) => (
  <>
    <div id="filterrow">
      <Select
        style={{
          marginLeft: '1rem',
          marginRight: '1rem',
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
