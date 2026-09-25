import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Background3D from './Background3D';
import Navbar from './Navbar';
import Footer from './Footer';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <ScrollToTop />
      <Background3D />
      <Navbar />
      <main className="flex-1 pt-28 sm:pt-32 md:pt-36 relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
