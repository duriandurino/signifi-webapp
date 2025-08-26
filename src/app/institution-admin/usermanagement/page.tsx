"use client";

import React from 'react';
import { Search, Download, Mail, UserPlus } from 'lucide-react';
import './usermanagement.css';

const UserManagementPage = () => {
  // Empty placeholder data
  const usersData: any[] = []; // Empty array to show "no users yet"

  return (
    <div className="user-management-container">
      {/* Page Header */}
      <div className="page-header">
        <h1>User Management</h1>
        {/* Admin profile can go here if needed */}
      </div>

      {/* Table Toolbar */}
      <div className="table-wrapper">
        <div className="table-toolbar">
          <div className="toolbar-actions">
            <button className="btn btn-secondary">
              <Download size={16} /> Export Users
            </button>
            <button className="btn btn-secondary">
              <Mail size={16} /> Bulk Email
            </button>
            <button className="btn btn-primary">
              <UserPlus size={16} /> Add User
            </button>
          </div>
          <div className="toolbar-filters">
            <div className="search-wrapper">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search users by name, email..." />
            </div>
            <select>
              <option value="">User Type</option>
              <option value="educator">Educator</option>
              <option value="student">Student</option>
            </select>
            <select>
              <option value="">Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        {usersData.length === 0 ? (
          <div className="empty-table-placeholder">
            <p>No users found yet.</p>
            <small>Once educators and learners are added, they will appear here.</small>
          </div>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>USER</th>
                <th>EMAIL</th>
                <th>TYPE</th>
                <th>STATUS</th>
                <th>REGISTRATION DATE</th>
                <th>LAST ACTIVE</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user, index) => (
                <tr key={index}>
                  <td><input type="checkbox" /></td>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">{user.initials}</div>
                      <div>
                        <span className="user-name">{user.name}</span>
                        <span className="user-id">ID: {user.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td><span className={`pill type-${user.type.toLowerCase().replace(' ', '-')}`}>{user.type}</span></td>
                  <td><span className={`pill status-${user.status.toLowerCase().replace(' ', '-')}`}>{user.status}</span></td>
                  <td>{user.registrationDate}</td>
                  <td>{user.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Table Pagination */}
        <div className="table-pagination">
          <span>Showing 0 of 0</span>
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

export default UserManagementPage;
