"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GraduationCap, Bookmark, Bell, ChevronDown } from "lucide-react";
import "./institution.css";

const timeAgo = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (diffMinutes < 60) return `${diffMinutes} mins ago`;
  if (diffHours < 24) return `${diffHours} hrs ago`;
  return `${diffDays} days ago`;
};

const Header = () => {
  const router = useRouter();
  const unreadCount = 3; // Replace with real count BACKEND

  return (
    <div className="page-top-header">
      <div className="header-text">
        <h1>Welcome, Professor</h1>
        <p className="header-subtext">Here’s what’s happening in your institution</p>
      </div>

      <div className="top-header-actions">
        {/* Notification button with badge */}
        <button
          className="icon-button notification-button relative"
          onClick={() => router.push("/educator/notifications/educator-notif")}
        >
          <Bell size={22} />
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
            <span className="user-name">Prof. SigniFi</span>
            <span className="user-email">signifi@gmail.com</span>
          </div>
          <ChevronDown size={20} className="chevron-icon" />
        </div>
      </div>
    </div>
  );
};

const InstitutionDashboardPage = () => {
  const [recentCourses, setRecentCourses] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    setRecentCourses([
      {
        name: "Intro to FSL",
        event: "Published",
        date: new Date(Date.now() - 3600 * 1000 * 5),
        students: 120,
      },
      {
        name: "Sign Language for Educators",
        event: "Draft",
        date: new Date(Date.now() - 3600 * 1000 * 26),
        students: 0,
      },
      {
        name: "Inclusive Teaching Methods",
        event: "Published",
        date: new Date(Date.now() - 3600 * 1000 * 48),
        students: 85,
      },
    ]);

    setAnnouncements([
      {
        title: "Quarterly Compliance Report Due",
        message: "Submit your Q3 compliance documents by Sept 15.",
        date: new Date(Date.now() - 3600 * 1000 * 2),
      },
      {
        title: "New Policy Update",
        message: "Institution guidelines for course content have been updated.",
        date: new Date(Date.now() - 3600 * 1000 * 24),
      },
      {
        title: "Training Reminder",
        message:
          "Attend the workshop on inclusive teaching scheduled next week.",
        date: new Date(Date.now() - 3600 * 1000 * 72),
      },
    ]);
  }, []);

  return (
    <>
      {/* ✅ Use Header here */}
      <Header />

      {/* Dashboard */}
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
