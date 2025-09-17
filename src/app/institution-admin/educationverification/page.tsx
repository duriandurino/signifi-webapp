"use client";

import React from "react";
import { Bell, ChevronDown } from "lucide-react";
import Image from "next/image";
import "./educationverification.css";

const EducationVerificationPage = () => {
  // --- Temporary mock data for testing design ---
  const pendingApplications: any[] = [
    {
      name: "Maria Santos",
      email: "maria.santos@example.com",
      status: "Pending",
      applicationDate: "2025-09-10",
      documents: "Diploma.pdf, Transcript.pdf",
    },
    {
      name: "John Cruz",
      email: "john.cruz@example.com",
      status: "Pending",
      applicationDate: "2025-09-11",
      documents: "Certifications.zip",
    },
    {
      name: "Angela Reyes",
      email: "angela.reyes@example.com",
      status: "Pending",
      applicationDate: "2025-09-12",
      documents: "Transcript.pdf",
    },
  ];

  return (
    <div className="verification-container">
      {/* Page Header */}
      <div className="page-top-header">
        <div className="header-text">
          <h1>Education Verification</h1>
          <p className="header-subtext">Manage and Verify educational credentials</p>
        </div>
        <div className="top-header-actions">
          <button className="icon-button notification-button">
            <Bell size={22} />
          </button>
          <div className="header-profile">
            <div className="header-avatar-wrapper">
              <Image
                src="/profile.jpg"
                alt="User Avatar"
                width={40}
                height={40}
                className="header-avatar"
              />
            </div>
            <div className="header-user-info">
              <span className="user-name">Admin User</span>
              <span className="user-email">Institution Admin</span>
            </div>
            <ChevronDown size={20} className="chevron-icon" />
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <div className="table-card-header">
          <h2>Pending Educator Verifications</h2>
        </div>

        <div className="table-scroll-wrapper">
          {pendingApplications.length === 0 ? (
            <div className="empty-state">
              <p>No pending applications yet.</p>
              <p>
                Once educators submit their credentials, they will appear here.
              </p>
            </div>
          ) : (
            <table className="verification-table">
              <thead>
                <tr>
                  <th>APPLICANT</th>
                  <th>EMAIL</th>
                  <th>STATUS</th>
                  <th>APPLICATION DATE</th>
                  <th>DOCUMENTS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {pendingApplications.map((app, index) => (
                  <tr key={index}>
                    <td>{app.name}</td>
                    <td>{app.email}</td>
                    <td>
                      <span className="educationpill status-verificationpending">
                        {app.status}
                      </span>
                    </td>
                    <td>{app.applicationDate}</td>
                    <td>{app.documents}</td>
                    <td>
                      <div className="button-group">
                        <button className="btn btn-review">Review</button>
                        <button className="btn btn-danger">Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="table-pagination">
          <span>
            Showing {pendingApplications.length} of {pendingApplications.length} pending applications
          </span>
          <div className="pagination-controls">
            <button className="btn-page" disabled>
              Previous
            </button>
            <button className="btn-page active">1</button>
            <button className="btn-page" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationVerificationPage;
