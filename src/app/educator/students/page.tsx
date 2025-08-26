"use client";

import React from 'react';
import Image from 'next/image';
import { 
  ChevronDown, Users, UserCheck, GraduationCap, BarChart, 
  Upload, UserPlus, Search, Eye, MessageSquare, BarChartBig
} from 'lucide-react';
import './students.css';

// Helper Component for the Progress Bar
const ProgressBar = ({ percentage, color }: { percentage: number; color: 'green' | 'yellow' | 'teal' | 'red' }) => (
  <div className="progress-bar-container">
    <div className={`progress-bar-fill ${color}`} style={{ width: `${percentage}%` }}></div>
  </div>
);

// Placeholder data
const placeholderStats = [
  { label: "Total Students", number: 0, icon: Users, color: "blue" },
  { label: "Active Students", number: 0, icon: UserCheck, color: "green" },
  { label: "Completed Courses", number: 0, icon: GraduationCap, color: "yellow" },
];

const StudentsPage = () => {
  return (
    <>
      {/* --- Main Header --- */}
      <header className="main-header">
        <div className="startheader">
          <span>Students</span>
        </div>
        <div className="user-profile">
          <Image src="/profile.jpg" alt="User Avatar" width={32} height={32} className="user-avatar" />
          <span>Professor</span>
          <ChevronDown size={16} />
        </div>
      </header>
      {/* --- Page Header --- */}
      <section className="page-header">
        <div className="header-text">
          <h2>Student Management</h2>
          <p>Track and manage your FSL students' progress</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-export">
            <Upload size={16} /> Export Data
          </button>
          <button className="btn btn-invite">
            <UserPlus size={16} /> Invite Student
          </button>
        </div>
      </section>

      {/* --- Stats Grid --- */}
      <section className="stats-grid-students">
        {placeholderStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="stat-card-students">
              <div className={`stat-icon-students ${stat.color}`}><Icon size={20} /></div>
              <div className="stat-info-students">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* --- Student List Card --- */}
      <section className="student-list-card">
        <div className="student-list-header">
          <h3>Student List</h3>
          <div className="student-list-filters">
            <div className="student-search-wrapper">
              <input type="text" placeholder="Search students..." disabled />
              <Search size={18} />
            </div>
            <select className="student-filter-dropdown" disabled>
              <option>All Courses</option>
            </select>
          </div>
        </div>

        <div className="student-table">
          {/* Placeholder row */}
          <div className="table-row placeholder-row">
            <div className="placeholder-cell">
              No students yet. Students you add will appear here.
            </div>
          </div>
        </div>

        <div className="table-footer">
          <span className="footer-text">Showing 0 students</span>
          <div className="pagination">
            <a href="#" className="page-link disabled">Previous</a>
            <a href="#" className="page-link active">1</a>
            <a href="#" className="page-link disabled">Next</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default StudentsPage;
