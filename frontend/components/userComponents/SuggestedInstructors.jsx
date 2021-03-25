/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Card, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Animate from 'rc-animate';
import { getSuggestedInstructors } from '../../actions/user';

const { Meta } = Card;

const Suggestions = () => {
  // List of suggested instructors
  const [showState, setShowState] = useState(false);
  const [list, setList] = useState({});
  let suggestionsDisplayed = list.length;
  // Fetches suggested instructors once after initial render
  useEffect(async () => {
    try {
      const response = await getSuggestedInstructors();
      if (response.data.success && response.data.data.length !== 0) {
        setList(response.data.data);
        setShowState(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleRemove = () => {
    // Handles removing suggestions box
    if (--suggestionsDisplayed === 0) setShowState(false);
  };

  const Suggestion = (props) => {
    // Suggested instructor element
    const [showState, setShowState] = useState(true);
    return (
      <Animate transitionName="fade">
        {showState ? (
          <Card
            type="inner"
            style={{ width: 300 }}
            actions={[
              <CloseOutlined
                key="close"
                onClick={() => {
                  setShowState(false); // remove individual suggestion
                  handleRemove();
                }}
              />,
            ]}
          >
            <Meta
              title={`${props.user.fName} ${props.user.lName}`}
              description={props.user.email}
            />
          </Card>
        ) : null}
      </Animate>
    );
  };

  return (
    <Animate transitionName="fade">
      {showState ? (
        <Card title="Suggested Instructors">
          <Space className="suggested-instructors" direction="horizontal" size="large">
            {list.map((item) => (
              <Suggestion key={item._id} user={item} />
            ))}
          </Space>
        </Card>
      ) : null}
    </Animate>
  );
};

export default Suggestions;
