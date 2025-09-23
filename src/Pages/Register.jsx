// src/pages/Register.jsx
import React, { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", phoneNumber: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUser(form);
    if (res._id) {
      alert("Registration successful!");
      navigate("/login");
    } else {
      alert(res.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 rounded-2xl bg-slate-900 text-slate-100 shadow-xl ring-1 ring-white/10">
      <h2 className="text-3xl font-bold mb-6">Create your account</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <input
          name="phoneNumber"
          placeholder="Phone number"
          value={form.phoneNumber}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <input
          name="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition-colors text-white font-medium">
          Register
        </button>
      </form>
    </div>
  );
}
