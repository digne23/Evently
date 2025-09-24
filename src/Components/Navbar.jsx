// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  let user = null;
  try {
    const raw = localStorage.getItem("user");
    user = raw ? JSON.parse(raw) : null;
  } catch (_) {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const initial = user?.name ? user.name.trim().charAt(0).toUpperCase() : (user?.email ? user.email.trim().charAt(0).toUpperCase() : 'U');
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="backdrop-blur bg-slate-900/80 text-white sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <svg
            className="h-10 w-10 rounded-xl shadow ring-1 ring-white/10 transition-transform duration-200 group-hover:-translate-y-0.5"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="brand-grad" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22d3ee" />
                <stop offset="1" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <rect x="4" y="4" width="48" height="48" rx="12" fill="url(#brand-grad)" />
            {/* star/icon */}
            <path d="M28 15l3.5 7.1 7.8 1.1-5.6 5.5 1.3 7.8L28 32.8 21 36.5l1.3-7.8-5.6-5.5 7.8-1.1L28 15z" fill="white" fillOpacity="0.95" />
          </svg>
          <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-emerald-200 group-hover:from-white group-hover:to-white">
            Evently
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-3">
          <Link className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors" to="/">Home</Link>
          <Link className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors" to="/">View events</Link>
          {user && (
            <Link className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors" to="/my-bookings">My Bookings</Link>
          )}
          <Link className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors" to="/contact">Contact</Link>
          {user?.email === 'sugiradigne@gmail.com' && (
            <Link className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors" to="/admin/users">Admin</Link>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button className="md:hidden px-3 py-2 rounded-lg border border-white/10 hover:bg-white/10" onClick={()=> setMobileOpen(!mobileOpen)}>
            ☰
          </button>
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-900 font-medium hover:bg-emerald-400 active:bg-emerald-600 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-colors"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <button onClick={()=> setMenuOpen(!menuOpen)} className="w-9 h-9 rounded-full bg-emerald-500 text-slate-900 font-bold flex items-center justify-center ring-2 ring-emerald-300/50">
                {initial}
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-xl ring-1 ring-black/10">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700">Profile</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700">Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link onClick={()=>setMobileOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-colors" to="/">Home</Link>
          <Link onClick={()=>setMobileOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-colors" to="/">View events</Link>
          {user && (
            <Link onClick={()=>setMobileOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-colors" to="/my-bookings">My Bookings</Link>
          )}
          <Link onClick={()=>setMobileOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-colors" to="/contact">Contact</Link>
          {user?.email === 'sugiradigne@gmail.com' && (
            <Link onClick={()=>setMobileOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-colors" to="/admin/users">Admin</Link>
          )}
        </div>
      )}
    </nav>
  );
}
