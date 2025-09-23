"use client";

import React, { useEffect, useState } from "react";
import { Bell, BookOpen, Calendar, Settings } from "lucide-react";
import "./notifications.css"; // import css

type Tab = "All" | "Course Activity" | "Reminders";

interface Notification {
  id: number;
  type: Tab | "All";
  message: string;
  time: string;
  read: boolean;
}

// 🔹 Mock API (simulating backend fetch)
const fetchNotifications = async (): Promise<Notification[]> => {
  return [
    {
      id: 1,
      type: "Course Activity",
      message: "Student Ana completed Lesson 5: Basic FSL Greetings",
      time: "30m ago",
      read: false,
    },
    {
      id: 2,
      type: "Reminders",
      message: "Don’t forget to review Lesson 3: Numbers in FSL",
      time: "2h ago",
      read: false,
    },
    {
      id: 3,
      type: "Course Activity",
      message: "Mark uploaded a practice video for Lesson 2: Alphabet Signs",
      time: "5h ago",
      read: false,
    },
    {
      id: 4,
      type: "Course Activity",
      message: "New quiz added in Module 1: Introduction to FSL",
      time: "1d ago",
      read: true,
    },
    {
      id: 5,
      type: "Reminders",
      message: "Upcoming live session: FSL Conversation Practice on Friday",
      time: "2d ago",
      read: true,
    },
    {
      id: 6,
      type: "All",
      message: "System update: Sign recognition AI model improved for accuracy",
      time: "3d ago",
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
      const data = await fetchNotifications();
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
      key: "Course Activity",
      label: "Course Activity",
      icon: <span className="tab-circle activity"></span>,
    },
    {
      key: "Reminders",
      label: "Reminders",
      icon: <span className="tab-circle reminder"></span>,
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
      case "Course Activity":
        return <BookOpen className="notif-icon" />;
      case "Reminders":
        return <Calendar className="notif-icon" />;
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
