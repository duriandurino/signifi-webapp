"use client";

import React, { useEffect, useState } from "react";
import { Bell, Flag, Users, Headset, Settings } from "lucide-react";
import "./notifications.css"; // import css

type Tab = "All" | "Verification" | "Content" | "Support";

interface Notification {
  id: number;
  type: Tab | "All";
  message: string;
  time: string;
  read: boolean;
}

// 🔹 Mock API (Institution Admin specific)
const fetchAdminNotifications = async (): Promise<Notification[]> => {
  return [
    {
      id: 1,
      type: "Verification",
      message: "12 new educator applications pending review.",
      time: "25m ago",
      read: false,
    },
    {
      id: 2,
      type: "Content",
      message: "2 flagged lessons awaiting moderation.",
      time: "2h ago",
      read: false,
    },
    {
      id: 3,
      type: "Support",
      message: "Urgent support ticket from Educator John (login issue).",
      time: "3h ago",
      read: false,
    },
    {
      id: 4,
      type: "Verification",
      message: "Application approved: Maria Santos (Freelance Educator).",
      time: "1d ago",
      read: true,
    },
    {
      id: 5,
      type: "Content",
      message: "Lesson 7 flagged for incorrect translation, review needed.",
      time: "2d ago",
      read: true,
    },
    {
      id: 6,
      type: "Support",
      message: "Support ticket resolved: Mark’s payment query.",
      time: "3d ago",
      read: true,
    },
    {
      id: 7,
      type: "All",
      message: "System maintenance scheduled for Saturday, 10 PM.",
      time: "5d ago",
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
      const data = await fetchAdminNotifications();
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
    {
      key: "Verification",
      label: "Verification",
      icon: <Users className="w-4 h-4" />,
    },
    {
      key: "Content",
      label: "Content",
      icon: <Flag className="w-4 h-4" />,
    },
    {
      key: "Support",
      label: "Support",
      icon: <Headset className="w-4 h-4" />,
    },
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
      case "Verification":
        return <Users className="notif-icon" />;
      case "Content":
        return <Flag className="notif-icon" />;
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
        <h1 className="notif-title">Notifications</h1>
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
