/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-inner-declarations */
import {
  Row,
  Col,
  Button,
  Typography,
  Space,
  Divider,
  Rate,
  notification,
  Skeleton,
  Popconfirm,
} from 'antd';
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
  DeleteOutlined,
} from '@ant-design/icons';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import api from '../../services/api';
import stripePromise from '../../services/stripe';
import checkout from '../../actions/payment';
import { CourseReview } from '../../components/userComponents/reviewComponents/Review';
import { getWishList, updateWishList } from '../../actions/user';
import { getCourseCreators, deleteCourse } from '../../actions/course';

const Course = ({ course }) => {
  const [session, loading] = useSession();
  // state to indicate whether or not the user's wish list has been fetched yet
  const [wishListFetched, setWishListFetched] = useState(false);
  const [userIsCreator, setUserIsCreator] = useState(false);
  // the courses in the user's wish list
  const [courses, setCourses] = useState({});
  // list of creators of this course
  const [creators, setCreators] = useState([]);
  const router = useRouter();
  if (router.isFallback) {
    return <Skeleton active />;
  }

  useEffect(async () => {
    try {
      const response = await getCourseCreators(course._id);
      setCreators(response.data.data);
    } catch (error) {
      console.log(error);
    }
    try {
      // only attempt to fetch wish list if the current user is a client
      if (session && session.user.role === 'client') {
        const response = await getWishList();
        setCourses(response.data.data);
        setWishListFetched(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, [session]);

  useEffect(() => {
    if (session && creators.some((user) => user._id === session.user._id)) {
      setUserIsCreator(true);
    }
  }, [creators, session]);

  if (typeof window !== 'undefined' && loading) return null;

  // Add this course to the user's wish list and then remove the add to wish list button
  function addToWishList() {
    /* eslint-disable no-underscore-dangle */
    updateWishList(course._id);
    notification.open({
      message: 'Course added to wish list!',
      duration: 2,
      icon: <CheckOutlined style={{ color: '#33FF49' }} />,
    });
    ReactDOM.render(null, document.getElementById('wishListButton'));
  }

  const handleCourseDelete = async (id) => {
    try {
      await deleteCourse(id);
      notification.open({
        message: 'Course successfully deleted!',
        duration: 2,
        icon: <CheckOutlined style={{ color: '#70FF00' }} />,
      });
      router.replace('/');
    } catch (error) {
      console.log(error);
    }
  };

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
      await stripe.redirectToCheckout({ sessionId: response.data.id });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: '2em' }}>
      <NextSeo
        title="Course Page"
        description="A page containing all the information about a specific course."
      />
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
            alt="a preview picture of the course"
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
                  <Button type="text" aria-label="goToProfilePage">
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
              {course.trainingDuration && (
                <div>
                  <strong>Session duration (min): </strong>
                  {course.trainingDuration}
                </div>
              )}
            </Typography.Paragraph>
            <Divider />
            <div style={{ fontSize: '1.4rem', color: 'black' }}>
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
                      This is a virtual course <DesktopOutlined />.
                    </li>
                  ) : (
                    <li>
                      This is an in-person course <UserOutlined />.
                    </li>
                  )}
                </h5>
              </ul>
            </div>
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
          <Button aria-label="purchase" onClick={handleClick} type="primary" size="large">
            Purchase this course <ShoppingCartOutlined />
          </Button>
          <br />
          <br />
          {
            // Only display if creator is logged in
            userIsCreator ? (
              <Popconfirm
                title="Are you sure?"
                onConfirm={() => handleCourseDelete(course._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" size="large" aria-label="deleteCourse" danger>
                  Delete this course <DeleteOutlined />
                </Button>
              </Popconfirm>
            ) : null
          }
          <div id="wishListButton">
            {/**
             * If the wish list has not yet been fetched or it has but this course is already in
             * the wish list, display nothing. If this course is not in the wish list, display a
             * button to add the course to the wish list.
             */}
            {wishListFetched ? (
              courses.find((c) => c._id === course._id) ? null : (
                <Button
                  type="primary"
                  size="large"
                  onClick={() => addToWishList()}
                  aria-label="addToWishList"
                >
                  Or Add to your wish list <HeartOutlined />
                </Button>
              )
            ) : null}
          </div>
        </Col>
      </Row>
      <Row justify="space-around">
        <Col span={20}>
          <CourseReview id={course._id} />
        </Col>
      </Row>
    </div>
  );
};

// check if the id was given and prerender the page using the above template
// this is using incremental static regeneration to rehydrate the page every 10 minutes
export const getStaticProps = async ({ params }) => {
  const courseId = params ? params.id : undefined;
  let response;
  try {
    response = await api.get(`/courses/${courseId}`);
  } catch (error) {
    console.log(error);
  }

  if (response) {
    return { props: { course: response.data.data }, revalidate: 60 * 10 };
  }

  return {
    notFound: true,
  };
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
