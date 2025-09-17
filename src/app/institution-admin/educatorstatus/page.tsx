"use client";

import React, { useState, useEffect } from "react";
import { Search, CheckCircle, Bell, ChevronDown } from "lucide-react";
import Image from "next/image";
import "./educatorstatus.css";

// Mock API (replace this later with a real API call)
const mockEducators = [
  { id: 1, name: "Prof. William Davis", email: "william.d@example.com", status: "Granted", lastChange: "2023-09-01" },
  { id: 2, name: "Dr. Emily Johnson", email: "emily.johnson@example.com", status: "Revoked", lastChange: "2023-08-20" },
  { id: 3, name: "Mr. Daniel Smith", email: "daniel.smith@example.com", status: "Granted", lastChange: "2023-07-15" },
  { id: 4, name: "Prof. Sophia Lee", email: "sophia.lee@example.com", status: "Revoked", lastChange: "2023-09-05" },
  { id: 5, name: "Dr. Michael Brown", email: "michael.brown@example.com", status: "Granted", lastChange: "2023-09-10" },
  { id: 6, name: "Ms. Olivia Taylor", email: "olivia.taylor@example.com", status: "Revoked", lastChange: "2023-08-25" },
];

const EducatorStatusPage = () => {
  const [educators, setEducators] = useState(mockEducators);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All Statuses");

  // Simulate API call (later replace with fetch/axios)
  useEffect(() => {
    // Example:
    // fetch("/api/educators")
    //   .then((res) => res.json())
    //   .then((data) => setEducators(data));
    setEducators(mockEducators);
  }, []);

  // Filtering + Search
  const filteredEducators = educators.filter((educator) => {
    const matchesSearch = educator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          educator.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "All Statuses" || educator.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Toggle status
  const handleToggleStatus = (id: number) => {
    setEducators((prev) =>
      prev.map((educator) =>
        educator.id === id
          ? {
              ...educator,
              status: educator.status === "Granted" ? "Revoked" : "Granted",
              lastChange: new Date().toISOString().split("T")[0], // today
            }
          : educator
      )
    );
  };

  return (
    <>
      {/* Page Header */}
      <div className="page-top-header">
        <div className="header-text">
          <h1>Educator Status Management</h1>
          <p className="header-subtext">
            Grant or revoke educator status for users within your institution
          </p>
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

      {/* --- Main Content Card --- */}
      <section className="educatorcontent-card-wrapper">
        <div className="table-container">
          <div className="table-toolbar">
            <h3>Educator Privileges</h3>
            <div className="toolbar-actions">
              <div className="search-bar">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search educator by name or email"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="filter-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option>All Statuses</option>
                <option>Granted</option>
                <option>Revoked</option>
              </select>
              <button className="btn-grant-status">
                <CheckCircle size={16} /> Grant Status
              </button>
            </div>
          </div>

          {/* --- Educator Table --- */}
          <div className="educator-table">
            <div className="table-header">
              <div>Educator Name</div>
              <div>Email</div>
              <div>Status</div>
              <div>Last Granted/Revoked</div>
              <div>Actions</div>
            </div>

            {/* Table Rows */}
            {filteredEducators.map((educator) => (
              <div key={educator.id} className="table-row">
                <div>{educator.name}</div>
                <div>{educator.email}</div>
                <div>
                  <span
                    className={`status-badge ${educator.status.toLowerCase()}`}
                  >
                    {educator.status.toUpperCase()}
                  </span>
                </div>
                <div>{educator.lastChange}</div>
                <div className="eduaction-buttons">
                  <button
                    className={
                      educator.status === "Granted"
                        ? "btn-revoke"
                        : "btn-grant"
                    }
                    onClick={() => handleToggleStatus(educator.id)}
                  >
                    {educator.status === "Granted" ? "Revoke" : "Grant"}
                  </button>
                </div>
              </div>
            ))}

            {filteredEducators.length === 0 && (
              <div className="no-results">No educators found.</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default EducatorStatusPage;
