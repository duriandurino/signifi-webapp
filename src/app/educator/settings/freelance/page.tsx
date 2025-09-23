"use client";

import { useState } from "react";
import { Bell,ChevronDown } from "lucide-react";
import Image from 'next/image';
import "./settings.css";

export default function SettingsPage() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [twoFA, setTwoFA] = useState(true);

  return (
    <div className="settings-page">
      <div className="page-top-header">
        <div className="header-text">
          <h1>Settings</h1>
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

      {/* Notification Settings */}
      <section className="settings-section">
        <h2 className="settings-section-title">Notification Settings</h2>
        <div className="settings-item">
          <label>
            <input
              type="checkbox"
              checked={emailNotif}
              onChange={() => setEmailNotif(!emailNotif)}
            />
            Email Notifications
          </label>
        </div>
        <div className="settings-item">
          <label>
            <input
              type="checkbox"
              checked={smsNotif}
              onChange={() => setSmsNotif(!smsNotif)}
            />
            SMS Notifications
          </label>
        </div>
      </section>
    </div>
  );
}
