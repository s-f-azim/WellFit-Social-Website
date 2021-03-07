/* eslint-disable no-nested-ternary */
import { useRouter } from 'next/router';
import LandingPage from '../components/LandingPage';
import { useAuth } from '../services/auth';

// eslint-disable-next-line no-unused-vars
export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  return (
    <>
      {user ? (
        user.role === 'admin' ? (
          router.push('/adminDashboard', null, { shallow: true })
        ) : (
          <LandingPage />
        )
      ) : (
        <LandingPage />
      )}
    </>
  );
}
