import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RedirectToSignIn, useUser } from '@clerk/react';
import { useAuth } from '../../hooks/useAuth';
import LoadingScreen from '../ui/LoadingScreen';

export default function ProtectedRoute() {
  const { isSignedIn, isLoaded } = useUser();
  const { isProfileComplete } = useAuth();
  const location = useLocation();

  if (!isLoaded) return <LoadingScreen />;
  if (!isSignedIn) return <RedirectToSignIn />;

  // If profile incomplete AND not already on /complete-profile
  if (!isProfileComplete && location.pathname !== '/complete-profile') {
    return <Navigate to="/complete-profile" replace />;
  }

  return <Outlet />;
}
