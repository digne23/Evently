import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import MyBookings from './Pages/MyBookings';
import EventDetails from './Pages/EventDetails';
import Contact from './Pages/Contact';
import AdminLayout from './Pages/Admin/Layout';
import AdminUsers from './Pages/Admin/Users';
import AdminEvents from './Pages/Admin/Events';
import Profile from './Pages/Profile';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4 bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/mybookings" element={<MyBookings />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<AdminUsers />} />
            <Route path="events" element={<AdminEvents />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

