import api from '../../../services/api';
import Index from '../..';

export default Index;

// check if the page was given and prerender the page using the index template
export async function getStaticProps({ params }) {
  const currentPage = params ? params.page : undefined;
  const currentPageNumber = currentPage || 1;
  const response = await api.get(`/courses?page=${currentPageNumber}`);
  return { props: { courses: response.data.data }, revalidate: 60 * 2 };
}
// create all the pages possible for courses and make it static to improve performance significantly
// each page will be at url/courses/pages/numberOfPage
export const getStaticPaths = async () => {
  const { data } = await api.get(`/courses?limit=${Number.MAX_SAFE_INTEGER}`);
  const { total } = data.pagination;
  const numberOfPages = Math.ceil(total / 12);
  const paths = Array(numberOfPages)
    .fill('')
    .map((_, index) => ({ params: { page: (index + 1).toString() } }));
  return { fallback: false, paths };
};
