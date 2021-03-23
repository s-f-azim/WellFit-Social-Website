import { useState, useEffect } from 'react';
import { Card, List, Avatar, Descriptions, Icon } from 'antd';
import { getTrendingUsers } from '../actions/user.js';
import { UserOutlined, BarChartOutlined } from '@ant-design/icons';

const { Item } = List;
const { Meta } = Item;

const TrendingUsers = () => { //Card of list of trending users in db

	const[data, setData] = useState([]);

	useEffect( async () => {
		const response = await getTrendingUsers();
		setData(response.data.data);
	});

	let rank = 1;
	return (
		<Card
			title={
				<div style={{display: "flex", paddingBottom: 0}}>
					<BarChartOutlined style={{fontSize: "24px", paddingRight: 4}}/>
					<h3>Trending Users</h3> 
				</div>
			} 
			style={{ width: 350}}
			bodyStyle={{padding: 0, paddingLeft: 10, paddingRight: 0}}
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