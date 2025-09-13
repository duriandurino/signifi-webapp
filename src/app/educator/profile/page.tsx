"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext"; // where user.role is stored

export default function ProfileRedirect() {
  const router = useRouter();
  const { user } = useAuth(); // user.role could be "institution" or "freelance"

  useEffect(() => {
    if (user?.role === "institution") {
      router.replace("/educator/profile/institution");
    } else if (user?.role === "freelance") {
      router.replace("/educator/profile/freelance");
    } else {
      // 🚨 TEMPORARY: default to institution profile until backend is ready
      router.replace("/educator/profile/institution");
    }
  }, [user, router]);

  return <p>Loading profile...</p>;
}
