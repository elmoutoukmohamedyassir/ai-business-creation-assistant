import { Outlet } from 'react-router-dom';
import { Sidebar } from '../ui/Sidebar';

export function DashboardLayout() {
  return (
    <div className="flex h-screen w-full mesh-bg text-slate-200 overflow-hidden">
      <Sidebar />
      <main id="main-content" className="flex-1 h-screen overflow-y-auto min-w-0">
        {/* skip-to-main anchor target */}
        <div className="max-w-6xl mx-auto p-6 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}