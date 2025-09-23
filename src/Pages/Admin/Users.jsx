import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../services/api';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const me = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    async function load() {
      const data = await fetchUsers();
      const sorted = Array.isArray(data) ? data.sort((a,b)=> (a._id===me?._id?-1:0)) : [];
      setUsers(sorted);
    }
    load();
  }, [token]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
        <table className="min-w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Admin</th>
              <th className="px-4 py-2">Bookings</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} className="border-t border-slate-100 dark:border-slate-800">
                <td className="px-4 py-2 font-mono text-xs">{u._id}</td>
                <td className="px-4 py-2">{u.name}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">{u.phoneNumber || '-'}</td>
                <td className="px-4 py-2">{u.isAdmin ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2">
                  {(u.bookings || []).length} bookings
                  {(u.bookings || []).length > 0 && (
                    <details className="mt-1">
                      <summary className="cursor-pointer text-blue-600">View</summary>
                      <ul className="ml-4 list-disc">
                        {u.bookings.map(b => (
                          <li key={b._id}>
                            {b.event?.title} • {new Date(b.event?.date).toLocaleDateString()} • seats {b.seatsBooked}
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


