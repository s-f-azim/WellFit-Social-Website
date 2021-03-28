/* eslint-disable no-underscore-dangle */
import { List } from 'antd';

const GetFollow = ({ data }) => (
  <>
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: 2,
      }}
      dataSource={data}
      renderItem={(r) => <GetFollow.Item follow={r} />}
    />
  </>
);

GetFollow.Item = ({ follow }) => (
  <>
    <List.Item key={follow.id}>
      <List.Item.Meta
        title={`Name: ${
          follow.fName.charAt(0).toUpperCase() + follow.fName.substr(1).toLowerCase()
        } ${follow.lName.charAt(0).toUpperCase() + follow.lName.substr(1).toLowerCase()}`}
        description={`User Id: ${follow._id}`}
      />
    </List.Item>
  </>
);

export default GetFollow;
