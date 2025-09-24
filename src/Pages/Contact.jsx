// src/pages/Contact.jsx
import React, { useState } from 'react';
import { sendContact } from '../services/api';
import { useToast } from "../Components/Toast";

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const { push } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const res = await sendContact(form);
    setSending(false);
    if (res?.message) {
      push('Message sent', 'success');
      setForm({ name: '', email: '', message: '' });
    } else {
      push(res?.message || 'Failed to send message', 'error');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-16 p-8 rounded-2xl bg-slate-900 text-slate-100 shadow-xl ring-1 ring-white/10">
      <h2 className="text-3xl font-bold mb-6">Contact us</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your message" className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 h-32" />
        <button disabled={sending} className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-medium">
          {sending ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}



