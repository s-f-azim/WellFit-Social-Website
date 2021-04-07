import { NextSeo } from 'next-seo';
import LandingPage from '../components/generalComponents/LandingPage/LandingPage';

export default function Home() {
  return (
    <>
      <NextSeo
        title="Landing Page"
        description="The landing page of the website, displaying information as to how the site can be used, and its services."
      />
      <LandingPage />
    </>
  );
}
