import { Card, Row, Col, Statistic, Tabs, Button, Modal, List, notification } from 'antd';
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
} from '@ant-design/icons';
import { useState } from 'react';
import { useSession, getSession } from 'next-auth/client';
import { getUsers, getAdmins, getClients, getInstructors } from '../actions/user';
import { deleteRequest, getRequests } from '../actions/request';

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

    const contactTitle = (
      <p>
        <MailOutlined /> contact users
      </p>
    );

    const getRequestAuthor = (id) => users.filter((user) => user._id === id);

    const [reports, setReports] = useState(bugReports);

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
                        {getRequestAuthor(report.author).email}
                      </h3>

                      <b>Content: </b>
                      {report.content}
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
  return <p>Access Denied</p>;
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
  const getAdminsRes = await getAdmins();
  const getClientsRes = await getClients();
  const getInstructorsRes = await getInstructors();
  const getRequestsRes = await getRequests();
  return {
    props: {
      userCount: getUsersRes.data.pagination.total,
      users: getUsersRes.data.data,
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
