import React, { useEffect, useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      setUser(raw ? JSON.parse(raw) : null);
    } catch (_) { setUser(null); }
  }, []);

  if (!user) return <div className="p-6">Please log in to view your profile.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="rounded-2xl bg-slate-900 text-slate-100 p-6 ring-1 ring-white/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-900 font-bold flex items-center justify-center">
            {(user.name || user.email || 'U').trim().charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-xl font-semibold">{user.name || 'Unnamed User'}</div>
            <div className="text-slate-300">{user.email}</div>
          </div>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-slate-800 p-4">
            <div className="text-sm text-slate-400">User ID</div>
            <div className="font-mono text-xs break-all">{user._id}</div>
          </div>
          {user.phoneNumber && (
            <div className="rounded-xl bg-slate-800 p-4">
              <div className="text-sm text-slate-400">Phone</div>
              <div>{user.phoneNumber}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



