// src/pages/Home.jsx
import  React , { useEffect, useState } from "react";
import { fetchEvents } from "../services/api";
import EventCard from "../Components/EventCard";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchEvents().then(setEvents);
    try {
      const raw = localStorage.getItem('user');
      setUser(raw ? JSON.parse(raw) : null);
    } catch (_) {
      setUser(null);
    }
  }, []);

  return (
    <div className="p-6">
      {/* Welcome banner */}
      <div className="mb-8 relative rounded-3xl overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800" />
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_15%_25%,white,transparent_35%),radial-gradient(circle_at_85%_65%,white,transparent_40%)]" />
        <div className="relative px-6 py-8 md:px-10 md:py-10">
          <div className="text-xs md:text-sm uppercase tracking-widest text-white/80">Welcome{user?.name ? `, ${user.name}` : ''}</div>
          <h1 className="mt-1 text-2xl md:text-4xl font-extrabold leading-snug drop-shadow">
            Discover events. Book in seconds. Get instant tickets.
          </h1>
          <p className="mt-2 md:mt-3 text-white/85 md:text-base max-w-2xl">
            From Kigali to the world—concerts, sports, festivals and conferences. Join in and
            receive your tickets straight to your email.
          </p>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">Upcoming Events</h2>
      <div className="grid md:grid-cols-4 gap-6 items-start">
        <div className="md:col-span-3">
          {(() => {
            const isRwanda = (loc = '') => /\b(rwanda|kigali|rw)\b/i.test(loc);
            const rwanda = events.filter(e => isRwanda(e.location));
            const global = events.filter(e => !isRwanda(e.location));
            return (
              <>
                {rwanda.length > 0 && (
                  <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Rwanda</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {rwanda.map((event) => (
                        <EventCard key={event._id} event={event} />
                      ))}
                    </div>
                  </section>
                )}
                {global.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-semibold mb-4">Global</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {global.map((event) => (
                        <EventCard key={event._id} event={event} />
                      ))}
                    </div>
                  </section>
                )}
              </>
            );
          })()}
        </div>
        <aside className="md:col-span-1 sticky top-4 self-start space-y-4">
          <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/10 bg-gradient-to-br from-emerald-600 to-cyan-600 text-white">
            <div className="p-5">
              <div className="text-xs uppercase tracking-wide opacity-80">Rwanda Focus</div>
              <h3 className="text-lg font-bold mt-1">Book Kigali’s best</h3>
              <p className="mt-2 text-white/90 text-sm">Instant tickets for concerts, sports and conferences across Rwanda.</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/10 bg-gradient-to-br from-fuchsia-600 to-rose-600 text-white">
            <div className="p-5">
              <div className="text-xs uppercase tracking-wide opacity-80">Global Picks</div>
              <h3 className="text-lg font-bold mt-1">Discover worldwide</h3>
              <p className="mt-2 text-white/90 text-sm">Handpicked events around the world. Safe checkout, email tickets.</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Full-width promotional banner */}
      <div className="-mx-6 mt-8">
        <div className="relative w-full h-72 md:h-96 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.15),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(255,255,255,.12),transparent_45%)]" />
          <div className="relative h-full flex items-center justify-center text-center px-6">
            <div className="max-w-3xl text-white">
              <div className="text-xs uppercase tracking-widest opacity-90">Evently</div>
              <h2 className="mt-2 text-3xl md:text-5xl font-extrabold leading-tight">Experience the best events in Rwanda and worldwide</h2>
              <p className="mt-3 md:mt-4 text-white/90 md:text-lg">Browse, book, and get instant email tickets. No queues. No hassle.</p>
              <a href="#" className="inline-flex mt-5 px-6 py-3 rounded-xl bg-white text-rose-700 font-semibold hover:bg-white/90">Start exploring</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
