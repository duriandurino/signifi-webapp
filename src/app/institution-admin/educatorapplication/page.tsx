import React from 'react';
import { Download, Bell, ChevronDown } from 'lucide-react';
import Image from "next/image";
import './educatorapplications.css';

// --- Mock Data (temporary demo) ---
const educatorApplications = [
  {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    status: "PENDING",
    applicationDate: "2025-09-10",
  },
  {
    name: "John Smith",
    email: "john.smith@example.com",
    status: "APPROVED",
    applicationDate: "2025-08-22",
  },
  {
    name: "Emily Johnson",
    email: "emily.j@example.com",
    status: "REJECTED",
    applicationDate: "2025-09-01",
  },
  {
    name: "Michael Lee",
    email: "michael.lee@example.com",
    status: "PENDING",
    applicationDate: "2025-09-14",
  },
];

const EducatorApplicationsPage = () => {
  return (
    <div className="educator-applications-container">
      {/* Page Header */}
        <div className="page-top-header">
          <div className="header-text">
            <h1>Educator Applications</h1>
            <p className="header-subtext">Review and process new applications from prospective educators</p>
          </div>
          <div className="header-actions">
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

      {/* Main Content Card */}
      <div className="educatortable-wrapper">
        {/* Table Header and Controls */}
        <div className="table-educatorheader">
          <h2>All Educator Applications</h2>
          <div className="header-controls">
             <div className="relative inline-block w-48">
                <select
                  className="status-filter appearance-none border rounded px-3 py-2 pr-10 w-full"
                >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              <ChevronDown
                size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
            </div>
            <button className="btn btn-export">
              <Download size={16} /> Export All
            </button>
          </div>
        </div>

        {/* Applications Table */}
        <div className="table-scroll-wrapper">
          <div className='educator-app-page'>
          <table className="applications-table">
            <thead>
              <tr>
                <th>Applicant Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Application Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {educatorApplications.length > 0 ? (
                educatorApplications.map((app, index) => (
                  <tr key={index}>
                    <td>{app.name}</td>
                    <td>{app.email}</td>
                    <td>
                      <span className={`pill status-${app.status.toLowerCase()}`}>
                        {app.status}
                      </span>
                    </td>
                    <td>{app.applicationDate}</td>
                    <td>
                      {app.status === "PENDING" ? (
                        <button className="btn btn-action">Review</button>
                      ) : app.status === "REJECTED" ? (
                        <button className="btn btn-action">View Reason</button>
                      ) : (
                        <button className="btn btn-action">View Details</button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="empty-state">
                    No applications yet. Once educators start applying, they’ll show up here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducatorApplicationsPage;
