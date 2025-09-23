"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, BarChart2, Trophy, Star, BarChart, Bell } from 'lucide-react';
import dynamic from 'next/dynamic';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import './analytics.css';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
);

const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});

const RevenueChart = () => {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Revenue (₱)',
        data: [45000, 52000, 48000, 62000, 55000, 75000, 72000, 85000, 88000, 92000, 94000, 95000],
        borderColor: '#4ade80',
        backgroundColor: 'rgba(74, 222, 128, 0.2)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: 'New Enrollments',
        data: [180, 220, 200, 250, 230, 290, 280, 310, 340, 360, 380, 400],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.4,
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index' as const, intersect: false },
    scales: {
      x: { grid: { display: false } },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        ticks: {
          callback: (value: any) => `₱${value.toLocaleString()}`,
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: { drawOnChartArea: false },
      },
    },
    plugins: {
      legend: { position: 'top' as const, align: 'end' as const, labels: { usePointStyle: true, boxWidth: 6 } },
    },
  };

  return <Line options={options} data={data} />;
};

const AnalyticsPage = () => {
  // mock state – toggle this between true/false to simulate
  const [hasData] = useState(false);

  return (
    <>
      <div className="page-top-header">
        <div className="header-text">
          <h1>Welcome, Professor</h1>
          <p className="header-subtext">Check your progress here</p>
        </div>
        <div className="top-header-actions">
        
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

      {!hasData ? (
        // --- EMPTY STATE ---
        <div className="placeholder-state analytics-placeholder">
          <h3>No analytics data yet</h3>
          <p>
            Once students start enrolling and completing your courses, you’ll see revenue and performance analytics here.
          </p>
        </div>
      ) : (
        // --- REAL DATA STATE ---
        <div className="analytics-grid">
          <div className="analytics-card chart-card">
            <div className="card-header">
              <h4><BarChart2 size={18} /> Revenue & Enrollment Trends</h4>
              <div className="toggle-buttons">
                <button className="toggle-btn active">Revenue</button>
                <button className="toggle-btn">Enrollments</button>
                <button className="toggle-btn">Both</button>
              </div>
            </div>
            <div className="chart-container">
              <RevenueChart />
            </div>
          </div>

          {/* --- Right Card: Top Performing Courses --- */}
          <div className="analytics-card top-courses-card">
            <div className="card-header">
              <h4><Trophy size={18} /> Top Performing Courses</h4>
            </div>

            <div className="courses-list">
              <div className="course-item">
                <div className="course-info">
                  <h5>Complete FSL Beginner</h5>
                  <span>157 students</span>
                </div>
                <div className="course-stats">
                  <span className="course-revenue">
                    ₱17,500
                    <small>Revenue</small>
                  </span>
                  <span className="course-rating">
                    <Star size={14} className="filled" /> 4.9
                  </span>
                </div>
              </div>
              {/* add more items here */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnalyticsPage;
