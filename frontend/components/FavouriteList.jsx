import { useState, useEffect } from 'react';
import { Card, Space, Row, Col } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import Image from 'next/image';


/**
 * TODO:
 * 	-Make useEffect callback func async
 * 	-Make fetchMorePosts async also
 */

const { Meta } = Card;

const Favourites = () => {
    //const postsTest = [{_id: 1}, {_id: 2}];
		const [posts, setPosts] = useState([]);
		const [hasMore, setHasMore] = useState(true);
		const fetchMorePosts = () => {
			const postsTest = Array.from({ length: 20 });
			if (posts.length <= 40) { //if 
				setTimeout(() => {
					setPosts(posts.concat(postsTest));
				}, 1000);	
			} else {
				setHasMore(false);
			}
		};

		// useEffect( () => {
		// 	const postsTest = Array.from({ length: 20 });
		// 	setTimeout(() => {
		// 		setPosts(posts.concat(postsTest));
		// 	}, 500);	
		// 	console.log(posts.length);
		// }, [] );



    return (
			<div style={{overflow: "auto", height: 600, width: 330}}>
				<InfiniteScroll
					loadMore={fetchMorePosts}
					hasMore={hasMore}
					useWindow={false}
					loader={ 
						<div style={{textAlign: 'center'}}>
							<LoadingOutlined/> 
						</div>
						}
				>
					<div style={{display: "flex", flexFlow: "row wrap", }}>
						{
							posts.map( (post, index) => 
								<Card
									hoverable
									style={{
										width: 100,
										height: 100,
										margin: 4
									}}
									cover= {
										<Image 
											src='/image-not-found.svg'
											width={100}
											height={100}
										/>}
								/>
							)
						}
					</div>
					
				</InfiniteScroll>
			</div>
        
					
    );
};

export default Favourites;