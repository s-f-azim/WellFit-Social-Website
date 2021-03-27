import { Row, Col, Button, Typography, Space, Divider, Rate, notification, Skeleton } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import NotFound from '../../components/generalComponents/404';
import api from '../../services/api';
import stripePromise from '../../services/stripe';
import checkout from '../../actions/payment';

const columnStyle = { width: 350, height: 'auto' };

const Course = ({ course }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Skeleton active />;
  }
  const [session, loading] = useSession();

  if (typeof window !== 'undefined' && loading) return null;

  if (course) {
    useEffect(async () => {
      if (session) {
        try {
          const response = await api.get('/users/wishlist');
          setCourses(response.data.data);
          // now that the courses from the wish list have been fetched, update the state
          setWishListFetched(true);
        } catch (error) {
          console.log(error);
        }
      }
    }, []);
    // Add this course to the user's wish list and then remove the add to wish list button
    function addToWishList() {
      /* eslint-disable no-underscore-dangle */
      api.patch(`/users/addToWishList/${course._id}`, {});
      notification.open({
        message: 'Course added to wish list!',
        duration: 2,
        icon: <CheckOutlined style={{ color: '#33FF49' }} />,
      });
      ReactDOM.render(<></>, document.getElementById('wishListButton'));
    }
    // state to indicate whether or not the user's wish list has been fetched yet
    const [wishListFetched, setWishListFetched] = useState(false);
    // the courses in the user's wish list
    const [courses, setCourses] = useState({});

    // handle the payment
    const handleClick = async (e) => {
      try {
        const stripe = await stripePromise;
        const response = await checkout({
          courseId: course._id,
          line_items: [
            {
              name: course.title,
              description: course.description,
              amount: course.price * 100,
              currency: 'usd',
              quantity: 1,
            },
          ],
        });
        const { error } = await stripe.redirectToCheckout({ sessionId: response.data.id });
      } catch (err) {
        console.log(err);
      }
    };
    <Image
      src={
        course.photos[0]
          ? `data:image/jpeg;base64,${Buffer.from(course.photos[0].data).toString('base64')}`
          : '/not-found.png'
      }
      width={300}
      height={300}
    />;
    return (
      <Row
        align="middle"
        justify="center"
        gutter={[
          { xs: 8, sm: 26, md: 44, lg: 52 },
          { xs: 8, sm: 6, md: 14, lg: 22 },
        ]}
        style={{ margin: '2rem' }}
      >
        <Col md={10}>
          <Image
            src={
              course.photos[0]
                ? `data:image/png;base64,${Buffer.from(course.photos[0].data).toString('base64')}`
                : '/image-not-found.svg'
            }
            width={600}
            height={600}
          />
        </Col>
        <Col md={6}>
          <Space direction="vertical" wrap>
            <Typography.Title
              level={1}
              style={{ fontSize: '2.3rem', fontFamily: 'Poppins', ...columnStyle }}
            >
              {course.title}
            </Typography.Title>
            <Divider />
            <Rate disabled defaultValue={4} />
            <Divider />
            <Typography.Title level={2}>
              {course.price > 0 ? `Price: $${course.price}` : 'Free'}
            </Typography.Title>
            <Divider />
            <Typography.Paragraph style={{ fontSize: '1.4rem', color: 'grey' }}>
              Description: {course.description}
            </Typography.Paragraph>
            <Divider />
            <Space>
              {course.tags.map((tag) => (
                <h3>{`#${tag}`}</h3>
              ))}
            </Space>
            <Space direction="horizontal" size="large">
              <Button onClick={handleClick} type="primary" shape="round" size="large">
                Buy
              </Button>
              <div id="wishListButton">
                {/**
                 * If the wish list has not yet been fetched or it has but this course is already in
                 * the wish list, display nothing. If this course is not in the wish list, display a
                 * button to add the course to the wish list.
                 */}
                {session && wishListFetched ? (
                  courses.find((c) => c._id === course._id) ? null : (
                    <Button
                      type="primary"
                      shape="round"
                      size="large"
                      onClick={() => addToWishList()}
                    >
                      Add to wish list
                    </Button>
                  )
                ) : null}
              </div>
            </Space>
          </Space>
        </Col>
      </Row>
    );
  }
  return <NotFound />;
};

// check if the id was given and prerender the page using the above template
// this is using incremental static regeneration to rehydrate the page every 10 minutes
export const getStaticProps = async ({ params }) => {
  const courseId = params ? params.id : undefined;
  const response = await api.get(`/courses/${courseId}`);
  return { props: { course: response.data.data }, revalidate: 60 * 10 };
};

// create all the pages possible for each individual course and make it static to improve performance significantly
// each page will be at url/courses/id
export const getStaticPaths = async () => {
  const { data } = await api.get(`/courses?limit=50`);
  const paths = data.data.map((course) => ({
    params: {
      id: course._id.toString(),
    },
  }));
  return { fallback: true, paths };
};

export default Course;
