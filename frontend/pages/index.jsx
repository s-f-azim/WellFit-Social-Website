/* eslint-disable no-nested-ternary */
import LandingPage from '../components/LandingPage';
import AdminDashboard from '../components/AdminDashboard';
import { useAuth } from '../services/auth';
import api from '../services/api';

// eslint-disable-next-line no-unused-vars
export default function Home() {
  const { user } = useAuth();
  return (
    <>{user ? user.role === 'admin' ? <AdminDashboard /> : <LandingPage /> : <LandingPage />}</>
  );
}
