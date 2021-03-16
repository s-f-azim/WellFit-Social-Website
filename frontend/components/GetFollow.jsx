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
      />
    </Card>
  </>
);

GetFollow.Item = ({ follow }) => (
  <>
    <List.Item key={follow._id}>
      <List.Item.Meta title={follow.name.split(' ')[0]} />
      <List.Item.Meta title={follow.name.split(' ')[1]} />
    </List.Item>
  </>
);

export default GetFollow;
