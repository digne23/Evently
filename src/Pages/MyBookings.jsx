// src/pages/MyBookings.jsx
import React, { useEffect, useState } from "react";
import { fetchMyBookings, sendBookingTicket } from "../services/api";
import { useToast } from "../Components/Toast";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [sending, setSending] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const { push } = useToast();

  useEffect(() => {
    if (user?._id) {
      fetchMyBookings(user._id).then(setBookings);
    }
  }, [user]);

  const handleSendTicket = async (bookingId) => {
    setSending(prev => ({ ...prev, [bookingId]: true }));
    try {
      const res = await sendBookingTicket(bookingId);
      push(res?.message || 'Ticket sent successfully!', 'success');
    } catch (err) {
      push(err?.message || 'Failed to send ticket', 'error');
    } finally {
      setSending(prev => ({ ...prev, [bookingId]: false }));
    }
  };

  if (!user) return <p className="p-6 text-slate-900 dark:text-slate-100">Please log in to view your bookings.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100">My Bookings</h2>
      <ul className="space-y-4">
        {bookings.map((b) => (
          <li
            key={b._id}
            className="p-4 rounded-2xl bg-white dark:bg-slate-800 ring-1 ring-black/5 dark:ring-white/10 shadow hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 max-w-2xl mx-auto text-slate-900 dark:text-slate-100"
          >
            <div className="flex gap-4 items-center flex-wrap">
              {b.event.image && (
                <img src={b.event.image} alt={b.event.title} className="w-24 h-20 object-cover rounded-xl md:w-28" />
              )}
              <div className="flex-1 min-w-[200px]">
                <h3 className="text-lg font-semibold line-clamp-1">{b.event.title}</h3>
                <div className="text-sm text-slate-600 dark:text-slate-300 flex flex-wrap gap-x-4 gap-y-1">
                  <span>📅 {new Date(b.event.date).toLocaleDateString()}</span>
                  <span>📍 {b.event.location}</span>
                  <span>🎟️ {b.seatsBooked} seat(s)</span>
                </div>
              </div>
              <div>
                <button
                  onClick={() => handleSendTicket(b._id)}
                  disabled={sending[b._id]}
                  className="px-4 py-2 rounded-xl btn disabled:opacity-60"
                >
                  {sending[b._id] ? 'Sending…' : '📧 Send Ticket'}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
