/* eslint-disable no-underscore-dangle */
import { List, Button } from 'antd';
import Link from 'next/link';

const GetFollow = ({ data }) => (
  <>
    <List
      itemLayout="vertical"
      size="small"
      pagination={{
        pageSize: 10,
      }}
      dataSource={data}
      renderItem={(r) => <GetFollow.Item follow={r} />}
    />
  </>
);

GetFollow.Item = ({ follow }) => (
  <>
    <List.Item key={follow.id}>
      {/* <List.Item.Meta/> */}
      <h5>
        <Link href={`/users/${follow._id}`}>
          {`${follow.fName.charAt(0).toUpperCase() + follow.fName.substr(1).toLowerCase()} ${`${
            follow.lName.charAt(0).toUpperCase() + follow.lName.substr(1).toLowerCase()
          } `}`}
        </Link>
      </h5>
    </List.Item>
  </>
);

export default GetFollow;
