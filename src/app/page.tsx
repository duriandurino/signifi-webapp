"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace('/login');
      } else {
        // Redirect based on user role
        if (user?.role === 'educator') {
          router.replace('/educator/dashboard');
        } else if (user?.role === 'admin') {
          router.replace('/superadmin/dashboard');
        } else if (user?.role === 'institution') {
          router.replace('/institution-admin/dashboard');
        } else {
          router.replace('/login');
        }
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return null;
}
