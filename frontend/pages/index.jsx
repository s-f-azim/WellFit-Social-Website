import LandingPage from '../components/LandingPage';
import { useSession } from 'next-auth/client';

// eslint-disable-next-line no-unused-vars
export default function Home() {
  const [session, loading] = useSession();
  console.log('hmm', session);
  return (
    <>
      <LandingPage />
    </>
  );
}
