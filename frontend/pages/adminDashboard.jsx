import { Card, Row, Col, Statistic, Tabs, Button, Modal, List } from 'antd';
import {
  FundProjectionScreenOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  StopOutlined,
  BugOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { getUsers, getAdmins, getClients, getInstructors } from '../actions/user';
import { getRequests } from '../actions/request';
import { useState } from 'react';

const { TabPane } = Tabs;

const AdminDashboard = ({
  userCount,
  adminCount,
  clientCount,
  instructorCount,
  bugReports,
  verifyRequests,
  contentReports,
  Messages,
}) => {
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

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const showAlert = () => {
    console.log(bugReports);
    console.log(verifyRequests);
    console.log(contentReports);
    console.log(Messages);
    setIsAlertVisible(true);
  };

  const handleOk = () => {
    setIsAlertVisible(false);
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
                dataSource={bugReports}
                renderItem={(report) => (
                  <List.Item>
                    <h3>
                      <b>Report #{bugReports.indexOf(report) + 1}</b>
                    </h3>
                    <h3>
                      <b>Author: </b>
                      {report.author}
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
