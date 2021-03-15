import { Button } from 'antd';
import { createReport } from '../actions/request';

const ReportButton = ({ RecipientID }) => {
  const reportUser = async () => {
    await createReport('report', 'Report', RecipientID);
  };

  return (
    <Button type="danger" onClick={reportUser}>
      Report User!
    </Button>
  );
};

export default ReportButton;
