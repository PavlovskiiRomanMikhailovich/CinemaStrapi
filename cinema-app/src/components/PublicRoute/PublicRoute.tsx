import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from 'hooks/useStores';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = observer(({ children }: PublicRouteProps) => {
  const authStore = useAuthStore();

  if (authStore.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
});

export default PublicRoute;