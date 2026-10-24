import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const tabs = [
  { to: '/admin', label: 'نظرة عامة', end: true },
  { to: '/admin/menu', label: 'إدارة المنيو' },
  { to: '/admin/orders', label: 'الطلبات' },
  { to: '/admin/reservations', label: 'الحجوزات' },
];

export const AdminLayout = () => {
  const { user } = useAuth();

  return (
    <section className="container-page py-8 sm:py-10">
      <div className="flex flex-col justify-between gap-5 border-b border-sand-200 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="section-kicker">لوحة التحكم</p>
          <h1 className="font-display text-3xl font-bold text-emerald-deep sm:text-4xl">
            أهلاً، {user?.name}
          </h1>
          <p className="mt-2 text-sm text-night/50">
            إدارة كاملة للمنيو والطلبات والحجوزات من مكان واحد.
          </p>
        </div>
        <div className="rounded-2xl border border-sand-200 bg-white px-4 py-3 text-xs">
          <p className="font-bold text-emerald-deep">صلاحية آدمن</p>
          <p className="mt-0.5 text-night/45">{user?.email}</p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <nav
          className="flex min-w-max items-center gap-1 rounded-2xl border border-sand-200 bg-white p-1.5"
          aria-label="أقسام لوحة التحكم"
        >
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                  isActive
                    ? 'bg-emerald-deep text-white shadow-sm'
                    : 'text-emerald-deep/65 hover:bg-sand-50 hover:text-emerald-deep'
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-7">
        <Outlet />
      </div>
    </section>
  );
};
