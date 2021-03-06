/* eslint-disable no-nested-ternary */
import LandingPage from '../components/LandingPage';
import AdminDashboard from '../components/AdminDashboard';
import { useAuth } from '../services/auth';
// eslint-disable-next-line no-unused-vars
export default function Home() {
  const user = useAuth();
  return (
    <>
      {user && user.user ? (
        user.user.role === 'admin' ? (
          <AdminDashboard />
        ) : (
          <LandingPage />
        )
      ) : (
        <LandingPage />
      )}
    </>
  );
}
