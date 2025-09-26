"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LearnersPage = () => {
  const router = useRouter();

  // later: fetch this from auth/session
  const role = "institution"; // or "freelance"

  useEffect(() => {
    if (role === "institution") {
      router.replace("/educator/learners/institution");
    } else {
      router.replace("/educator/learners/freelance");
    }
  }, [role, router]);

  return <div>Loading student dashboard...</div>;
};

export default LearnersPage;
