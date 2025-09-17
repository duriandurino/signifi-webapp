"use client";

import React, { useEffect, useState } from "react";
import { Search, Star, Bell, ChevronDown } from "lucide-react";
import Image from "next/image";
import "./studentprogress.css";

/* -------------------------
   Temporary mock data
   Replace fetchStudents / fetchFeedback with real API calls later
   ------------------------- */
const mockStudents = [
  {
    id: 1,
    name: "Daniel Kim",
    course: "Introduction to FSL",
    progress: "75%",
    lastActivity: "2 hours ago",
    status: "IN PROGRESS",
    statusClass: "in-progress",
    actionLabel: "View Details",
  },
  {
    id: 2,
    name: "Lisa Chen",
    course: "Advanced Medical FSL",
    progress: "90%",
    lastActivity: "1 day ago",
    status: "COMPLETED",
    statusClass: "completed",
    actionLabel: "Generate Report",
  },
  {
    id: 3,
    name: "Carlos Ruiz",
    course: "Introduction to FSL",
    progress: "45%",
    lastActivity: "3 days ago",
    status: "IN PROGRESS",
    statusClass: "in-progress",
    actionLabel: "View Details",
  },
  {
    id: 4,
    name: "Angela Park",
    course: "Advanced Medical FSL",
    progress: "100%",
    lastActivity: "5 days ago",
    status: "COMPLETED",
    statusClass: "completed",
    actionLabel: "Generate Certificate",
  },
];

const mockFeedback = [
  {
    id: 1,
    course: "Introduction to FSL",
    student: "Learner X",
    rating: 5,
    comment: "Great content, very clear explanations!",
    date: "2024-05-15",
    actionLabel: "Reply",
  },
  {
    id: 2,
    course: "Advanced Medical FSL",
    student: "Learner Y",
    rating: 3,
    comment: "Audio quality could be improved in some videos.",
    date: "2024-05-14",
    actionLabel: "View Details",
  },
];

/* simulated fetch helpers (async so swapping in real fetch is trivial) */
const fetchStudents = async () => {
  await new Promise((r) => setTimeout(r, 250)); // simulate latency
  return mockStudents;
};

const fetchFeedback = async () => {
  await new Promise((r) => setTimeout(r, 250)); // simulate latency
  return mockFeedback;
};

/* -------------------------
   Component
   ------------------------- */
const StudentProgressPage: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("All Courses");

  useEffect(() => {
    (async () => {
      const s = await fetchStudents();
      const f = await fetchFeedback();
      setStudents(s);
      setFeedback(f);
    })();
  }, []);

  const courses = ["All Courses", ...Array.from(new Set(students.map((s) => s.course)))];

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      !searchQuery ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = courseFilter === "All Courses" || s.course === courseFilter;
    return matchesSearch && matchesCourse;
  });

  return (
    <>
      <div className="page-top-header">
        <div className="header-text">
          <h1>Track Student Progress</h1>
          <p className="header-subtext">
            Monitor student performance, completion rates, and engagement across all courses.
          </p>
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
              <span className="user-name">Admin User</span>
              <span className="user-email">Institution Admin</span>
            </div>
            <ChevronDown size={20} className="chevron-icon" />
          </div>
        </div>
      </div>

      {/* Progress Overview Card */}
      <section className="content-card">
        <div className="studenttable-wrapper">
          <div className="table-toolbar">
            <h3>Student Progress Overview</h3>

            <div className="toolbar-actions">
              <div className="studentsearch-bar">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search student by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <select
                className="studentfilter-select"
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
              >
                {courses.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="progress-table">
            <div className="studenttable-header">
              <div>STUDENT NAME</div>
              <div>COURSE</div>
              <div>PROGRESS</div>
              <div>LAST ACTIVITY</div>
              <div>STATUS</div>
              <div>ACTIONS</div>
            </div>

            {filteredStudents.map((stu) => (
              <div className="studenttable-row" key={stu.id}>
                <div>{stu.name}</div>
                <div>{stu.course}</div>
                <div>{stu.progress}</div>
                <div>{stu.lastActivity}</div>
                <div>
                  <span className={`status-badge ${stu.statusClass}`}>{stu.status}</span>
                </div>
                <div>
                  <button className="btn-table">{stu.actionLabel}</button>
                </div>
              </div>
            ))}

            {filteredStudents.length === 0 && <div className="studenttable-row">No students found.</div>}
          </div>
        </div>
      </section>

      {/* Recent Feedback Card */}
      <section className="content-card">
        <div className="table-wrapper">
          <div className="table-toolbar">
            <h3>Recent Feedback</h3>

            <div className="toolbar-actions">
              <select className="studentfilter-select">
                <option>All Courses</option>
                {Array.from(new Set(feedback.map((f) => f.course))).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="feedback-table">
            <div className="studenttable-header">
              <div>COURSE</div>
              <div>STUDENT</div>
              <div>RATING</div>
              <div className="comment-col">COMMENT</div>
              <div>DATE</div>
              <div>ACTIONS</div>
            </div>

            {feedback.map((fb) => (
              <div className="studenttable-row" key={fb.id}>
                <div>{fb.course}</div>
                <div>{fb.student}</div>
                <div className="rating-cell">
                  {fb.rating}/5 <Star size={14} className="star-icon" />
                </div>
                <div className="comment-col">"{fb.comment}"</div>
                <div>{fb.date}</div>
                <div>
                  <button className="btn-table">{fb.actionLabel}</button>
                </div>
              </div>
            ))}

            {feedback.length === 0 && <div className="studenttable-row">No feedback yet.</div>}
          </div>
        </div>
      </section>
    </>
  );
};

export default StudentProgressPage;
