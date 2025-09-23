import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Initialize theme before app mounts (default to dark)
try {
  const saved = localStorage.getItem('theme');
  if (!saved) {
    localStorage.setItem('theme', 'dark');
  }
  const isDark = (localStorage.getItem('theme') || 'dark') === 'dark';
  document.documentElement.classList.toggle('dark', isDark);
} catch (_) {}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
