import { useAuth } from '@/context/AuthContext';
import { redirect } from 'next/navigation';

const ProtectedRoute = ({ children }: any) => {
  const { user, tenantSlug } = useAuth();

  if (!user) {
    redirect(`/${tenantSlug}/menu`);
  }
  return children;
};

export default ProtectedRoute;