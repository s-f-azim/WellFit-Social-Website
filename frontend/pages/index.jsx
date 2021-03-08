import LandingPage from '../components/LandingPage';

// eslint-disable-next-line no-unused-vars
export default function Home({ token, userCookie }) {
  return (
    <>
      <LandingPage />
    </>
  );
}

export function getServerSideProps({ req, res }) {
  return {
    props: {
      token: req.cookies.token || '',
      userCookie: req.cookies.user || null,
    },
  };
}
