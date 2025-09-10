"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { GraduationCap, Bookmark, TrendingUp, Star, ChevronDown, Bell } from 'lucide-react';
import './freelance.css';

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

// Helper to convert a date into "x time ago"
const timeAgo = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime(); // difference in milliseconds
  const diffSeconds = Math.floor(diff / 1000);
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);

  if (diffSeconds < 60) return `${diffSeconds} secs ago`;
  if (diffMinutes < 60) return `${diffMinutes} mins ago`;
  if (diffHours < 24) return `${diffHours} hrs ago`;
  if (diffDays < 7) return `${diffDays} days ago`;
  return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
};

const FreelanceDashboardPage = () => {
  const [recentCourses, setRecentCourses] = useState<any[]>([]);
  const [recentReviews, setRecentReviews] = useState<any[]>([]);

  useEffect(() => {
    // Mock course activity data
    setRecentCourses([
      { name: 'Intro to FSL', event: 'Published', date: new Date(Date.now() - 3600 * 1000 * 5), students: 25 }, // 5 hrs ago
      { name: 'Advanced Sign Language', event: 'Draft', date: new Date(Date.now() - 3600 * 1000 * 50), students: 12 }, // 50 hrs ago
      { name: 'FSL for Beginners', event: 'Published', date: new Date(Date.now() - 3600 * 1000 * 24 * 3), students: 18 }, // 3 days ago
      { name: 'FSL Grammar Deep Dive', event: 'Draft', date: new Date(Date.now() - 3600 * 1000 * 24 * 10), students: 7 }, // 10 days ago
      { name: 'Conversational FSL', event: 'Published', date: new Date(Date.now() - 3600 * 1000 * 2), students: 20 }, // 2 hrs ago
    ]);

    // Mock student reviews
    setRecentReviews([
      { name: 'Jane D.', rating: 5, quote: 'This course was amazing! Really improved my signing.', course: 'Intro to FSL' },
      { name: 'John S.', rating: 4, quote: 'Very informative and easy to follow.', course: 'Advanced Sign Language' },
      { name: 'Emily R.', rating: 5, quote: 'Loved the activities and examples!', course: 'FSL for Beginners' },
      { name: 'Michael B.', rating: 3, quote: 'Good course, but could use more examples.', course: 'FSL Grammar Deep Dive' },
      { name: 'Sophia K.', rating: 4, quote: 'Helpful and engaging.', course: 'Conversational FSL' },
    ]);
  }, []);

  return (
    <>
      <div className="page-top-header">
        <div className="header-text">
          <h1>Welcome, Professor</h1>
          <p className="header-subtext">Check your progress here</p>
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

      <div className="dashboard-content-box">
        <nav className="dashboard-tabs">
          <span className="tab-label active">Dashboard Overview</span>
        </nav>

        <section className="stats-cards-grid">
          <div className="stat-card bordered">
            <div className="stat-icon-wrapper"><GraduationCap size={20} /></div>
            <div className="stat-info">
              <span className="stat-value">25</span>
              <span className="stat-label">Total Students</span>
            </div>
          </div>
          <div className="stat-card bordered">
            <div className="stat-icon-wrapper"><Bookmark size={20} /></div>
            <div className="stat-info">
              <span className="stat-value">5</span>
              <span className="stat-label">Total Courses</span>
            </div>
          </div>
          <div className="stat-card bordered">
            <div className="stat-icon-wrapper"><TrendingUp size={20} /></div>
            <div className="stat-info">
              <span className="stat-value">₱3,200</span>
              <span className="stat-label">Total Earnings</span>
            </div>
          </div>
        </section>

        <section className="dashboard-main-grid">
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
                  <div><span className={`badge ${course.event.toLowerCase()}`}>{course.event}</span></div>
                  <div>{timeAgo(course.date)}</div>
                  <div>{course.students}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="content-card bordered">
            <h3>Student Reviews</h3>
            <div className="reviews-list">
              {recentReviews.map((review, index) => (
                <div key={index} className="review-item">
                  <div className="review-header">
                    <h4>{review.name}</h4>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="review-text">{review.quote}</p>
                  <span className="review-course-source">Course: {review.course}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FreelanceDashboardPage;
