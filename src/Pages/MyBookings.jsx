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
      if (res?.message) push(res.message, 'success');
      else push('Ticket sent successfully!', 'success');
    } catch (err) {
      push('Failed to send ticket', 'error');
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
            className="p-4 rounded-xl bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-slate-800 dark:to-slate-700 shadow-lg hover:shadow-2xl transition-all duration-200 hover:-translate-y-0.5 max-w-md mx-auto text-slate-900 dark:text-slate-100"
          >
            <h3 className="text-xl font-bold">{b.event.title}</h3>
            <p>📅 {new Date(b.event.date).toLocaleDateString()}</p>
            <p>📍 {b.event.location}</p>
            <p>🎟️ Seats booked: {b.seatsBooked}</p>
            <button
              onClick={() => handleSendTicket(b._id)}
              disabled={sending[b._id]}
              className="mt-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white rounded-lg transition-colors"
            >
              {sending[b._id] ? 'Sending...' : '📧 Send Ticket'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
