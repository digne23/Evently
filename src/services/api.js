// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function fetchEvents() {
  const res = await fetch(`${API_URL}/events`);
  return res.json();
}

export async function fetchEventById(id) {
  const res = await fetch(`${API_URL}/events/${id}`);
  return res.json();
}

export async function createEvent(data) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateEvent(id, patch) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/events/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    body: JSON.stringify(patch),
  });
  return res.json();
}

export async function deleteEvent(id) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/events/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
  return res.json();
}

export async function registerUser(data) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function loginUser(data) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function bookEvent(eventId, seatsBooked = 1) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    body: JSON.stringify({ eventId, seatsBooked }),
  });
  return res.json();
}

export async function fetchMyBookings(userId) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/bookings/mybookings`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    }
  });
  return res.json();
}

export async function sendContact(data) {
  const res = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function sendBookingTicket(bookingId) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/bookings/${bookingId}/send-ticket`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
  return res.json();
}

export async function fetchUsers() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
  return res.json();
}
