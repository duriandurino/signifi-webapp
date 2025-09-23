"use client";

import React, { useEffect, useState } from "react";
import { Search, UserPlus, Bell, ChevronDown } from "lucide-react";
import Image from "next/image";
import "./learneraccounts.css";

// --- Mock API / Placeholder Data ---
const mockLearners = [
  { id: 1, name: "David Lee", email: "david.l@example.com", status: "Active", registeredDate: "2023-11-01" },
  { id: 2, name: "Sophia Garcia", email: "sophia.g@example.com", status: "Suspended", registeredDate: "2024-01-20" },
  { id: 3, name: "James Wilson", email: "james.w@example.com", status: "Active", registeredDate: "2024-03-05" },
  { id: 4, name: "Maria Santos", email: "maria.s@example.com", status: "Suspended", registeredDate: "2024-04-18" },
  { id: 5, name: "Ethan Chen", email: "ethan.c@example.com", status: "Active", registeredDate: "2024-05-22" },
  { id: 6, name: "Luna Park", email: "luna.p@example.com", status: "Active", registeredDate: "2024-06-11" },
  { id: 7, name: "Olivia Reyes", email: "olivia.r@example.com", status: "Suspended", registeredDate: "2024-07-30" },
];

const LearnerManagementPage = () => {
  const [learners, setLearners] = useState(mockLearners); // state to store learner list
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All Status");

  // --- Simulate Backend Fetch ---
  useEffect(() => {
    // later replace this with fetch("/api/learners")
    const fetchData = async () => {
      // Simulate API delay
      await new Promise((res) => setTimeout(res, 500));
      setLearners(mockLearners);
    };

    fetchData();
  }, []);

  // --- Filter + Search Logic ---
  const filteredLearners = learners.filter((learner) => {
    const matchesSearch = learner.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "All Status" || learner.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      {/* Page Header */}
      <div className="page-top-header">
        <div className="header-text">
          <h1>Learner Account Management</h1>
          <p className="header-subtext">
            Manage existing learner accounts, including adding new users or deleting inactive ones
          </p>
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

      {/* --- Main Content Card --- */}
      <section className="content-card-wrapper">
        <div className="table-container">
          <div className="table-toolbar">
            <h3>All Learner Accounts</h3>
            <div className="toolbar-actions">
              <div className="search-bar">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search learner by name or email"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                className="filter-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Suspended</option>
              </select>
              <button className="btn-add-learner">
                <UserPlus size={16} /> Add New Learner
              </button>
            </div>
          </div>

          {/* --- Learner Table --- */}
          <div className="learner-table">
            <div className="learnertable-header">
              <div>Learner Name</div>
              <div>Email</div>
              <div>Status</div>
              <div>Registered Date</div>
              <div>Actions</div>
            </div>

            {/* Table Rows */}
            {filteredLearners.length > 0 ? (
              filteredLearners.map((learner) => (
                <div key={learner.id} className="learnertable-row">
                  <div>{learner.name}</div>
                  <div>{learner.email}</div>
                  <div>
                    <span className={`status-badge ${learner.status.toLowerCase()}`}>
                      {learner.status.toUpperCase()}
                    </span>
                  </div>
                  <div>{learner.registeredDate}</div>
                  <div className="learneraction-buttons">
                    <button className="btn-view">View</button>
                    {learner.status === "Active" ? (
                      <button className="btn-delete">Delete</button>
                    ) : (
                      <button className="btn-reinstate">Reinstate</button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">No learners found</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default LearnerManagementPage;
