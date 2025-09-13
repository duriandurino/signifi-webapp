"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const StudentsPage = () => {
  const router = useRouter();

  // later: fetch this from auth/session
  const role = "institution"; // or "freelance"

  useEffect(() => {
    if (role === "institution") {
      router.replace("/educator/students/institution");
    } else {
      router.replace("/educator/students/freelance");
    }
  }, [role, router]);

  return <div>Loading student dashboard...</div>;
};

export default StudentsPage;
