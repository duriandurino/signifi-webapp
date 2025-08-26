"use client";

import { useState } from "react";
import "./settings.css";

export default function SettingsPage() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [twoFA, setTwoFA] = useState(true);

  return (
    <div className="settings-page">
      <h1 className="settings-title">Settings</h1>

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

      {/* Privacy & Security */}
      <section className="settings-section">
        <h2 className="settings-section-title">Privacy & Security</h2>
        <div className="settings-item">
          <label>
            <input
              type="checkbox"
              checked={twoFA}
              onChange={() => setTwoFA(!twoFA)}
            />
            Enable Two-Factor Authentication
          </label>
        </div>
        <div className="settings-item danger">
          <button className="delete-btn">Delete My Account</button>
        </div>
      </section>
    </div>
  );
}
