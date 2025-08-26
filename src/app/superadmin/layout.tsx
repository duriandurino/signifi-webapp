import React from 'react';
import Sidebar from './sidebar';         
import './superadmin.css';     

export default function InstitutionAdminLayout({
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