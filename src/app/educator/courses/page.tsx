"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const CoursesPage = () => {
  const router = useRouter();

  // ⚡ You’ll probably fetch this from auth/session context later
  const role = "institution"; // mock role: "institution" | "freelance"

  useEffect(() => {
    if (role === "institution") {
      router.replace("/educator/courses/institution");
    } else {
      router.replace("/educator/courses/freelance");
    }
  }, [role, router]);

  return <div>Loading course dashboard...</div>;
};

export default CoursesPage;
