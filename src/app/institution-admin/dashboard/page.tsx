"use client";

import React from "react";
import { Users, UserCheck, AlertTriangle, Bell, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./dashboard.css";

const Header = () => {
  const router = useRouter();
  const unreadCount = 3; // Replace with real count from BACKEND later

  return (
    <div className="page-top-header">
      <div className="header-text">
        <h1>Welcome, Admin</h1>
        <p className="header-subtext">
          Here’s what’s happening in your institution
        </p>
      </div>

      <div className="top-header-actions">
        {/* Notification button with badge */}
        <button
          className="icon-button notification-button relative"
          onClick={() => router.push("/institution-admin/notifications")}
        >
          <Bell size={26} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Profile */}
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
            <span className="user-email">institutionadmin@gmail.com</span>
          </div>
          <ChevronDown size={20} className="chevron-icon" />
        </div>
      </div>
    </div>
  );
};

const AdminDashboardPage = () => {
  // Mock statistics
  const statsData = [
    {
      label: "Active Students",
      value: 1280,
      trend: 12,
      icon: Users,
      colorClass: "icon-blue",
    },
    {
      label: "Verified Educators",
      value: 56,
      trend: 3,
      icon: UserCheck,
      colorClass: "icon-green",
    },
    {
      label: "Suspended Accounts",
      value: 8,
      trend: -2,
      icon: AlertTriangle,
      colorClass: "icon-red",
    },
  ];

  // Mock activity log
  const activityLogData = [
    {
      time: "10:32 AM",
      action: "Login",
      user: "John Doe",
      details: "Logged into system",
    },
    {
      time: "09:58 AM",
      action: "Verified Educator",
      user: "Admin User",
      details: "Approved educator profile: Maria Santos",
    },
    {
      time: "Yesterday",
      action: "Account Suspended",
      user: "System",
      details: "Suspended account: user123",
    },
    {
      time: "2 days ago",
      action: "Student Registered",
      user: "Jane Smith",
      details: "New student account created",
    },
  ];

  return (
    <div className="admin-dashboard">
      {/* Top Header */}
      <Header />

      {/* Statistics Cards Grid */}
      <div className="card-box">
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
                    <p
                      className={`stat-trend ${
                        stat.trend > 0 ? "trend-positive" : "trend-negative"
                      }`}
                    >
                      {stat.trend > 0 ? "↑" : "↓"} {Math.abs(stat.trend)} this
                      week
                    </p>
                  ) : (
                    <p className="stat-trend empty-trend">Waiting for data</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity Log Section */}
      <div className="card-box">
        <section className="activity-log-section">
          <h2>Recent Activity Log</h2>
          {activityLogData.length === 0 ? (
            <div className="empty-activity-placeholder">
              <p>No recent activity yet</p>
              <small>
                All actions will appear here once users interact with the
                system.
              </small>
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
    </div>
  );
};

export default AdminDashboardPage;
