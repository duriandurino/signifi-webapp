"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";
import Header from "./header";
import "./superadmin.css";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 📝 Map routes -> page titles
  const pageTitles: Record<string, { title: string; subtitle?: string }> = {
    "/superadmin/dashboard": {
      title: "Welcome, Admin",
      subtitle: "Here’s what’s happening in SigniFi",
    },
    "/superadmin/usermanagement": {
      title: "Educator Verification",
    },
    "/superadmin/superadmin-profile": {
      title: "Admin Profile",
    },
    
  };

  // ❌ Exclude header from certain pages (like notifications)
  const excludedRoutes = [
    "/superadmin/notifications",
    "/superadmin/settings",
    "/superadmin/superadmin-profile",
  ];

  const current = pageTitles[pathname] || {
    title: "Super Admin Dashboard",
    subtitle: "Manage institutions, admins, and users",
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-section">
        {/* ✅ Only show Header if NOT excluded */}
        {!excludedRoutes.includes(pathname) && (
          <Header title={current.title} subtitle={current.subtitle} />
        )}

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
