// src/components/BookingForm.jsx
import React from "react";
import { bookEvent } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function BookingForm({ event }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const handleBooking = async () => {
    if (!user || !token) {
      alert("You must be logged in to book an event");
      navigate("/login");
      return;
    }

    const res = await bookEvent(event._id, 1);
    if (res._id) {
      alert("Booking successful!");
    } else {
      alert(res.message || "Booking failed");
    }
  };

  return (
    <div className="mt-6 mx-auto max-w-lg flex flex-col items-center text-center">
      {event?.image && (
        <img
          src={event.image}
          alt={event.title}
          className="mb-4 rounded object-cover w-full h-64"
        />
      )}
      <button
        onClick={handleBooking}
        className="inline-flex items-center justify-center px-8 py-3 rounded-xl text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-xl ring-1 ring-white/10"
      >
        Book Event
      </button>
    </div>
  );
}
