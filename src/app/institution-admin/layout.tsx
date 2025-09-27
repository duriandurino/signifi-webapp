"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./sidebar";
import Header from "./header";
import "./institutionadmin.css";

export default function InstitutionAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
  const excludedRoutes = [
    "/institution-admin/notifications",
    "/institution-admin/institution-profile",
  ];

  const current = pageTitles[pathname] || {
    title: "Welcome, Admin",
    subtitle: "Here’s what’s happening in your institution",
  };

  return (
    <div className="dashboard-layout">
      <Sidebar setShowLogoutModal={setShowLogoutModal} />

      <div className="main-section">
        {/* Only show Header if NOT excluded */}
        {!excludedRoutes.includes(pathname) && (
          <Header title={current.title} subtitle={current.subtitle} setShowLogoutModal={setShowLogoutModal} />
        )}

        <main className="main-content">{children}</main>
      </div>

      {/* 🔴 Shared Logout Modal */}
      {showLogoutModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>
            <div className="modal-actions">
              <button
                className="btn-logoutcancel"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-logout"
                onClick={() => {
                  setShowLogoutModal(false);
                  router.replace("/login"); // redirect to login
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
