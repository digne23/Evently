// src/pages/EventDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEventById } from "../services/api";
import BookingForm from "../Components/BookingForm";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEventById(id).then(setEvent);
  }, [id]);

  if (!event) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 text-slate-900 dark:text-slate-100">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          {event.image && (
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-[28rem] object-cover rounded-2xl shadow"
            />
          )}
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{event.title}</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{event.description}</p>
          <div className="space-y-1 text-gray-800 dark:text-gray-300">
            <p>📅 {new Date(event.date).toLocaleDateString()}</p>
            <p>📍 {event.location}</p>
            <p>Seats: {event.availableSeats}</p>
          </div>
          <div className="mt-6">
            <BookingForm event={event} />
          </div>
        </div>
      </div>
    </div>
  );
}
