// src/components/BookingForm.jsx
import React from "react";
import { bookEvent } from "../services/api";
import { useToast } from "../Components/Toast";
import { useNavigate } from "react-router-dom";

export default function BookingForm({ event }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const { push } = useToast();

  const handleBooking = async () => {
    if (!user || !token) {
      alert("You must be logged in to book an event");
      navigate("/login");
      return;
    }

    const res = await bookEvent(event._id, 1);
    if (res._id) {
      push("Booking successful!", 'success');
      navigate('/my-bookings');
    } else {
      push(res.message || "Booking failed", 'error');
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
        className="inline-flex items-center justify-center px-8 py-3 rounded-xl btn btn-emerald"
      >
        Book Event
      </button>
    </div>
  );
}
