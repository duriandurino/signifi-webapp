"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Bell, ChevronDown, User, Settings, HelpCircle, LogOut } from "lucide-react";

export default function Header({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = 3;

  return (
    <div className="header">
      {/* Left Section */}
      <div className="header-text">
        <h1 className="header-title">{title}</h1>
        {subtitle && <p className="header-subtext">{subtitle}</p>}
      </div>

      {/* Right Section */}
      <div className="top-header-actions">
        <button
          className="icon-button notification-button"
          onClick={() => router.push("/institution-admin/notifications")}
        >
          <Bell size={25} />
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
        </button>

        {/* Profile Dropdown */}
        <div className="profile-dropdown" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="header-profile"
          >
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
              <span className="user-name">Admin User</span>
              <span className="user-email">institutionadmin@gmail.com</span>
            </div>
            <ChevronDown
              size={20}
              className={`chevron-icon ${open ? "open" : ""}`}
            />
          </button>

          {open && (
            <div className="dropdown-menu">
              <ul>
                <li onClick={() => router.push("/institution-admin/profile")}>
                  <User size={16} /> Profile
                </li>
                <li onClick={() => router.push("/institution-admin/settings")}>
                  <Settings size={16} /> Settings
                </li>
                <li onClick={() => router.push("/institution-admin/help")}>
                  <HelpCircle size={16} /> Help & Support
                </li>
                <li className="danger" onClick={() => alert("Logging out...")}>
                  <LogOut size={16} /> Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
