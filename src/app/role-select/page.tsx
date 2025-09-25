"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./role.css"; // The stylesheet for this page

const RoleSelectionPage = () => {
  const router = useRouter();

  return (
    <div className="page-wrapper">
      <div className="selection-window">
        {/* Fake window bar at the top */}
        <div className="window-bar">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>

        {/* Split container */}
        <div className="split-container">
          {/* Admin signup panel */}
          <div className="selection-panel hiring-panel">
            <h2>Sign up for Admin</h2>
            <div className="illustration-wrapper">
              <Image
                src="/educator.svg"
                alt="Educator Illustration"
                width={200}
                height={400}
              />
            </div>
            <button
              className="btn btn-recruiter"
              onClick={() => router.push("/admin-signup")}
            >
              SIGNUP AS ADMIN
            </button>
            <p className="login-link">
              Already have an account? <a href="/login">Login here</a>
            </p>
          </div>

          {/* Vertical divider */}
          <div className="vertical-line"></div>

          {/* Educator signup panel */}
          <div className="selection-panel seeker-panel">
            <h2>Sign up for Educator</h2>
            <div className="illustration-wrapper">
              <Image
                src="/admin.svg"
                alt="Admin Illustration"
                width={200}
                height={400}
              />
            </div>
            <button
              className="btn btn-seeker"
              onClick={() => router.push("/signup")}
            >
              SIGNUP AS EDUCATOR
            </button>
            <p className="login-link">
              Already have an account? <a href="/login">Login here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
