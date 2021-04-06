import { NextSeo } from 'next-seo';
import NotFound from '../components/generalComponents/404';

const NotFoundPage = () => (
  <>
    <NextSeo
      title="404 Page"
      description="A 404 page indicating that the entered url does not lead to an existing page."
    />
    <NotFound />
  </>
);
export default NotFoundPage;
