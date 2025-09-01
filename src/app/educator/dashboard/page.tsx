"use client";

import React from 'react';
import Image from 'next/image';
import { 
  LayoutDashboard, BookOpen, Users, BarChart2, User, Settings, LogOut, 
  Home, ChevronDown, BookCopy, Users2, Star, Bell 
} from 'lucide-react';
import './dashboard.css';
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => (
        <Star key={index} size={16} className={index < rating ? 'filled' : 'empty'} />
      ))}
    </div>
  );
};

const DashboardPage = () => {
  const pathname = usePathname(); 
  const [totalCourses, setTotalCourses] = useState(0);
  const [recentCourses, setRecentCourses] = useState<{ name: string; event: string; date: string; students: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        let path = '/api/courses';
        const raw = typeof window !== 'undefined' ? localStorage.getItem('auth_user') : null;
        if (raw) {
          try {
            const user = JSON.parse(raw);
            if (user?.user_id) {
              const qp = new URLSearchParams({ educator_id: String(user.user_id) });
              path = `/api/courses?${qp.toString()}`;
            }
          } catch {}
        }
        const resp = await apiFetch<{ message: string; courses: any[] }>(path);
        const courses = resp.courses || [];
        setTotalCourses(courses.length);
        const recent = courses.slice(0, 4).map((c) => ({
          name: c.title,
          event: c.is_published ? 'Published' : 'Draft',
          date: c.created_at ? new Date(c.created_at).toLocaleString() : '-',
          students: 0
        }));
        setRecentCourses(recent);
      } catch (err: any) {
        setError(err?.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <>
      {/* --- Main Header --- */}
      <header className="main-header">
        <div className="startheader">
          <span>Dashboard</span>
        </div>
        <div className="header-right-side">
          <button className="notification-btn">
            <Image
              src="/notif.svg"
              alt="Notifications"
              width={25}
              height={25}
            />
          </button>

          <div className="user-profile">
            <Image
              src="/profile.jpg"
              alt="User Avatar"
              width={32}
              height={32}
              className="user-avatar"
            />
            <span>Professor</span>
            <ChevronDown size={16} />
          </div>
        </div>
      </header>


      {/* --- Welcome Section --- */}
      <section className="welcome-section">
        <h2>Welcome, Professor X!</h2>
        <p>Let's take a look at your FSL Courses</p>
      </section>

      {/* --- Stats Grid --- */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue"><BookCopy size={24} /></div>
          <div className="stat-info">
            <span className="stat-number">{totalCourses}</span>
            <span className="stat-label">Total Courses</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><Users2 size={24} /></div>
          <div className="stat-info">
            <span className="stat-number">0</span>
            <span className="stat-label">Total Students</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon yellow">
              <span className="currency-icon">₱</span>
          </div>
          <div className="stat-info">
              <span className="stat-number">₱0</span>
              <span className="stat-label">Total Earnings</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon cyan"><Star size={24} /></div>
          <div className="stat-info">
            <span className="stat-number">0.0</span>
            <span className="stat-label">Average Rating</span>
          </div>
        </div>
      </section>

      {/* --- Content Area Grid --- */}
      <section className="content-grid">
        {/* --- Recent Course Activity --- */}
        <div className="card course-activity-card">
          <h3>Recent Course Activity</h3>
          <div className="activity-table">
            <div className="activity-header">
              <span>Course Name</span>
              <span>Event</span>
              <span>Date & Time</span>
              <span>Students</span>
            </div>
            {loading && <div style={{ padding: '12px' }}>Loading...</div>}
            {error && !loading && <div style={{ padding: '12px', color: '#b00020' }}>{error}</div>}
            {!loading && !error && recentCourses.map((course, index) => (
              <div key={index} className="activity-row">
                <span>{course.name}</span>
                <span>
                  <span className={`badge ${course.event.toLowerCase()}`}>{course.event}</span>
                </span>
                <span>{course.date}</span>
                <span>{course.students}</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- Recent Reviews --- */}
        <div className="card recent-reviews-card">
          <h3>Recent Reviews</h3>
          <div className="review-list">
            {[{ name: "Student Name", rating: 0, quote: "No reviews yet", course: "-" }].map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-header">
                  <h4>{review.name}</h4>
                  <StarRating rating={review.rating} />
                </div>
                <p className="review-quote">{review.quote}</p>
                <span className="review-course">{review.course}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
