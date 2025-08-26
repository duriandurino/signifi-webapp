"use client";

import React from 'react';
import { Users, UserCheck, AlertTriangle } from 'lucide-react';
import './dashboard.css';

const AdminDashboardPage = () => {
  // Empty state: no stats yet
  const statsData = [
    { label: "Active Students", value: 0, trend: null, icon: Users, colorClass: "icon-blue" },
    { label: "Verified Educators", value: 0, trend: null, icon: UserCheck, colorClass: "icon-green" },
    { label: "Suspended Accounts", value: 0, trend: null, icon: AlertTriangle, colorClass: "icon-red" },
  ];

  const activityLogData: any[] = []; // Empty array for no activity yet

  return (
    <div className="dashboard-content">
      {/* Page Header */}
      <header className="dashboard-header">
        <h1>Institution Dashboard</h1>
        <div className="admin-user-profile">
          <div className="user-text">
            <span className="user-name">Admin User</span>
            <span className="user-role">Institution Administrator</span>
          </div>
          <div className="user-avatar">
            <span>AD</span>
          </div>
        </div>
      </header>

      {/* Statistics Cards Grid */}
      <div className="stats-grid">
        {statsData.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div className="stat-card" key={idx}>
              <div className={`stat-icon ${stat.colorClass}`}>
                <Icon size={20} color="white" />
              </div>
              <div className="stat-content">
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
                {stat.trend ? (
                  <p className={`stat-trend ${stat.trend > 0 ? "trend-positive" : "trend-negative"}`}>
                    {stat.trend > 0 ? "↑" : "↓"} {stat.trend} this week
                  </p>
                ) : (
                  <p className="stat-trend empty-trend">Waiting for data</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Log Section */}
      <section className="activity-log-section">
        <h2>Recent Activity Log</h2>
        {activityLogData.length === 0 ? (
          <div className="empty-activity-placeholder">
            <p>No recent activity yet</p>
            <small>All actions will appear here once users interact with the system.</small>
          </div>
        ) : (
          <div className="activity-log-card">
            <table className="activity-table">
              <thead>
                <tr>
                  <th>TIME</th>
                  <th>ACTION</th>
                  <th>USER</th>
                  <th>DETAILS</th>
                </tr>
              </thead>
              <tbody>
                {activityLogData.map((log, index) => (
                  <tr key={index}>
                    <td>{log.time}</td>
                    <td>{log.action}</td>
                    <td>{log.user}</td>
                    <td>{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboardPage;
