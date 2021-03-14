/* eslint-disable no-underscore-dangle */
import { List, Rate, Button, Menu, Dropdown, Card } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { deleteReview } from '../actions/review';

const GetFollow = ({ data }) => (
  <>
    <Card>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 2,
        }}
        dataSource={data}
        renderItem={(r) => <GetFollow.Item follow={r} />}
      ></List>
    </Card>
  </>
);

GetFollow.Item = ({ follow }) => {
  return (
    <>
      <List.Item key={follow._id}>
        <List.Item.Meta title={follow.name} />
      </List.Item>
    </>
  );
};

export default GetFollow;
