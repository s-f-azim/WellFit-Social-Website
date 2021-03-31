import { Select, Row, Col } from 'antd';

const CourseFilter = ({ tagsOption, equipOptions, setTags, setETags }) => (
  <>
    <div id="filterrow" style={{ display: 'block', paddingTop: '2rem', width: '80%' }}>
      <Row>
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
      </Row>
      <Row>
        <Col>
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
        </Col>
      </Row>
    </div>
  </>
);

export default CourseFilter;
