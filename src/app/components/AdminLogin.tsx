'use client';
import { useEffect, useMemo, useState } from 'react';

export default function AdminLogin({ onLoggedIn }: { onLoggedIn: () => void }) {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [capsOn, setCapsOn] = useState(false);
  const API = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

  // simple validity check
  const isValid = useMemo(() => u.trim().length > 0 && p.trim().length > 0, [u, p]);

  // detect CapsLock for better UX
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Some browsers return undefined when not detectable
      const caps = e.getModifierState?.('CapsLock') ?? false;
      setCapsOn(Boolean(caps));
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('keyup', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('keyup', onKey);
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || loading) return;

    setErr('');
    setLoading(true);
    try {
      const r = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: u, password: p }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || 'Login failed');

      const expiresInMs = 12 * 60 * 60 * 1000;

      localStorage.setItem('admin_token', data.access_token);
      localStorage.setItem('admin_token_expiry', String(Date.now() + expiresInMs));
      localStorage.setItem('admin_token', data.access_token);
      onLoggedIn();
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErr(e.message || 'Login failed');
      } else {
        setErr('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg"
        aria-labelledby="admin-login-title"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600/10 flex items-center justify-center">
            {/* lock icon */}
            <svg
              className="h-5 w-5 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                d="M16.5 10.5V7A4.5 4.5 0 007.5 7v3.5m11 0h-15A1.5 1.5 0 002 12v7A1.5 1.5 0 003.5 20.5h17A1.5 1.5 0 0022 19v-7a1.5 1.5 0 00-1.5-1.5z" />
            </svg>
          </div>
          <div>
            <h1 id="admin-login-title" className="text-xl font-semibold">Admin Login</h1>
            <p className="text-xs text-gray-500">Enter credentials to access the admin panel</p>
          </div>
        </div>

        {err && (
          <div
            role="alert"
            className="mb-4 flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200"
          >
            <svg className="mt-0.5 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <span>{err}</span>
          </div>
        )}

        <label className="mb-1 block text-sm font-medium">Username</label>
        <div className="mb-4 relative">
          <input
            aria-label="Username"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            value={u}
            onChange={(e) => setU(e.target.value)}
            placeholder="Enter username"
            autoComplete="username"
            required
          />
          {/* user icon */}
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM3 21a9 9 0 0118 0" />
            </svg>
          </div>
        </div>

        <label className="mb-1 block text-sm font-medium">Password</label>
        <div className="relative">
          <input
            aria-label="Password"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            type={showPass ? 'text' : 'password'}
            value={p}
            onChange={(e) => setP(e.target.value)}
            placeholder="Enter password"
            autoComplete="current-password"
            required
            onKeyUp={(e) => setCapsOn(e.getModifierState?.('CapsLock') ?? false)}
            onKeyDown={(e) => setCapsOn(e.getModifierState?.('CapsLock') ?? false)}
          />
          <button
            type="button"
            aria-label={showPass ? 'Hide password' : 'Show password'}
            onClick={() => setShowPass((s) => !s)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs text-gray-600 hover:bg-gray-100"
            tabIndex={-1}
          >
            {showPass ? 'Hide' : 'Show'}
          </button>
        </div>
        {capsOn && (
          <p className="mt-1 text-xs text-amber-700 bg-amber-50 ring-1 ring-amber-200 rounded px-2 py-1 inline-flex items-center gap-1">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4l7 8h-4v8H9v-8H5l7-8z" />
            </svg>
            Caps Lock is ON
          </p>
        )}

        <button
          type="submit"
          disabled={!isValid || loading}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && (
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          )}
          {loading ? 'Signing in…' : 'Sign in'}
        </button>

        <p className="mt-3 text-center text-xs text-gray-500">
          Use your admin credentials. Access is monitored.
        </p>
      </form>
    </div>
  );
}
