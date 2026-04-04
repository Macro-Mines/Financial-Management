import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => window.scrollTo(0, 0), [pathname]);

  return (
    <>
      <div className="fixed inset-0 grainy-overlay z-0" />
      <div className="fixed inset-0 asymmetric-gradient z-0" />

      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />
        <main className="grow flex flex-col relative">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
