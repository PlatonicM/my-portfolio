import { Outlet } from 'react-router-dom';
import Background3D from './Background3D';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Background3D />
      <Navbar />
      <main className="flex-1 pt-24 relative z-10"><Outlet /></main>
      <Footer />
    </div>
  );
}
