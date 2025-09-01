"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Clock, Bell, UserCircle, Users, Flag, Headset, ExternalLink } from "lucide-react";
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
  ArcElement,
} from "chart.js";
import "./dashboard.css"; // Page-specific styles

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement);

const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), { ssr: false });
const Pie = dynamic(() => import("react-chartjs-2").then((mod) => mod.Pie), { ssr: false });

// Simulate "data not ready yet"
const hasData = false; // toggle to true once API is connected

// Engagement Line Chart with fallback
const EngagementChart = () => {
  if (!hasData) {
    return <div className="empty-state">No engagement data yet.</div>;
  }

  const data = {
    labels: ["NOV 8", "NOV 15", "NOV 22", "DEC 01"],
    datasets: [
      { label: "Median Session Length", data: [2.5, 3, 2.8, 4], borderColor: "#34d399", tension: 0.4 },
      { label: "Screens/Session", data: [4, 5, 4.5, 6], borderColor: "#3b82f6", tension: 0.4 },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true } },
    plugins: { legend: { position: "bottom" as const } },
  };

  return <Line options={options} data={data} />;
};

// Performance Pie Chart with fallback
const PerformancePieChart = () => {
  if (!hasData) {
    return <div className="empty-state">No performance data yet.</div>;
  }

  const data = {
    labels: ["Beginner FSL", "Intermediate FSL", "Advanced FSL", "Business FSL", "Medical FSL", "Specialized"],
    datasets: [
      {
        data: [342, 287, 198, 156, 89, 162],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#14b8a6"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "right" as const, labels: { usePointStyle: true, boxWidth: 10 } } },
  };

  return <Pie data={data} options={options} />;
};

const AdminDashboardPage = () => {
  return (
    <>
      <header className="admin-header">
        <h2>Administrative Dashboard</h2>
        <div className="admin-user-profile">
          <div className="admin-avatar">AU</div>
          <div className="admin-user-info">
            <span>Admin User</span>
            <small>System Administrator</small>
          </div>
        </div>
      </header>

      <div className="admin-welcome-bar">
        <div className="admin-welcome-text">
          <UserCircle size={40} />
          <div>
            <h3>Hello, Admin!</h3>
            <div className="login-meta">
              <span>
                <Clock size={14} /> Last login: Today, 9:30 AM
              </span>
              <span>
                <Bell size={14} /> 3 pending notifications
              </span>
              <span>System status: All good</span>
            </div>
          </div>
        </div>
      </div>

      <section className="admin-cards-grid">
        {hasData ? (
          <>
            <div className="info-card-admin">
              <div className="card-icon-admin blue">
                <Users size={20} />
              </div>
              <h4>Pending Educator Verifications</h4>
              <p>12 educator applications waiting for verification. Average processing time: 2.3 days.</p>
              <button className="btn-admin">
                <ExternalLink size={14} /> Review Applications
              </button>
            </div>
            <div className="info-card-admin">
              <div className="card-icon-admin green">
                <Flag size={20} />
              </div>
              <h4>Content Moderation Queue</h4>
              <p>5 pieces of content flagged for review. Priority: 2 high, 3 medium.</p>
              <button className="btn-admin">
                <ExternalLink size={14} /> Review Content
              </button>
            </div>
            <div className="info-card-admin">
              <div className="card-icon-admin yellow">
                <Headset size={20} />
              </div>
              <h4>Support Tickets</h4>
              <p>3 open support tickets. 1 urgent, 2 normal priority. Average response time: 4.2 hours.</p>
              <button className="btn-admin">
                <ExternalLink size={14} /> Manage Tickets
              </button>
            </div>
          </>
        ) : (
          <div className="empty-state">No data available yet. Connect to the database to see dashboard insights.</div>
        )}
      </section>

      <section className="admin-charts-grid">
        <div className="chart-card-admin">
          <div className="chart-header">
            <h4>User Engagement Trends</h4>
          </div>
          <div className="chart-container-admin">
            <EngagementChart />
          </div>
        </div>
        <div className="chart-card-admin">
          <div className="chart-header">
            <h4>Course Categories Performance</h4>
          </div>
          <div className="chart-container-admin">
            <PerformancePieChart />
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboardPage;
