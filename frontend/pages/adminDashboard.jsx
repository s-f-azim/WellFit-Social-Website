/* eslint-disable import/no-duplicates */
import { Card, Row, Col, Statistic, Button, Tabs, List, notification, Badge } from 'antd';
import {
  FundProjectionScreenOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  StopOutlined,
  BugOutlined,
  MailOutlined,
  UserOutlined,
  CloseOutlined,
  CheckOutlined,
  DislikeOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useSession, getSession } from 'next-auth/client';
import {
  getUsers,
  getUsersWithLimit,
  getAdmins,
  getClients,
  getInstructors,
} from '../actions/user';
import { deleteRequest, getRequests, acceptVerify } from '../actions/request';
import AccessDenied from '../components/AccessDenied';
import BanUser from '../components/BanUser';
import DeleteUser from '../components/DeleteUser';
import { banUser } from '../actions/user';

const { TabPane } = Tabs;

const AdminDashboard = ({
  userCount,
  users,
  adminCount,
  clientCount,
  instructorCount,
  bugReports,
  verifyRequests,
  userReports,
  Messages,
}) => {
  const [session, loading] = useSession();
  const [allBugReports, setBugReports] = useState(bugReports);
  const [verifyRequest, setVerifyRequest] = useState(verifyRequests);
  const [allUserReports, setUserReports] = useState(userReports);

  if (typeof window !== 'undefined' && loading) return null;

  if (session && session.user.role === 'admin') {
    const title = (
      <h1>
        <FundProjectionScreenOutlined /> Admin Dashboard
      </h1>
    );
    const statisticsTitle = (
      <p>
        <BarChartOutlined /> Statistics
      </p>
    );

    const verifiedTitle = (
      <p>
        <CheckCircleOutlined /> Verify users <Badge count={verifyRequests.length} />
      </p>
    );

    const banTitle = (
      <p>
        <StopOutlined /> Ban/Delete users
      </p>
    );

    const bugTitle = (
      <p>
        <BugOutlined /> Bug reports <Badge count={bugReports.length} />
      </p>
    );

    const userTitle = (
      <p>
        <DislikeOutlined /> User reports <Badge count={userReports.length} />
      </p>
    );

    const contactTitle = (
      <p>
        <MailOutlined /> contact users
      </p>
    );

    const getRequestAuthor = (id) => {
      try {
        return users.filter((user) => user._id === id)[0].email;
      } catch (err) {
        return 'Not found';
      }
    };

    const onDeleteBug = async (report) => {
      await deleteRequest(report._id);
      allBugReports.splice(allBugReports.indexOf(report), 1);
      setBugReports([...allBugReports]);
      notification.open({
        message: 'Deleted report',
        duration: 2,
        icon: <CheckOutlined style={{ color: '#70FF00' }} />,
      });
    };

    const onDeleteVerify = async (report) => {
      await deleteRequest(report._id);
      verifyRequest.splice(verifyRequest.indexOf(report), 1);
      setVerifyRequest([...verifyRequest]);
      notification.open({
        message: 'Deleted request',
        duration: 2,
        icon: <CheckOutlined style={{ color: '#70FF00' }} />,
      });
    };

    const onDeleteReport = async (report) => {
      await deleteRequest(report._id);
      allUserReports.splice(allUserReports.indexOf(report), 1);
      setUserReports([...allUserReports]);
      notification.open({
        message: 'Deleted report',
        duration: 2,
        icon: <CheckOutlined style={{ color: '#70FF00' }} />,
      });
    };

    const onAcceptVerify = async (report) => {
      console.log(report.author);
      await acceptVerify(report.author);
      await deleteRequest(report._id);
      verifyRequest.splice(verifyRequest.indexOf(report), 1);
      setVerifyRequest([...verifyRequest]);
      notification.open({
        message: 'Accepted request',
        duration: 2,
        icon: <CheckOutlined style={{ color: '#70FF00' }} />,
      });
    };

    const onBanUser = async (userId, report) => {
      try {
        const response = await banUser(userId);
        notification.open({
          message: 'user account has been banned',
          duration: 3,
          icon: <CheckOutlined style={{ color: '#33FF49' }} />,
        });
        onDeleteReport(report);
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <div className="adminDashboard">
        <Row justify="left" type="flex">
          <Card title={title}>
            <Tabs size="small" defaultActiveKey="1" tabPosition="left">
              <TabPane key="1" tab={statisticsTitle}>
                <Col span={16}>
                  <Statistic prefix={<UserOutlined />} title="No. users" value={userCount} />
                  <br />
                </Col>
                <Col span={16}>
                  <Statistic prefix={<UserOutlined />} title="No. clients" value={clientCount} />
                  <br />
                </Col>
                <Col span={16}>
                  <Statistic
                    prefix={<UserOutlined />}
                    title="No. instructors"
                    value={instructorCount}
                  />
                  <br />
                </Col>
                <Col span={16}>
                  <Statistic prefix={<UserOutlined />} title="No. admins" value={adminCount} />
                  <br />
                </Col>
                <Col span={16}>
                  <Statistic
                    prefix={<BugOutlined />}
                    title="No. Bug reports"
                    value={bugReports.length}
                  />
                  <br />
                </Col>
                <Col span={16}>
                  <Statistic
                    prefix={<CheckCircleOutlined />}
                    title="No. Verify requests"
                    value={verifyRequests.length}
                  />
                  <br />
                </Col>
                <Col span={16}>
                  <Statistic
                    prefix={<DislikeOutlined />}
                    title="No. User reports"
                    value={userReports.length}
                  />
                  <br />
                </Col>
              </TabPane>
              <TabPane key="2" tab={verifiedTitle}>
                <List
                  header={
                    <h2>
                      <CheckCircleOutlined /> Verify users
                    </h2>
                  }
                  itemLayout="horizontal"
                  dataSource={verifyRequest}
                  renderItem={(report) => (
                    <List.Item>
                      <h3>
                        <b>Request #{verifyRequest.indexOf(report) + 1}</b>
                        <CheckOutlined
                          style={{ color: 'green', margin: '7px' }}
                          onClick={() => onAcceptVerify(report)}
                        />
                        <CloseOutlined
                          style={{ color: 'red', margin: '7px' }}
                          onClick={() => onDeleteVerify(report)}
                        />
                      </h3>
                      <h3>
                        <b>Author: </b>
                        {getRequestAuthor(report.author)
                          ? getRequestAuthor(report.author)
                          : 'User has been deleted'}
                      </h3>

                      <b>Content: </b>
                      {report.content}
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane key="3" tab={banTitle}>
                <BanUser users={users} />
                <DeleteUser users={users} />
              </TabPane>
              <TabPane key="4" tab={bugTitle}>
                <List
                  header={
                    <h2>
                      <BugOutlined /> Bug reports
                    </h2>
                  }
                  itemLayout="horizontal"
                  dataSource={allBugReports}
                  renderItem={(report) => (
                    <List.Item>
                      <h3>
                        <b>Report #{allBugReports.indexOf(report) + 1}</b>
                        <CloseOutlined
                          style={{ color: 'red', margin: '7px' }}
                          onClick={() => onDeleteBug(report)}
                        />
                      </h3>
                      <h3>
                        <b>Author: </b>
                        {getRequestAuthor(report.author)
                          ? getRequestAuthor(report.author)
                          : 'User has been deleted'}
                      </h3>

                      <b>Content: </b>
                      {report.content}
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane key="7" tab={userTitle}>
                <List
                  header={
                    <h2>
                      <DislikeOutlined /> User reports
                    </h2>
                  }
                  itemLayout="horizontal"
                  dataSource={allUserReports}
                  renderItem={(report) => (
                    <List.Item>
                      <h3>
                        <b>Report #{allUserReports.indexOf(report) + 1}</b>
                        <CloseOutlined
                          style={{ color: 'red', margin: '7px' }}
                          onClick={() => onDeleteReport(report)}
                        />
                      </h3>
                      <h3>
                        <b>Reported User: </b>
                        {getRequestAuthor(report.recipient)
                          ? getRequestAuthor(report.recipient)
                          : 'User has been deleted'}
                        <br />
                        <b>Reported by: </b>
                        {getRequestAuthor(report.author)
                          ? getRequestAuthor(report.author)
                          : 'User has been deleted'}
                      </h3>{' '}
                      <br />
                      <Button
                        type="danger"
                        style={{ marginRight: '2rem' }}
                        disabled
                        onClick={() => onBanUser(report.recipient, report)}
                      >
                        Ban reported user
                      </Button>
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane key="5" tab={contactTitle}>
                hi
              </TabPane>
            </Tabs>
          </Card>
        </Row>
      </div>
    );
  }
  return <AccessDenied />;
};

function isBugReport(request) {
  return request.type === 'bug';
}

function isVerifyRequest(request) {
  return request.type === 'verify';
}

function isContentReport(request) {
  return request.type === 'report';
}

function isMessage(request) {
  return request.type === 'message';
}

export async function getStaticProps() {
  const getUsersRes = await getUsers();
  const getUsersWithLimitRes = await getUsersWithLimit(getUsersRes.data.pagination.total);
  const getAdminsRes = await getAdmins();
  const getClientsRes = await getClients();
  const getInstructorsRes = await getInstructors();
  const getRequestsRes = await getRequests();
  return {
    props: {
      userCount: getUsersRes.data.pagination.total,
      users: getUsersWithLimitRes.data.data,
      adminCount: getAdminsRes.data.count,
      clientCount: getClientsRes.data.count,
      instructorCount: getInstructorsRes.data.count,
      bugReports: getRequestsRes.filter(isBugReport),
      verifyRequests: getRequestsRes.filter(isVerifyRequest),
      userReports: getRequestsRes.filter(isContentReport),
      Messages: getRequestsRes.filter(isMessage),
    },
    revalidate: 60 * 1,
  };
}

export default AdminDashboard;
