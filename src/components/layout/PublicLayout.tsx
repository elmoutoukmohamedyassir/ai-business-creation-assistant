import { Outlet } from 'react-router-dom';
import { Navbar } from '../ui/Navbar';
import { Footer } from '../ui/Footer';

export function PublicLayout() {
  return (
    <div className="min-h-screen mesh-bg text-slate-200">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
