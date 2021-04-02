import { Select, Row, Col } from 'antd';

const CourseFilter = ({ tagsOption, equipOptions, setTags, setETags }) => (
  <>
    <div id="filterrow">
      <Select
        className="courseSelect"
        mode="multiple"
        placeholder="Equipment needed"
        onChange={setETags}
      >
        {equipOptions}
      </Select>
      <Select className="courseSelect" mode="multiple" placeholder="Tags" onChange={setTags}>
        {tagsOption}
      </Select>
    </div>
  </>
);

export default CourseFilter;
