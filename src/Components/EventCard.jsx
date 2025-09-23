// src/components/EventCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <div className="group rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 bg-white dark:bg-slate-800 overflow-hidden">
      {event.image && (
        <Link to={`/events/${event._id}`} className="block overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-72 md:h-80 object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
      )}
      <div className="p-4">
        <div className="mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <p>📅 {new Date(event.date).toLocaleDateString()}</p>
          <p>📍 {event.location}</p>
        </div>
        <div className="mt-4">
          <Link to={`/events/${event._id}`} className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white">
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}
