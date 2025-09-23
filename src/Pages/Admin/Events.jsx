import React, { useEffect, useState } from 'react';
import { fetchEvents as apiFetchEvents, createEvent as apiCreateEvent, updateEvent as apiUpdateEvent, deleteEvent as apiDeleteEvent } from '../../services/api';

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', date: '', location: '', availableSeats: 0, image: '' });
  const [openEditor, setOpenEditor] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const token = localStorage.getItem('token');

  const load = async () => {
    const data = await apiFetchEvents();
    setEvents(Array.isArray(data) ? data : []);
  };

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    const res = await apiCreateEvent(form);
    if (res && res._id) { setForm({ title: '', description: '', date: '', location: '', availableSeats: 0, image: '' }); load(); }
    else alert(res?.message || 'Failed to create event');
  };

  const update = async (id, patch) => {
    const res = await apiUpdateEvent(id, patch);
    if (!res?.message) load(); else load();
  };

  const removeEvent = async (id) => {
    const res = await apiDeleteEvent(id);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <form onSubmit={save} className="grid gap-3 max-w-xl mb-6">
        <input className="px-3 py-2 rounded border" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
        <textarea className="px-3 py-2 rounded border" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        <input className="px-3 py-2 rounded border" type="date" value={form.date?.slice(0,10)} onChange={e=>setForm({...form,date:e.target.value})} />
        <input className="px-3 py-2 rounded border" placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} />
        <input className="px-3 py-2 rounded border" type="number" placeholder="Available Seats" value={form.availableSeats} onChange={e=>setForm({...form,availableSeats:Number(e.target.value)})} />
        <input className="px-3 py-2 rounded border" placeholder="Image URL" value={form.image} onChange={e=>setForm({...form,image:e.target.value})} />
        <button className="px-4 py-2 bg-emerald-600 text-white rounded">Add Event</button>
      </form>

      <div className="grid gap-4">
        {events.map(ev => (
          <div key={ev._id} className="p-4 rounded border relative">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{ev.title}</div>
                <div className="text-sm text-slate-600">{new Date(ev.date).toLocaleDateString()} • {ev.location} • seats {ev.availableSeats}</div>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <button
                    className="px-3 py-1 rounded bg-blue-600 text-white"
                    onClick={()=> {
                      setOpenEditor(openEditor === ev._id ? null : ev._id);
                      setEditForm({
                        title: ev.title || '',
                        description: ev.description || '',
                        date: ev.date ? new Date(ev.date).toISOString().slice(0,10) : '',
                        location: ev.location || '',
                        availableSeats: ev.availableSeats ?? 0,
                        image: ev.image || '',
                      });
                    }}
                  >
                    Edit
                  </button>
                </div>
                <button className="px-3 py-1 rounded bg-rose-600 text-white" onClick={()=>removeEvent(ev._id)}>Delete</button>
              </div>
            </div>
            {openEditor === ev._id && editForm && (
              <div className="fixed inset-0 z-20">
                <div className="absolute inset-0 bg-black/60" onClick={()=> setOpenEditor(null)} />
                <div className="relative mx-auto mt-20 max-w-3xl w-[90%] rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl ring-1 ring-black/10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Edit event</h3>
                    <button className="px-3 py-1 rounded bg-slate-200 dark:bg-slate-700" onClick={()=> setOpenEditor(null)}>Close</button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="block text-sm text-slate-500">Title</label>
                      <input className="w-full px-3 py-2 rounded border dark:border-slate-700 bg-white dark:bg-slate-900" placeholder="Title" value={editForm.title} onChange={e=>setEditForm({...editForm,title:e.target.value})} />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm text-slate-500">Date</label>
                      <input className="w-full px-3 py-2 rounded border dark:border-slate-700 bg-white dark:bg-slate-900" type="date" value={editForm.date} onChange={e=>setEditForm({...editForm,date:e.target.value})} />
                    </div>
                    <div className="md:col-span-2 space-y-3">
                      <label className="block text-sm text-slate-500">Description</label>
                      <textarea className="w-full px-3 py-2 rounded border dark:border-slate-700 bg-white dark:bg-slate-900" rows="4" placeholder="Description" value={editForm.description} onChange={e=>setEditForm({...editForm,description:e.target.value})} />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm text-slate-500">Location</label>
                      <input className="w-full px-3 py-2 rounded border dark:border-slate-700 bg-white dark:bg-slate-900" placeholder="Location" value={editForm.location} onChange={e=>setEditForm({...editForm,location:e.target.value})} />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm text-slate-500">Available Seats</label>
                      <input className="w-full px-3 py-2 rounded border dark:border-slate-700 bg-white dark:bg-slate-900" type="number" placeholder="Available Seats" value={editForm.availableSeats} onChange={e=>setEditForm({...editForm,availableSeats:Number(e.target.value)})} />
                    </div>
                    <div className="md:col-span-2 space-y-3">
                      <label className="block text-sm text-slate-500">Image URL</label>
                      <input className="w-full px-3 py-2 rounded border dark:border-slate-700 bg-white dark:bg-slate-900" placeholder="Image URL" value={editForm.image} onChange={e=>setEditForm({...editForm,image:e.target.value})} />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-2">
                    <button className="px-4 py-2 rounded bg-slate-200 dark:bg-slate-700" onClick={()=> setOpenEditor(null)}>Cancel</button>
                    <button
                      className="px-4 py-2 rounded bg-emerald-600 text-white"
                      onClick={async ()=> {
                        const patch = {
                          title: editForm.title,
                          description: editForm.description,
                          date: editForm.date,
                          location: editForm.location,
                          availableSeats: editForm.availableSeats,
                          image: editForm.image,
                        };
                        await update(ev._id, patch);
                        setOpenEditor(null);
                      }}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


