/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-inner-declarations */
import { Row, Col, Button, Typography, Space, Divider, Rate, notification, Skeleton } from 'antd';
import {
  CheckOutlined,
  UserOutlined,
  HomeOutlined,
  CarOutlined,
  DesktopOutlined,
  InfoCircleOutlined,
  ProfileOutlined,
  CameraOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
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

  // state to indicate whether or not the user's wish list has been fetched yet
  const [wishListFetched, setWishListFetched] = useState(false);
  // the courses in the user's wish list
  const [courses, setCourses] = useState({});
  const [creators, setCreators] = useState([]);

  if (course) {
    useEffect(async () => {
      if (session) {
        try {
          const response = await api.get('/users/wishlist');
          setCourses(response.data.data);
          // now that the courses from the wish list have been fetched, update the state
          setWishListFetched(true);
          const response2 = await api.get(`/courses/${course._id}/creators`);
          setCreators(response2.data.data);
          // now that the creators of the course have been fetched, the course card can be shown
          setShowState(true);
        } catch (error) {
          console.log(error);
        }
      }
    }, []);

    // Add this course to the user's wish list and then remove the add to wish list button
    function addToWishList() {
      /* eslint-disable no-underscore-dangle */
      api.patch(`/users/updatewishlist/${course._id}`, {});
      notification.open({
        message: 'Course added to wish list!',
        duration: 2,
        icon: <CheckOutlined style={{ color: '#33FF49' }} />,
      });
      ReactDOM.render(<></>, document.getElementById('wishListButton'));
    }

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
    />;
    return (
      <div style={{ padding: '2em' }}>
        <Row justify="center">
          <Typography.Title level={1} style={{ fontSize: '2.3rem', fontFamily: 'Poppins' }}>
            {course.title} <ProfileOutlined />
          </Typography.Title>
        </Row>
        <Divider>
          <h3>
            Course information <InfoCircleOutlined />
          </h3>
        </Divider>
        <Row
          align="top"
          justify="space-around"
          gutter={[
            { xs: 8, sm: 26, md: 44, lg: 52 },
            { xs: 8, sm: 6, md: 14, lg: 22 },
          ]}
          style={{ margin: '2rem' }}
        >
          <Col>
            <h2>
              Course Preview <CameraOutlined />
            </h2>

            <Divider />
            <Image
              src={
                course.photos[0]
                  ? `data:image/png;base64,${Buffer.from(course.photos[0].data).toString('base64')}`
                  : '/image-not-found.svg'
              }
              width={300}
              height={300}
            />
          </Col>
          <Col md={6}>
            <Space direction="vertical" wrap>
              <h1 style={{ color: 'grey' }}>
                <strong> Course creator(s):</strong>
                {creators.map((creator) => (
                  <Link href={`/users/${creator._id}`}>
                    <Button type="text">
                      <h2 style={{ color: '#ffa277' }}>
                        <UserOutlined /> Go To {creator.fName}'s Profile
                      </h2>
                    </Button>
                  </Link>
                ))}
              </h1>
              <Divider />
              <Typography.Paragraph style={{ fontSize: '1.4rem', color: 'grey' }}>
                <strong>Course Description: </strong>
                <h6 style={{ color: 'grey' }}>{course.description}</h6>
                <br />
                <strong>Recommended level: </strong>
                {course.fitnessLevel}
                <br />
                <br />
                {course.trainingDuration && (
                  <div>
                    <strong>Session duration (min): </strong>
                    {course.trainingDuration}
                  </div>
                )}
              </Typography.Paragraph>
              <Divider />
              <Typography.Paragraph style={{ fontSize: '1.4rem', color: 'black' }}>
                <ul>
                  <h5>
                    {course.gym ? (
                      <li>
                        You need access to a gym for this course <CarOutlined />.
                      </li>
                    ) : (
                      <li>
                        You can take this course from home <HomeOutlined />.
                      </li>
                    )}
                    {course.isVirtual ? (
                      <li>
                        This is an in-person course <UserOutlined />.
                      </li>
                    ) : (
                      <li>
                        This is a virtual course <DesktopOutlined />.
                      </li>
                    )}
                  </h5>
                </ul>
              </Typography.Paragraph>
            </Space>
          </Col>
          <Col>
            <Typography.Title level={2}>
              {course.price > 0 ? `Price: $${course.price}` : 'Free'}
            </Typography.Title>
            <Divider />
            <h2>
              <strong>Course Tagged with:</strong>
            </h2>
            <Space>
              {course.tags.map((tag) => (
                <h3>{`#${tag}`}</h3>
              ))}
            </Space>
            <br />
            <Button onClick={handleClick} type="primary" size="large">
              Purchase this course <ShoppingCartOutlined />
            </Button>
            <br />
            <br />
            <div id="wishListButton">
              {/**
               * If the wish list has not yet been fetched or it has but this course is already in
               * the wish list, display nothing. If this course is not in the wish list, display a
               * button to add the course to the wish list.
               */}
              {wishListFetched ? (
                courses.find((c) => c._id === course._id) ? null : (
                  <Button type="primary" size="large" onClick={() => addToWishList()}>
                    Or Add to your wish list <HeartOutlined />
                  </Button>
                )
              ) : null}
            </div>
          </Col>
        </Row>
      </div>
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
