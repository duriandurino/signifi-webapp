import React from 'react';
import { Download } from 'lucide-react';
import './educatorapplications.css';

// --- Mock Data (can be empty while waiting for DB) ---
const educatorApplications: any[] = []; // ← pretend empty for now

const EducatorApplicationsPage = () => {
  return (
    <div className="educator-applications-container">
      {/* Page Header */}
      <div className="page-header">
        <h1>Educator Applications</h1>
        <p>Review and process new applications from prospective educators.</p>
        <p>This page lists all applications, whether pending, approved, or rejected.</p>
      </div>

      {/* Main Content Card */}
      <div className="table-wrapper">
        {/* Table Header and Controls */}
        <div className="table-header">
          <h2>All Educator Applications</h2>
          <div className="header-controls">
            <select className="status-filter">
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <button className="btn btn-primary">
              <Download size={16} /> Export All
            </button>
          </div>
        </div>

        {/* Applications Table */}
        <div className="table-scroll-wrapper">
          <table className="applications-table">
            <thead>
              <tr>
                <th>APPLICANT NAME</th>
                <th>EMAIL</th>
                <th>STATUS</th>
                <th>APPLICATION DATE</th>
                <th>ACTIONS</th>
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
                      {app.status === 'PENDING' ? (
                        <button className="btn btn-secondary">Review</button>
                      ) : app.status === 'REJECTED' ? (
                        <button className="btn btn-secondary">View Reason</button>
                      ) : (
                        <button className="btn btn-secondary">View Details</button>
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
  );
};

export default EducatorApplicationsPage;
