"use client";

import React from 'react';
import Image from "next/image";
import { Settings, Cog, Shield, Wallet, Bell, Wrench, Zap, SlidersHorizontal, ChevronDown } from 'lucide-react';
import './settings.css'; 
const SystemSettingsPage = () => {
  return (
    <>
      {/* Page Header */}
      <div className="page-top-header">
        <div className="header-text">
          <h1>System Settings</h1>
        </div>
        <div className="top-header-actions">
          <button className="icon-button notification-button">
            <Bell size={22} />
          </button>
          <div className="header-profile">
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
              <span className="user-email">Institution Admin</span>
            </div>
            <ChevronDown size={20} className="chevron-icon" />
          </div>
        </div>
      </div>

      {/* --- System Status Banner --- */}
      <div className="ss-status-banner">
        <Cog size={18} />
        <span><strong>System Status:</strong> All systems operational. Last backup: 2 hours ago. Next maintenance window: Jan 20, 2024 2:00 AM.</span>
      </div>

      {/* --- Settings Grid --- */}
      <div className="ss-grid">
        {/* General Settings */}
        <div className="ss-card">
          <h3 className="ss-card-title"><SlidersHorizontal size={16} /> General Settings</h3>
          <form className="ss-form">
            <div className="ss-form-group"><label>Platform Name</label><input type="text" defaultValue="SigniFi Learning Platform" /></div>
            <div className="ss-form-group"><label>Support Email</label><input type="email" defaultValue="support@signifi.ph" /></div>
            <div className="ss-form-group"><label>Default Language</label><select><option>Filipino (Tagalog)</option><option>English (US)</option></select></div>
            <button type="submit" className="ss-btn">Save Changes</button>
          </form>
        </div>

        {/* Security Settings */}
        <div className="ss-card">
          <h3 className="ss-card-title"><Shield size={16} /> Security Settings</h3>
          <form className="ss-form">
            <div className="ss-toggle-group"><div><h4>Two-Factor Authentication</h4><p>Require 2FA for admin accounts</p></div><label className="ss-switch"><input type="checkbox" defaultChecked /><span className="ss-slider"></span></label></div>
            <div className="ss-toggle-group"><div><h4>Password Complexity</h4><p>Enforce strong passwords</p></div><label className="ss-switch"><input type="checkbox" defaultChecked /><span className="ss-slider"></span></label></div>
            <div className="ss-form-group-inline"><label>Session Timeout<small>Auto-logout after inactivity</small></label><select><option>30 minutes</option><option>1 hour</option><option>8 hours</option></select></div>
            <button type="submit" className="ss-btn">Update Security</button>
          </form>
        </div>
        
        {/* Payment Settings */}
        <div className="ss-card">
          <h3 className="ss-card-title"><Wallet size={16} /> Payment Settings</h3>
          <form className="ss-form">
            <div className="ss-form-group"><label>Currency</label><select><option>Philippine Peso (₱)</option><option>US Dollar ($)</option></select></div>
            <div className="ss-form-group"><label>Premium Subscription Price</label><input type="number" defaultValue="599"/></div>
            <div className="ss-toggle-group"><div><h4>Accept GCash</h4><p>Enable GCash payments</p></div><label className="ss-switch"><input type="checkbox" defaultChecked /><span className="ss-slider"></span></label></div>
            <button type="submit" className="ss-btn">Save Payment Settings</button>
          </form>
        </div>
        
        {/* Notifications */}
        <div className="ss-card">
          <h3 className="ss-card-title"><Bell size={16} /> Notifications</h3>
          <form className="ss-form">
            <div className="ss-toggle-group"><div><h4>Email Notifications</h4><p>Send admin alerts via email</p></div><label className="ss-switch"><input type="checkbox" defaultChecked /><span className="ss-slider"></span></label></div>
            <div className="ss-toggle-group"><div><h4>User Welcome Emails</h4><p>Automatic welcome messages</p></div><label className="ss-switch"><input type="checkbox" defaultChecked /><span className="ss-slider"></span></label></div>
            <div className="ss-toggle-group"><div><h4>Course Completion Certificates</h4><p>Auto-generate certificates</p></div><label className="ss-switch"><input type="checkbox" /><span className="ss-slider"></span></label></div>
            <button type="submit" className="ss-btn">Save Notifications</button>
          </form>
        </div>

        {/* System Maintenance */}
        <div className="ss-card">
          <h3 className="ss-card-title"><Wrench size={16} /> System Maintenance</h3>
          <div className="ss-maintenance-list">
            <div className="ss-list-item"><div><h4>Last Backup</h4><p>2 hours ago</p></div><button className="ss-btn-light">Run Backup</button></div>
            <div className="ss-list-item"><div><h4>System Health</h4><p>All systems operational</p></div><button className="ss-btn-light">Check Status</button></div>
            <div className="ss-list-item"><div><h4>Clear Cache</h4><p>Improve performance</p></div><button className="ss-btn-light">Clear Cache</button></div>
            <button type="button" className="ss-btn">Schedule Maintenance</button>
          </div>
        </div>
        
        {/* API & Integrations */}
        <div className="ss-card">
          <h3 className="ss-card-title"><Zap size={16} /> API & Integrations</h3>
          <form className="ss-form">
            <div className="ss-form-group-inline"><label>API Key</label><div className="ss-api-key-group"><input type="text" disabled defaultValue="••••••••••••••••" /><button type="button" className="ss-btn-light">Regenerate</button></div></div>
            <div className="ss-toggle-group"><div><h4>Webhook Notifications</h4><p>Enable real-time updates</p></div><label className="ss-switch"><input type="checkbox" defaultChecked /><span className="ss-slider"></span></label></div>
            <div className="ss-form-group-inline"><label>Rate Limiting<small>1000 requests/hour</small></label><button type="button" className="ss-btn-light">Configure</button></div>
            <button type="submit" className="ss-btn">Save API Settings</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SystemSettingsPage;