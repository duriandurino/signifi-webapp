  "use client";

  import React from "react";
  import {
    Search,
    Download,
    Mail,
    UserPlus,
    Bell,
    ChevronDown,
  } from "lucide-react";
  import Image from "next/image";

  import "./usermanagement.css";

  const UserManagementPage = () => {
    // Temporary mock data
    const usersData = [
      {
        id: "EDU001",
        initials: "JD",
        name: "John Doe",
        email: "johndoe@example.com",
        type: "Educator",
        status: "Active",
        registrationDate: "2025-01-15",
        lastActive: "2025-09-12",
      },
      {
        id: "STU002",
        initials: "AS",
        name: "Anna Smith",
        email: "anna.smith@example.com",
        type: "Student",
        status: "Pending",
        registrationDate: "2025-05-20",
        lastActive: "2025-09-10",
      },
      {
        id: "EDU003",
        initials: "MR",
        name: "Michael Reyes",
        email: "michael.reyes@example.com",
        type: "Educator",
        status: "Suspended",
        registrationDate: "2025-02-28",
        lastActive: "2025-08-30",
      },
    ];

    return (
      <div className="user-management-container">
        {/* Page Header */}
        <div className="page-top-header">
          <div className="header-text">
            <h1>User Management</h1>
            <p className="header-subtext">Manage Educators and Learners users</p>
          </div>
          <div className="top-header-actions">
        
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

        {/* Table Toolbar */}
        <div className="table-wrapper">
          <div className="table-toolbar">
            <div className="toolbar-actions">
              <button className="userbtn btn-exportbulk">
                <Download size={14} /> Export Users
              </button>
              <button className="userbtn btn-exportbulk">
                <Mail size={14} /> Bulk Email
              </button>
              <button className="userbtn btn-primary">
                <UserPlus size={14} /> Add User
              </button>
            </div>
            <div className="toolbar-filters">
              <div className="search-wrapper">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search users by name or email"
                />
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
              <small>
                Once educators and learners are added, they will appear here.
              </small>
            </div>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Registration Date</th>
                  <th>Last Active</th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((user, index) => (
                  <tr key={index}>
                    <td>
                      <input type="checkbox" />
                    </td>
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
                    <td>
                      <span
                        className={`um-pill type-${user.type
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {user.type}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`um-pill status-${user.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td>{user.registrationDate}</td>
                    <td>{user.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Table Pagination */}
          <div className="table-um-pagination">
            <span>Showing {usersData.length} of {usersData.length}</span>
            <div className="pagination-controls">
              <button className="btn-umpage">
                Previous
              </button>
              <button className="btn-umpage active">
                1
              </button>
              <button className="btn-umpage">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default UserManagementPage;
