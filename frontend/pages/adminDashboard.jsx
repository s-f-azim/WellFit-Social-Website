import { Card, Row, Col, Statistic, Button, Tabs, List, notification } from 'antd';
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
import { deleteRequest, getRequests } from '../actions/request';
import AccessDenied from '../components/AccessDenied';

const { TabPane } = Tabs;

const AdminDashboard = ({
  userCount,
  users,
  adminCount,
  clientCount,
  instructorCount,
  bugReports,
  verifyRequests,
  contentReports,
  Messages,
}) => {
  const [session, loading] = useSession();
  const [reports, setReports] = useState(bugReports);

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
        <CheckCircleOutlined /> Verify users
      </p>
    );

    const banTitle = (
      <p>
        <StopOutlined /> Ban users
      </p>
    );

    const bugTitle = (
      <p>
        <BugOutlined /> Bug reports
      </p>
    );

    const userTitle = (
      <p>
        <DislikeOutlined /> User reports
      </p>
    );

    const contactTitle = (
      <p>
        <MailOutlined /> contact users
      </p>
    );

    const getRequestAuthor = (id) => users.find((user) => user._id === id);

    const onDeleteBug = async (report) => {
      await deleteRequest(report._id);
      reports.splice(reports.indexOf(report), 1);
      setReports([...reports]);
      notification.open({
        message: 'Deleted report',
        duration: 2,
        icon: <CheckOutlined style={{ color: '#70FF00' }} />,
      });
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
              </TabPane>
              <TabPane key="2" tab={verifiedTitle}>
                hi
              </TabPane>
              <TabPane key="3" tab={banTitle}>
                hi
              </TabPane>
              <TabPane key="4" tab={bugTitle}>
                <List
                  header={
                    <h2>
                      <BugOutlined /> Bug reports
                    </h2>
                  }
                  itemLayout="horizontal"
                  dataSource={reports}
                  renderItem={(report) => (
                    <List.Item>
                      <h3>
                        <b>Report #{reports.indexOf(report) + 1}</b>
                        <CloseOutlined
                          style={{ color: 'red', margin: '7px' }}
                          onClick={() => onDeleteBug(report)}
                        />
                      </h3>
                      <h3>
                        <b>Author: </b>
                        {getRequestAuthor(report.author)
                          ? getRequestAuthor(report.author).email
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
                  dataSource={contentReports}
                  renderItem={(report) => (
                    <List.Item>
                      <h3>
                        <b>Report #{contentReports.indexOf(report) + 1}</b>
                        <CloseOutlined
                          style={{ color: 'red', margin: '7px' }}
                          onClick={() => onDeleteBug(report)}
                        />
                      </h3>
                      <h3>
                        <b>Reported User: </b>
                        {getRequestAuthor(report.author)
                          ? getRequestAuthor(report.author).email
                          : 'User has been deleted'}
                        <br />
                        <b>Reported by: </b>
                        {getRequestAuthor(report.author)
                          ? getRequestAuthor(report.author).email
                          : 'User has been deleted'}
                      </h3>

                      <b>Content: </b>
                      {report.content}
                      <br />
                      <Button type="danger" style={{ marginRight: '2rem' }}>
                        Ban User
                      </Button>
                      <Button type="danger" size="small">
                        Ban Reportee
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
      adminCount: getAdminsRes.data.pagination.adminTotal,
      clientCount: getClientsRes.data.pagination.clientTotal,
      instructorCount: getInstructorsRes.data.pagination.instructorTotal,
      bugReports: getRequestsRes.filter(isBugReport),
      verifyRequests: getRequestsRes.filter(isVerifyRequest),
      contentReports: getRequestsRes.filter(isContentReport),
      Messages: getRequestsRes.filter(isMessage),
    },
  };
}

export default AdminDashboard;
