// src/pages/Login.jsx
import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(form);
    if (res.token) {
      localStorage.setItem("token", res.token);
      const userPayload = {
        _id: res._id,
        name: res.name,
        email: res.email,
      };
      localStorage.setItem("user", JSON.stringify(userPayload));
      navigate("/");
    } else {
      alert(res.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 rounded-2xl bg-slate-900 text-slate-100 shadow-xl ring-1 ring-white/10">
      <h2 className="text-3xl font-bold mb-6">Welcome back</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 text-sm text-slate-300">Email</label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm text-slate-300">Password</label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <button className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition-colors text-white font-medium">
          Login
        </button>
      </form>
    </div>
  );
}
