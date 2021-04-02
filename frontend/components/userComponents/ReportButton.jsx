import { Button } from 'antd';
import { createReport } from '../../actions/request';

const ReportButton = ({ RecipientID }) => {
  const reportUser = async () => {
    try {
      await createReport('report', 'Report', RecipientID);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button aria-label="report" type="danger" onClick={reportUser}>
      Report User!
    </Button>
  );
};

export default ReportButton;
