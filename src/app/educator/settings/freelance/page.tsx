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
