import { Button } from 'antd';
import { createReport } from '../actions/request';

const ReportButton = ({ RecipientID }) => {
  const reportUser = async () => {
    console.log(`tutut : ${RecipientID}`);
    await createReport('report', 'Report', RecipientID);
  };

  return (
    <Button type="danger" onClick={reportUser}>
      Report User!
    </Button>
  );
};

export default ReportButton;
