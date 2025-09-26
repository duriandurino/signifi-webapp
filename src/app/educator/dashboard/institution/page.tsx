"use client";

import React, { useEffect, useState } from "react";
import { GraduationCap, Bookmark } from "lucide-react";
import "./institution.css";

// Helper to convert a date into "x time ago"
const timeAgo = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diff / 1000);
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);

  if (diffSeconds < 60) return `${diffSeconds} secs ago`;
  if (diffMinutes < 60) return `${diffMinutes} mins ago`;
  if (diffHours < 24) return `${diffHours} hrs ago`;
  if (diffDays < 7) return `${diffDays} days ago`;
  return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
};

const InstitutionDashboardPage = () => {
  const [recentCourses, setRecentCourses] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    // Mock course activity
    setRecentCourses([
      {
        name: "Intro to FSL",
        event: "Published",
        date: new Date(Date.now() - 3600 * 1000 * 5), // 5 hrs ago
        students: 120,
      },
      {
        name: "Sign Language for Educators",
        event: "Draft",
        date: new Date(Date.now() - 3600 * 1000 * 26), // 26 hrs ago
        students: 0,
      },
      {
        name: "Inclusive Teaching Methods",
        event: "Published",
        date: new Date(Date.now() - 3600 * 1000 * 48), // 48 hrs ago
        students: 85,
      },
    ]);

    // Mock announcements
    setAnnouncements([
      {
        title: "Quarterly Compliance Report Due",
        message: "Submit your Q3 compliance documents by Sept 15.",
        date: new Date(Date.now() - 3600 * 1000 * 2), // 2 hrs ago
      },
      {
        title: "New Policy Update",
        message:
          "Institution guidelines for course content have been updated.",
        date: new Date(Date.now() - 3600 * 1000 * 24), // 24 hrs ago
      },
      {
        title: "Training Reminder",
        message:
          "Attend the workshop on inclusive teaching scheduled next week.",
        date: new Date(Date.now() - 3600 * 1000 * 72), // 3 days ago
      },
    ]);
  }, []);

  return (
    <>
      <div className="dashboard-content-box">
        <nav className="dashboard-tabs">
          <span className="tab-label active">Dashboard Overview</span>
        </nav>

        {/* Stats */}
        <section className="stats-cards-grid">
          <div className="stat-card bordered">
            <div className="stat-icon-wrapper">
              <GraduationCap size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">205</span>
              <span className="stat-label">Total Enrolled Students</span>
            </div>
          </div>
          <div className="stat-card bordered">
            <div className="stat-icon-wrapper">
              <Bookmark size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">12</span>
              <span className="stat-label">Courses Uploaded</span>
            </div>
          </div>
        </section>

        {/* Main Grid */}
        <section className="dashboard-main-grid">
          {/* Course Activity */}
          <div className="content-card bordered">
            <h3>Course Activity</h3>
            <div className="activity-table">
              <div className="table-header">
                <div>COURSE NAME</div>
                <div>EVENT</div>
                <div>DATE & TIME</div>
                <div>STUDENTS</div>
              </div>
              {recentCourses.map((course, index) => (
                <div key={index} className="table-row">
                  <div>{course.name}</div>
                  <div>
                    <span className={`badge ${course.event.toLowerCase()}`}>
                      {course.event}
                    </span>
                  </div>
                  <div>{timeAgo(course.date)}</div>
                  <div>{course.students}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="content-card bordered">
            <h3>
              Announcements <span className="announcement-emoji">🚀</span>
            </h3>
            <div className="announcements-list">
              {announcements.map((a, index) => (
                <div key={index} className="announcement-item">
                  <h4>{a.title}</h4>
                  <p>{a.message}</p>
                  <span className="announcement-time">{timeAgo(a.date)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default InstitutionDashboardPage;
