import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function AdminLayout() {
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[240px_1fr] bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <aside className="bg-slate-900 text-white p-4 space-y-2 md:sticky md:top-0 md:h-screen">
        <h2 className="text-xl font-bold mb-4">Admin</h2>
        <Link className={`flex items-center gap-2 px-3 py-2 rounded ${isActive('/admin/users') ? 'bg-white/10' : 'hover:bg-white/10'}`} to="/admin/users">
          <span>👤</span>
          <span>Users</span>
        </Link>
        <Link className={`flex items-center gap-2 px-3 py-2 rounded ${isActive('/admin/events') ? 'bg-white/10' : 'hover:bg-white/10'}`} to="/admin/events">
          <span>🎫</span>
          <span>Events</span>
        </Link>
      </aside>
      <main className="p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}


