import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from 'hooks/useStores';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = observer(({ children }: ProtectedRouteProps) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
});

export default ProtectedRoute;
