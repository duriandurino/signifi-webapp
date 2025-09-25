"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";
import Header from "./header";
import "./institutionadmin.css";

export default function InstitutionAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 📝 Map routes -> page titles
  const pageTitles: Record<string, { title: string; subtitle?: string }> = {
    "/institution-admin/dashboard": {
      title: "Welcome, Admin",
      subtitle: "Overview of your institution activity",
    },
    "/institution-admin/usermanagement": {
      title: "User Management",
      subtitle: "Manage Educators and Learners users",
    },
    "/institution-admin/educationverification": {
      title: "Education Verification",
      subtitle: "Manage and Verify educational credentials",
    },
    "/institution-admin/educatorapplication": {
      title: "Educator Applications",
      subtitle: "Review and process new applications from prospective educators",
    },
    "/institution-admin/learneraccounts": {
      title: "Learner Account Management",
      subtitle: "Manage existing learner accounts, including adding new users or deleting inactive ones",
    },
    "/institution-admin/educatorstatus": {
      title: "Educator Status Management",
      subtitle: "Grant or revoke educator status for users within your institution",
    },
    "/institution-admin/studentprogress": {
      title: "Track Learner Progress",
      subtitle: "Monitor student performance, completion rates, and engagement across all courses.",
    },

  };

  // exclude these pages from showing a header
  const excludedRoutes = ["/institution-admin/notifications"];

  const current = pageTitles[pathname] || {
    title: "Welcome, Admin",
    subtitle: "Here’s what’s happening in your institution",
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-section">
        {/* Only show Header if NOT excluded */}
        {!excludedRoutes.includes(pathname) && (
          <Header title={current.title} subtitle={current.subtitle} />
        )}
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
