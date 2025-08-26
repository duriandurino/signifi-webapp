import React from 'react';
import Sidebar from './sidebar';         // Imports the new admin sidebar from this folder
import './institutionadmin.css';     // Imports the new admin CSS

export default function InstitutionAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This JSX is identical to your educator layout, but it will use the new imports
  return (
    <div className="dashboard-layout">
      <Sidebar /> 
      
      <main className="main-content">
        {children} 
      </main>
    </div>
  );
}