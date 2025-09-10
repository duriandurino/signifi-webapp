"use client";
import React, { useEffect } from 'react';
import Sidebar from './sidebar'; 
import './educator.css';    
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function EducatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || user?.role !== 'educator') {
        router.replace('/login');
      }
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'educator') {
    return null;
  }

  return (
    <div className="educator-layout">
      <Sidebar /> 
      <main className="main-content">
        {children} 
      </main>
    </div>
  );
}