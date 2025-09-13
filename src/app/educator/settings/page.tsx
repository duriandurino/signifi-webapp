"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext"; // where user.role is stored

export default function SettingsRedirect() {
  const router = useRouter();
  const { user } = useAuth(); // user.role could be "institution" or "freelance"

  useEffect(() => {
    if (user?.role === "institution") {
      router.replace("/educator/settings/institution");
    } else if (user?.role === "freelance") {
      router.replace("/educator/settings/freelance");
    } else {
      // 🚨 TEMPORARY fallback: show institution settings until backend is ready
      router.replace("/educator/settings/institution");
    }
  }, [user, router]);

  return <p>Loading settings...</p>;
}
