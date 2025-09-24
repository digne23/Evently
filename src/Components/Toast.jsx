import React, { createContext, useContext, useEffect, useState } from 'react';

const ToastContext = createContext({ push: (msg, type) => {} });

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = (message, type = 'info', duration = 3000) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), duration);
  };

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed z-50 top-4 right-4 space-y-2">
        {toasts.map((t) => (
          <div key={t.id} className={`px-4 py-3 rounded-xl shadow-lg ring-1 backdrop-blur text-white ${
            t.type === 'success' ? 'bg-emerald-600/90 ring-emerald-400/30' :
            t.type === 'error' ? 'bg-rose-600/90 ring-rose-400/30' :
            'bg-slate-800/90 ring-white/10'
          }`}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}


