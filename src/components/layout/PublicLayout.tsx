import { Outlet } from 'react-router-dom';
import { Navbar } from '../ui/Navbar';
import { Footer } from '../ui/Footer';

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col mesh-bg text-slate-200">
      {/* Skip to main content — WCAG 2.1 Level A */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:font-bold focus:text-sm"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" className="flex-1 pt-16" tabIndex={-1}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}