"use client";

import React from "react";
import {
  Users,
  UserCheck,
  UserX,
  Search,
  Upload,
  Mail,
  UserPlus,
  AlertTriangle,
  Bell,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import "./usermanagement.css";

// Sample data for the users table
const users = [
  { id: "USR001", name: "Maria Santos", email: "maria.santos@email.com", type: "Educator", status: "Active", regDate: "2023-08-15", lastActive: "2 hours ago", initials: "MS" },
  { id: "USR002", name: "Juan Dela Cruz", email: "juan.delacruz@email.com", type: "Educator", status: "Active", regDate: "2023-07-22", lastActive: "1 day ago", initials: "JD" },
  { id: "USR003", name: "Anna Reyes", email: "anna.reyes@email.com", type: "Student", status: "Active", regDate: "2024-01-10", lastActive: "5 minutes ago", initials: "AR" },
  { id: "USR004", name: "Carlos Lopez", email: "carlos.lopez@email.com", type: "Pending", status: "Under Review", regDate: "2024-01-14", lastActive: "3 hours ago", initials: "CL" },
  { id: "USR005", name: "Elena Rodriguez", email: "elena.rodriguez@email.com", type: "Student", status: "Suspended", regDate: "2023-12-05", lastActive: "1 week ago", initials: "ER" },
];

const UserManagementPage = () => {
  return (
    <>
      {/* Page Header */}

      {/* --- Stats Cards Grid --- */}
      <section className="stats-cards">
        <div className="stat-card blue">
          <div className="card-icon">
            <Users size={20} />
          </div>
          <div className="stat-details">
            <span className="stat-value">23,104</span>
            <span className="stat-label">Active Students</span>
            <span className="stat-trend positive">↑ +342 this week</span>
          </div>
        </div>
        <div className="stat-card green">
          <div className="card-icon">
            <UserCheck size={20} />
          </div>
          <div className="stat-details">
            <span className="stat-value">486</span>
            <span className="stat-label">Verified Educators</span>
            <span className="stat-trend neutral">↑ +12 pending review</span>
          </div>
        </div>
        <div className="stat-card red">
          <div className="card-icon">
            <UserX size={20} />
          </div>
          <div className="stat-details">
            <span className="stat-value">8</span>
            <span className="stat-label">Suspended Accounts</span>
            <span className="stat-trend negative">
              <AlertTriangle size={12} /> Requires attention
            </span>
          </div>
        </div>
      </section>

        {/* --- Filter Bar Card --- */}
        <section className="filter-card">
        <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search users by name, email, or ID..." />
        </div>
        <div className="filters">
            <div className="filter-group">
            <label>User Type</label>
            <select><option>All Users</option></select>
            </div>
            <div className="filter-group">
            <label>Status</label>
            <select><option>All Statuses</option></select>
            </div>
            <div className="filter-group">
            <label>Registration Date</label>
            <select><option>All Time</option></select>
            </div>
        </div>
        </section>

        {/* --- Main User Table Card --- */}
        <section className="user-table-card">
        <div className="table-header-actions">
            <h3>User Management</h3>
            <div className="actions-group">
            <button className="btn-table-action"><Upload size={16}/> Export Users</button>
            <button className="btn-table-action"><Mail size={16}/> Bulk Email</button>
            <button className="btn-table-action primary"><UserPlus size={16}/> Add User</button>
            </div>
        </div>

        {/* Table with horizontal scroll */}
        <div className="user-table-wrapper">
        <div className="user-table">
            <div className="table-header">
            <div>User</div>
            <div>Email</div>
            <div>Type</div>
            <div>Status</div>
            <div>Registration Date</div>
            <div>Last Active</div>
            <div>Actions</div>
            </div>

            {users.map((user) => (
            <div key={user.id} className="table-row">
                <div className="user-cell">
                <div className={`user-avatar-initials ${user.type.toLowerCase()}`}>
                    {user.initials}
                </div>
                <div>
                    <span className="user-name">{user.name}</span>
                    <span className="user-id">ID: {user.id}</span> {/* ID below name */}
                </div>
                </div>
                <div>{user.email}</div>
                <div>
                <span className={`type-badge ${user.type.toLowerCase()}`}>{user.type}</span>
                </div>
                <div>
                <span className={`status-badge ${user.status.replace(/\s+/g, '-').toLowerCase()}`}>
                    {user.status}
                </span>
                </div>
                <div>{user.regDate}</div>
                <div>{user.lastActive}</div>
                <div className="action-buttons">
                {user.status === 'Under Review' ? (
                    <>
                    <button className="btn-action review">Review</button>
                    <button className="btn-action verify">Verify</button>
                    </>
                ) : user.status === 'Suspended' ? (
                    <>
                    <button className="btn-action review">Review</button>
                    <button className="btn-action restore">Restore</button>
                    </>
                ) : (
                    <>
                    <button className="btn-action view">View</button>
                    <button className="btn-action edit">Edit</button>
                    </>
                )}
                </div>
            </div>
            ))}
        </div>
        </div>


        {/* --- Pagination Footer --- */}
        <div className="table-footer">
            <div className="footer-controls">
            <span>Showing {users.length} of {users.length} users</span>
            <div className="pagination">
                <button className="btn-page" disabled>Previous</button>
                <button className="btn-page active">1</button>
                <button className="btn-page" disabled>Next</button>
            </div>
            </div>
        </div>
        </section>
    </>
  );
};

export default UserManagementPage;
