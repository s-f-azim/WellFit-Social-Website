/* eslint-disable no-nested-ternary */
import Router from 'next/router';
import { useSession } from 'next-auth/client';
import LandingPage from '../components/generalComponents/LandingPage';

// eslint-disable-next-line no-unused-vars
export default function Home() {
  const [session, loading] = useSession();
  if (session && session.user.role === 'admin') {
    Router.push('/adminDashboard');
  } else {
    return <LandingPage />;
  }
  return <></>;
}
