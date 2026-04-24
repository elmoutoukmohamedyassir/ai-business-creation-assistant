import { Outlet } from 'react-router-dom';
import { Sidebar } from '../ui/Sidebar';

export function DashboardLayout() {
  return (
    <div className="flex h-screen w-full mesh-bg text-slate-200 overflow-hidden">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto">
        <div className="max-w-6xl mx-auto p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
