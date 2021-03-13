/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LandingPage from '../components/LandingPage';
import adminDashboard from './adminDashboard';
import { useSession } from 'next-auth/client';

// eslint-disable-next-line no-unused-vars
export default function Home() {
  const [session, loading] = useSession();
  return <>{session && session.user.role === 'admin' ? <adminDashboard /> : <LandingPage />}</>;
}
