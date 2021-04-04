import { useState, useEffect } from 'react';
import { Card, Space, Row, Col } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import Image from 'next/image';
import {getFavouritedPosts, updateFavouritedPosts} from '../../actions/user';


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
		const loadQuantity = 10;

		const fetchMorePosts = async () => {
			const fetchedPosts = (await getFavouritedPosts(posts.length + loadQuantity)).data.data;
			console.log(typeof(fetchedPosts.length)); 
			if (posts.length !== fetchedPosts.length) { //if more posts have been fetched
				setPosts(fetchedPosts);
			} else {
				setHasMore(false);
			}
		};

    return (
			<div style={{overflow: "auto", height: "auto", width: 660, maxHeight: 700}}>
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
										width: 200,
										height: 200,
										margin: 4
									}}
									cover= {
										<Image 
											src='/image-not-found.svg'
											width={400}
											height={400}
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