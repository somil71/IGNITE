import { Navigate, Outlet } from 'react-router-dom';
import { RedirectToSignIn } from '@clerk/react';
import { useAuth } from '../../hooks/useAuth';

export default function AdminRoute() {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <RedirectToSignIn />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return <Outlet />;
}
