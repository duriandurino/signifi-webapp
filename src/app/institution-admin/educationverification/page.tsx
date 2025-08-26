"use client";

import React from "react";
import { Check, X } from "lucide-react";
import "./educationverification.css";

const EducationVerificationPage = () => {
  // Empty array simulating no pending applications yet
  const pendingApplications: any[] = [];

  return (
    <div className="verification-container">
      {/* Page Header */}
      <div className="page-header">
        <h1>Education Verification</h1>
        <p>Manage and verify educational credentials for educators applying to your institution.</p>
      </div>

      <div className="table-wrapper">
        <div className="table-card-header">
          <h2>Pending Educator Verifications</h2>
          <div className="header-actions">
            <button className="btn btn-approve-all">
              <Check size={16} /> Approve All
            </button>
            <button className="btn btn-reject-selected">
              <X size={16} /> Reject Selected
            </button>
          </div>
        </div>

        <div className="table-scroll-wrapper">
          {pendingApplications.length === 0 ? (
            <div className="empty-state">
              <p>No pending applications yet.</p>
              <p>Once educators submit their credentials, they will appear here.</p>
            </div>
          ) : (
            <table className="verification-table">
              <thead>
                <tr>
                  <th><input type="checkbox" /></th>
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
                    <td><input type="checkbox" /></td>
                    <td>{app.name}</td>
                    <td>{app.email}</td>
                    <td>{app.status}</td>
                    <td>{app.applicationDate}</td>
                    <td>Docs</td>
                    <td>Actions</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Placeholder */}
        <div className="table-pagination">
          <span>Showing 0 of 0 pending applications</span>
          <div className="pagination-controls">
            <button className="btn-page" disabled>Previous</button>
            <button className="btn-page active" disabled>1</button>
            <button className="btn-page" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationVerificationPage;
