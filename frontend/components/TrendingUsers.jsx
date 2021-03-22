import { useState, useEffect } from 'react';
import { Card, List, Avatar, Descriptions } from 'antd';
import { getTrendingUsers } from '../actions/user.js';
import { UserOutlined } from '@ant-design/icons';

const { Item } = List;
const { Meta } = Item;

const TrendingUsers = () => { //Card of list of trending users in db

	const[data, setData] = useState([]);

	useEffect( async () => {
		const response = await getTrendingUsers();
		setData(response.data.data);
		console.log("Done!");
	});

	let rank = 1;
	return (
		<Card
			title="Trending Users" 
			style={{ width: 350}}
			bodyStyle={{padding: 0, paddingLeft: 10, paddingRight: 10}}
			>
				<List
					style={{marginTop: 0, overflow: "auto", height: "auto", maxHeight: 400}}
					itemLayout="horizontal"
					dataSource={data}
					renderItem={user => (
						<Item>
							<Meta
								avatar={<Avatar icon={ <UserOutlined/> }/>}
								title={"#" + (rank++).toString() + " " + user.fName + " " + user.lName}
								description={
															<Descriptions.Item>
																{"Followers: " + user.follower.length} <br/>
																{user.role.charAt(0).toUpperCase() + user.role.slice(1)}
															</Descriptions.Item> }
								/>		
						</Item>
					)}
					>

				</List>
				
		</Card>
	);
};

export default TrendingUsers;