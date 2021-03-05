import LandingPage from '../components/LandingPage';
import AdminDashboard from '../components/AdminDashboard';
import { useAuth } from '../services/auth';

const user = { useAuth };
// eslint-disable-next-line no-unused-vars
export default function Home() {
  return (
    // eslint-disable-next-line no-nested-ternary
    <>{user ? user.role === 'admin' ? <AdminDashboard /> : <LandingPage /> : <LandingPage />}</>
  );
}
