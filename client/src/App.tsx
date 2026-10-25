import { KitchenPage } from './pages/KitchenPage';
import { CashierPage } from './pages/CashierPage';
import { DeliveryPage } from './pages/DeliveryPage';
import { Route, Routes } from 'react-router-dom';
import { SiteLayout } from './components/layout/SiteLayout';
import { ScrollManager } from './components/layout/ScrollManager';
import {
  AdminRoute,
  DeliveryRoute,
  ProtectedRoute,
  RoleRouteGuard,
} from './components/layout/ProtectedRoute';
import { AdminLayout } from './components/admin/AdminLayout';
import { HomePage } from './pages/HomePage';
import { ReservationsPage } from './pages/ReservationsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminMenuPage } from './pages/admin/AdminMenuPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminReservationsPage } from './pages/admin/AdminReservationsPage';

const App = () => (
  <>
    <ScrollManager />
    <Routes>
      <Route element={<RoleRouteGuard />}>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="reservations" element={<ReservationsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="kitchen" element={<KitchenPage />} />
            <Route path="cashier" element={<CashierPage />} />
            <Route element={<DeliveryRoute />}>
              <Route path="delivery" element={<DeliveryPage />} />
            </Route>
          </Route>

          <Route path="admin" element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="menu" element={<AdminMenuPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
              <Route path="reservations" element={<AdminReservationsPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  </>
);

export default App;
