'use client';

import { useEffect, useState } from 'react';
import AddNewsForm from '@/app/components/AddNewsForm';
import AdminLogin from '@/app/components/AdminLogin';

export default function AddNewsPage() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window === 'undefined') return;

      const token = localStorage.getItem('admin_token');
      const expiryStr = localStorage.getItem('admin_token_expiry');
      const expiry = expiryStr ? parseInt(expiryStr, 10) : 0;

      // not logged in OR expired? -> force logout UI
      if (!token || !expiry || Date.now() > expiry) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_token_expiry');
        setAuthed(false);
      } else {
        setAuthed(true);
      }
    };

    // initial check
    checkAuth();

    // react to login/logout in other tabs
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'admin_token' || e.key === 'admin_token_expiry') {
        checkAuth();
      }
    };
    window.addEventListener('storage', onStorage);

    // periodic check (e.g., every 5s)
    const interval = setInterval(checkAuth, 5000);

    return () => {
      window.removeEventListener('storage', onStorage);
      clearInterval(interval);
    };
  }, []);

  if (!authed) {
    // Not authenticated: show login
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <AdminLogin onLoggedIn={() => setAuthed(true)} />
      </div>
    );
  }

  // Authenticated: show form + a simple logout button
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Submit a News Article</h1>
        <button
          onClick={() => {
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin_token_expiry');
            setAuthed(false);
          }}
          className="rounded border px-3 py-1 text-sm hover:bg-gray-50"
        >
          Log out
        </button>
      </div>
      <AddNewsForm />
    </div>
  );
}
