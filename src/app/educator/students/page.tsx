"use client";

import React from 'react';
import Image from 'next/image';
import { 
  ChevronDown, Users, UserCheck, GraduationCap, Upload, 
  UserPlus, Search, Bell 
} from 'lucide-react';
import './students.css';

// Helper Component for the Progress Bar
const ProgressBar = ({ percentage, color }: { percentage: number; color: 'green' | 'yellow' | 'teal' | 'red' }) => (
  <div className="progress-bar-container">
    <div className={`progress-bar-fill ${color}`} style={{ width: `${percentage}%` }}></div>
  </div>
);

// Placeholder stats
const placeholderStats = [
  { label: "Total Students", number: 3, icon: Users, color: "blue" },
  { label: "Active Students", number: 2, icon: UserCheck, color: "green" },
  { label: "Completed Courses", number: 1, icon: GraduationCap, color: "yellow" },
];

// Mock student data
const mockStudents = [
  {
    id: 1,
    name: "Juan Dela Cruz",
    email: "juan.cruz@example.com",
    course: "FSL Basics hdasuuuuuuuuuuuudauigdaugd hdsadgadaddad7wt",
    progress: 75,
    lastActivity: "2 days ago",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria.santos@example.com",
    course: "Intermediate FSL",
    progress: 40,
    lastActivity: "5 hours ago",
  },
  {
    id: 3,
    name: "Pedro Reyes",
    email: "pedro.reyes@example.com",
    course: "FSL Basics",
    progress: 100,
    lastActivity: "1 week ago",
  },
];

const StudentsPage = () => {
  return (
    <>
      {/* --- Main Header --- */}
      <div className="page-top-header">
        <div className="header-text">
          <h1>Student Management</h1>
          <p className="header-subtext">Track and manage your FSL students' progress</p>
        </div>
        <div className="top-header-actions">
          <button className="icon-button notification-button">
            <Bell size={22} />
          </button>
          <div className="header-profile">
            <div className="header-avatar-wrapper">
              <Image src="/profile.jpg" alt="User Avatar" width={40} height={40} className="header-avatar" />
            </div>
            <div className="header-user-info">
              <span className="user-name">Prof. SigniFi</span>
              <span className="user-email">signifi@gmail.com</span>
            </div>
            <ChevronDown size={20} className="chevron-icon" />
          </div>
        </div>
      </div>

      {/* --- Page Actions --- */}
      <section className="page-header">
        <div></div>
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
              <div className={`stat-icon-students ${stat.color}`}><Icon size={18} /></div>
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
              <input type="text" className="student-search-input" placeholder="Search students..." />
              <Search size={18} />
            </div>
            <select className="student-filter-dropdown">
              <option>All Courses</option>
              <option>FSL Basics</option>
              <option>Intermediate FSL</option>
            </select>
          </div>
        </div>

        <div className="student-table">
          {/* --- Table Headers --- */}
          <div className="table-row table-header">
            <div className="table-cell">Student</div>
            <div className="table-cell">Course</div>
            <div className="table-cell">Progress</div>
            <div className="table-cell">Last Activity</div>
          </div>

          {/* --- Table Data --- */}
          {mockStudents.map((student) => (
            <div className="table-row" key={student.id}>
              <div className="table-cell student-info">
                <strong>{student.name}</strong>
                <span className="student-email">{student.email}</span>
              </div>
              <div className="table-cell course-name">{student.course}</div>
              <div className="table-cell progress-cell">
                <ProgressBar 
                  percentage={student.progress} 
                  color={student.progress === 100 ? "green" : student.progress > 50 ? "teal" : "yellow"} 
                />
                <span className="progress-text">{student.progress}%</span>
              </div>
              <div className="table-cell last-activity">{student.lastActivity}</div>
            </div>
          ))}
        </div>

        <div className="table-footer">
          <span className="footer-text">Showing {mockStudents.length} students</span>
          <div className="pagination">
            <a href="#" className="page-link">Previous</a>
            <a href="#" className="page-link active">1</a>
            <a href="#" className="page-link">Next</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default StudentsPage;
