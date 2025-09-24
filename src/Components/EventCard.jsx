// src/components/EventCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <div className="group rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 bg-white dark:bg-slate-800 overflow-hidden hover:bg-slate-50 dark:hover:bg-slate-700/70">
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
        <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100 line-clamp-1">{event.title}</h3>
        <div className="mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <p>📅 {new Date(event.date).toLocaleDateString()}</p>
          <p>📍 {event.location}</p>
        </div>
        <div className="mt-4">
          <Link
            to={`/events/${event._id}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl btn btn-white-hover"
          >
            <span>View details</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
