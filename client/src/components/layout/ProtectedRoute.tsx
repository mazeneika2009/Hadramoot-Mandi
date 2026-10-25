import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PageLoader } from '../ui/Feedback';

const normalizePath = (path: string): string => path.replace(/\/+$/, '') || '/';

/**
 * Global guard that keeps kitchen/cashier staff inside their own workspace.
 * It sits above the layout routes, so an unauthorized page never mounts or
 * fires a data fetch before the redirect.
 */
export const RoleRouteGuard = () => {
  const { loading, isAuthenticated, isApproved, isKitchen, isCashier } =
    useAuth();
  const location = useLocation();

  if (loading) return <PageLoader label="جارٍ التحقق من حسابك..." />;

  // Only enforce the workspace lock for approved staff accounts. Unapproved
  // accounts are handled by ProtectedRoute (pending approval screen).
  if (isAuthenticated && isApproved) {
    const path = normalizePath(location.pathname);

    if (isKitchen && path !== '/kitchen') {
      return <Navigate to="/kitchen" replace />;
    }
    if (isCashier && path !== '/cashier') {
      return <Navigate to="/cashier" replace />;
    }
  }

  return <Outlet />;
};

export const ProtectedRoute = () => {
  const { loading, isAuthenticated, isAdmin, isKitchen, isCashier, isApproved } =
    useAuth();
  const location = useLocation();

  if (loading) return <PageLoader label="جارٍ التحقق من حسابك..." />;

  if (!isAuthenticated) {
    const redirect = encodeURIComponent(
      `${location.pathname}${location.search}`,
    );
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }

  // Staff accounts require administrator approval.
  if ((isKitchen || isCashier) && !isApproved) {
    return <Navigate to="/login?pending=1" replace />;
  }

  // Role-based dashboards: staff only see their own workspace.
  if (!isAdmin && isKitchen && normalizePath(location.pathname) !== '/kitchen') {
    return <Navigate to="/kitchen" replace />;
  }
  if (!isAdmin && isCashier && normalizePath(location.pathname) !== '/cashier') {
    return <Navigate to="/cashier" replace />;
  }

  return <Outlet />;
};

export const AdminRoute = () => {
  const { loading, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) return <PageLoader label="جارٍ التحقق من صلاحياتك..." />;

  if (!isAuthenticated) {
    const redirect = encodeURIComponent(
      `${location.pathname}${location.search}`,
    );
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
