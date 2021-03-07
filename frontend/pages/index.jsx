/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LandingPage from '../components/LandingPage';
import { useAuth } from '../services/auth';

// eslint-disable-next-line no-unused-vars
export default function Home() {
  const router = useRouter();

  const { user } = useAuth();
  useEffect(() => {
    if (user && user.role === 'admin') router.push('/adminDashboard');
  });
  return (
    <>
      <LandingPage />
    </>
  );
}
