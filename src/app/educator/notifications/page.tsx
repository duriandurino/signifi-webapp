"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function NotificationsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // ✅ wait until auth is loaded

    if (!user) {
      router.replace("/login"); // ✅ fallback if no user
      return;
    }

    if (user.role === "educator") {
      router.replace("/educator/notifications/educator-notif");
    } else if (user.role === "freelance-educator") {
      router.replace("/educator/notifications/freelance-notif");
    } else {
      router.replace("/"); // ✅ fallback for unknown roles
    }
  }, [user, isLoading, router]);

  return <div>Redirecting to notifications...</div>;
}
