import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { brand } from '@shared/config';
import { useAuth } from '../../context/AuthContext';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { CartDrawer } from './CartDrawer';
import { ToastViewport } from '../ui/ToastViewport';

export const SiteLayout = () => {
  const { isKitchen, isCashier } = useAuth();
  const isStaff = isKitchen || isCashier;

  useEffect(() => {
    document.title = `${brand.name} | ${brand.tagline}`;
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      {!isStaff ? <Footer /> : null}
      {!isStaff ? <CartDrawer /> : null}
      <ToastViewport />
      {!isStaff ? (
        <a
          href={brand.social.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-5 left-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-sm font-bold text-white shadow-xl shadow-emerald-900/20 transition hover:scale-105"
          aria-label="تواصل معنا على واتساب"
        >
          و
        </a>
      ) : null}
    </div>
  );
};
