import { Result } from "antd";
const NotFoundPage = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry,the page you visited does not exits."
    />
  );
};
export default NotFoundPage;
