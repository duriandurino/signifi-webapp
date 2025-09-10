// app/educator/dashboard/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext"; // assuming you store user role here

export default function DashboardRedirect() {
  const router = useRouter();
  const { user } = useAuth(); // user.role could be "institution" or "freelance"

  useEffect(() => {
    if (user?.role === "institution") {
      router.replace("/educator/dashboard/institution");
    } else if (user?.role === "freelance") {
      router.replace("/educator/dashboard/freelance");
    }
  }, [user, router]);

  return <p>Loading dashboard...</p>;
}
