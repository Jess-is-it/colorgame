// components/AuthGuard.tsx
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { Spinner } from 'src/components/ui/spinner';
import { AuthContext } from 'src/context/AuthContext';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isInitialized, isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  if (!isInitialized) {
    <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/auth1/login" replace state={{ from: location }} />;
  }

  return children;
};

export default AuthGuard;
