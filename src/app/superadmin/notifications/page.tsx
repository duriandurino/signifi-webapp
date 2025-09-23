"use client";

import React, { useEffect, useState } from "react";
import { Bell, Server, ShieldCheck, Users, Headset, Settings } from "lucide-react";
import "./notifications.css"; // import css

type Tab = "All" | "System" | "Compliance" | "User Management" | "Support";

interface Notification {
  id: number;
  type: Tab | "All";
  message: string;
  time: string;
  read: boolean;
}

// 🔹 Mock API (Super Admin specific)
const fetchSuperAdminNotifications = async (): Promise<Notification[]> => {
  return [
    {
      id: 1,
      type: "System",
      message: "Platform update deployed successfully (v2.1.0).",
      time: "15m ago",
      read: false,
    },
    {
      id: 2,
      type: "Compliance",
      message: "New compliance policy: Data retention update effective Oct 1.",
      time: "1h ago",
      read: false,
    },
    {
      id: 3,
      type: "User Management",
      message: "3 institution accounts flagged for unusual activity.",
      time: "3h ago",
      read: false,
    },
    {
      id: 4,
      type: "Support",
      message: "Escalated support ticket: Payment gateway integration failure.",
      time: "5h ago",
      read: false,
    },
    {
      id: 5,
      type: "Compliance",
      message: "Annual security audit results uploaded.",
      time: "1d ago",
      read: true,
    },
    {
      id: 6,
      type: "System",
      message: "Scheduled downtime completed: Database maintenance successful.",
      time: "2d ago",
      read: true,
    },
    {
      id: 7,
      type: "All",
      message: "New feature: Multi-role login enabled across the platform.",
      time: "4d ago",
      read: true,
    },
  ];
};

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("All");

  // 🔹 Simulate backend fetch on mount
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchSuperAdminNotifications();
      setNotifications(data);
    };
    loadData();
  }, []);

  const filteredNotifications =
    activeTab === "All"
      ? notifications
      : notifications.filter((n) => n.type === activeTab);

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "All", label: "All", icon: <Bell className="w-4 h-4" /> },
    { key: "System", label: "System", icon: <Server className="w-4 h-4" /> },
    { key: "Compliance", label: "Compliance", icon: <ShieldCheck className="w-4 h-4" /> },
    { key: "User Management", label: "User Management", icon: <Users className="w-4 h-4" /> },
    { key: "Support", label: "Support", icon: <Headset className="w-4 h-4" /> },
  ];

  const unreadCount = (tab: Tab) => {
    if (tab === "All") return notifications.filter((n) => !n.read).length;
    return notifications.filter((n) => n.type === tab && !n.read).length;
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // 🔹 Icon per notification type
  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "System":
        return <Server className="notif-icon" />;
      case "Compliance":
        return <ShieldCheck className="notif-icon" />;
      case "User Management":
        return <Users className="notif-icon" />;
      case "Support":
        return <Headset className="notif-icon" />;
      case "All":
      default:
        return <Bell className="notif-icon" />;
    }
  };

  return (
    <div className="notif-container">
      {/* Header */}
      <div className="notif-header">
        <h1 className="notif-title">Super Admin Notifications</h1>
        <div className="notif-actions">
          <button className="mark-read-btn" onClick={markAllAsRead}>
            Mark all as read
          </button>
          <button className="settings-btn">
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="notif-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`notif-tab ${activeTab === tab.key ? "active" : ""}`}
          >
            {tab.icon}
            {tab.label}
            {unreadCount(tab.key) > 0 && (
              <span className="notif-badge">{unreadCount(tab.key)}</span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="notif-list">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((n) => (
            <div key={n.id} className={`notif-card ${!n.read ? "unread" : ""}`}>
              <div className="notif-content">
                {getIcon(n.type)}
                <div>
                  <p className="notif-message">{n.message}</p>
                  <p className="notif-time">{n.time}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="notif-empty">No notifications here 🎉</p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
