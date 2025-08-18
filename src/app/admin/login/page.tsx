'use client';
import { useRouter } from 'next/navigation';
import AdminLogin from '@/app/components/AdminLogin';

export default function AdminLoginPage() {
  const router = useRouter();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <AdminLogin onLoggedIn={() => router.push('/admin/add-news')} />
    </div>
  );
}
