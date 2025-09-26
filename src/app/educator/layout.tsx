"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "./sidebar";
import Header from "./header";
import "./educator.css";
import { useAuth } from "@/contexts/AuthContext";

export default function EducatorLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, isAuthenticated } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Allowed educator roles
  const allowedRoles = ["educator", "freelance-educator"];

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
        router.replace("/login");
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

  if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
    return null;
  }

  // Map routes -> page titles
  const pageTitles: Record<string, { title: string; subtitle?: string }> = {
    "/educator/dashboard/institution": {
      title: "Welcome, Professor",
      subtitle: "Overview of your courses and learners.",
    },
    "/educator/dashboard/freelance": {
      title: "Welcome, Educator",
      subtitle: "Overview of your courses and learners.",
    },
    "/educator/courses/freelance": {
      title: "Course Management",
      subtitle: "Create, edit, and manage your FSL courses",
    },
    "/educator/courses/institution": {
      title: "Course Management",
      subtitle: "Create, edit, and manage your FSL courses",
    },
    "/educator/learners/freelance": {
      title: "Learner Management",
      subtitle: "Track learner progress and engagement",
    },
    "/educator/learners/institution": {
      title: "Learner Management",
      subtitle: "Track learner progress and engagement",
    },
    "/educator/analytics/institution": {
      title: "Analytics",
      subtitle: "Visualize course and learner data",
    },
    "/educator/analytics/freelance": {
      title: "Analytics",
      subtitle: "Visualize course and learner data",
    },
    "/educator/settings/freelance": {
      title: "Educator Settings",
    },
    "/educator/settings/institution": {
      title: "Educator Settings",
    },
  };

  const excludedRoutes = [
    "/educator/notifications/educator-notif",
    "/educator/notifications/freelance-notif",
    "/educator/profile/freelance",
    "/educator/profile/institution",
  ];

  const current = pageTitles[pathname];

  return (
    <div className="educator-layout">
      <Sidebar showLogoutModal={showLogoutModal} setShowLogoutModal={setShowLogoutModal} />

      <div className="main-section">
        {/* Header always visible */}
        {current && !excludedRoutes.includes(pathname) && (
          <Header title={current.title} subtitle={current.subtitle} />
        )}

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
