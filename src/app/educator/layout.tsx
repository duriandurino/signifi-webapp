import React from 'react';
import Sidebar from './sidebar'; 
import './educator.css';    

export default function EducatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <Sidebar /> 
      
      <main className="main-content">
        {children} 
      </main>
    </div>
  );
}