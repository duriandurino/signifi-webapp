"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Clock, Bell, Users, Flag, Headset, ExternalLink, ChevronDown } from "lucide-react";
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
import Image from "next/image";
import "./dashboard.css";

// ✅ Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement);

// ✅ Global chart styles
ChartJS.defaults.color = "#ced1d3";
ChartJS.defaults.font = { family: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", size: 12 };

const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), { ssr: false });
const Pie = dynamic(() => import("react-chartjs-2").then((mod) => mod.Pie), { ssr: false });

// 🔹 Mock notifications data
const fetchNotifications = async () => {
  return [
    { id: 1, type: "Verification", message: "12 new educator applications pending review.", read: false },
    { id: 2, type: "Content", message: "5 lessons flagged for moderation.", read: false },
    { id: 3, type: "Support", message: "Urgent support ticket from John Doe.", read: true },
  ];
};

const Header = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<any[]>([]);
  
  useEffect(() => {
    const load = async () => {
      const data = await fetchNotifications();
      setNotifications(data);
    };
    load();
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="page-top-header">
      <div className="header-text">
        <h1>Welcome, Admin</h1>
        <p className="header-subtext">Here’s what’s happening in SigniFi</p>
      </div>

      <div className="top-header-actions">
        {/* Notification button with dynamic unread count */}
        <button
          className="icon-button notification-button relative"
          onClick={() => router.push("/superadmin/notifications")}
        >
          <Bell size={26} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Profile */}
        <div className="header-profile">
          <div className="header-avatar-wrapper">
            <Image src="/profile.jpg" alt="User Avatar" width={40} height={40} className="header-avatar" />
          </div>
          <div className="header-user-info">
            <span className="user-name">Head Admin</span>
            <span className="user-email">signifi@gmail.com</span>
          </div>
          <ChevronDown size={20} className="chevron-icon" />
        </div>
      </div>
    </div>
  );
};

const AdminDashboardPage = () => {
  const [engagementData, setEngagementData] = useState<any | null>(null);
  const [performanceData, setPerformanceData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data
        const engagementJson = {
          labels: ["NOV 8", "NOV 15", "NOV 22", "DEC 01"],
          datasets: [
            { label: "Median Session Length", data: [2.5, 3, 2.8, 4], borderColor: "#34d399", backgroundColor: "rgba(52, 211, 153, 0.2)", tension: 0.4, fill: true },
            { label: "Screens/Session", data: [4, 5, 4.5, 6], borderColor: "#3b82f6", backgroundColor: "rgba(59, 130, 246, 0.2)", tension: 0.4, fill: true },
          ],
        };

        const performanceJson = {
          labels: ["Beginner FSL", "Intermediate FSL", "Advanced FSL", "Business FSL", "Medical FSL", "Specialized"],
          datasets: [{ data: [342, 287, 198, 156, 89, 162], backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#14b8a6"], borderWidth: 0 }],
        };

        setEngagementData(engagementJson);
        setPerformanceData(performanceJson);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const lineOptions = { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } }, plugins: { legend: { position: "bottom" as const } } };
  const pieOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "right" as const, labels: { usePointStyle: true, boxWidth: 10 } } } };

  return (
    <>
      <Header />

      <section className="admin-cards-grid">
        <div className="info-card-admin">
          <div className="card-icon-admin blue"><Users size={20} /></div>
          <h4>Pending Educator Verifications</h4>
          <p>12 educator applications waiting for verification. Average processing time: 2.3 days.</p>
          <button className="btn-admin"><ExternalLink size={14} /> Review Applications</button>
        </div>

        <div className="info-card-admin">
          <div className="card-icon-admin green"><Flag size={20} /></div>
          <h4>Content Moderation Queue</h4>
          <p>5 pieces of content flagged for review. Priority: 2 high, 3 medium.</p>
          <button className="btn-admin"><ExternalLink size={14} /> Review Content</button>
        </div>

        <div className="info-card-admin">
          <div className="card-icon-admin yellow"><Headset size={20} /></div>
          <h4>Support Tickets</h4>
          <p>3 open support tickets. 1 urgent, 2 normal priority. Average response time: 4.2 hours.</p>
          <button className="btn-admin"><ExternalLink size={14} /> Manage Tickets</button>
        </div>
      </section>

      <section className="admin-charts-grid">
        <div className="chart-card-admin">
          <div className="chart-header"><h4>User Engagement Trends</h4></div>
          <div className="chart-container-admin">
            {loading ? <div className="empty-state">Loading data...</div> : engagementData ? <Line options={lineOptions} data={engagementData} /> : <div className="empty-state">No engagement data yet.</div>}
          </div>
        </div>

        <div className="chart-card-admin">
          <div className="chart-header"><h4>Course Categories Performance</h4></div>
          <div className="chart-container-admin">
            {loading ? <div className="empty-state">Loading data...</div> : performanceData ? <Pie options={pieOptions} data={performanceData} /> : <div className="empty-state">No performance data yet.</div>}
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboardPage;
