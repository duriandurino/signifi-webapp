"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Archive, UserCheck, Clock, Search, Bell, ChevronDown,
  FileText, FolderOpen, Mail, Check, X, AlertOctagon, Eye
} from 'lucide-react';
import './educatorverification.css'; // The stylesheet for this page

// Sample data for the applications table
const applications = [
  { id: 1, name: 'Maria Santos', email: 'maria.santos@email.com', specialization: 'Beginner FSL', experience: '8 years', university: 'University of the Philippines', date: 'Jan 15, 2025', status: 'Pending Review' },
  { id: 2, name: 'John Dela Cruz', email: 'john.delacruz@email.com', specialization: 'Intermediate FSL', experience: '5 years', university: 'De La Salle University', date: 'Jan 14, 2025', status: 'Under Review' },
  { id: 3, name: 'Ana Garcia', email: 'ana.garcia@email.com', specialization: 'Advanced FSL', experience: '12 years', university: 'Ateneo de Manila University', date: 'Jan 13, 2025', status: 'Pending Review' },
  { id: 4, name: 'Carlos Reyes', email: 'carlos.reyes@email.com', specialization: 'Medical FSL', experience: '6 years', university: 'University of Santo Tomas', date: 'Jan 12, 2025', status: 'Documents Needed' },
  { id: 5, name: 'Lisa Fernandez', email: 'lisa.fernandez@email.com', specialization: 'Beginner FSL', experience: '4 years', university: 'Far Eastern University', date: 'Jan 11, 2025', status: 'Pending Review' },
  { id: 6, name: 'Miguel Torres', email: 'miguel.torres@email.com', specialization: 'Business FSL', experience: '7 years', university: 'Polytechnic University', date: 'Jan 10, 2025', status: 'Under Review' },
];

const EducatorVerificationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter applications by search term (name or email)
  const filteredApplications = applications.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Page Header */}
      <div className="page-top-header">
        <div className="header-text">
          <h1>Institution Verification</h1>
        </div>
        <div className="top-header-actions">
        
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

      {/* --- Stats Cards --- */}
      <section className="edustats-cards-verification">
        <div className="edustat-card orange">
          <div className="card-icon"><Archive size={20} /></div>
          <div className="stat-details">
            <span className="stat-value">12</span>
            <span className="stat-label">Pending Applications</span>
            <span className="stat-trend negative"><AlertOctagon size={12}/> Urgent review needed</span>
          </div>
        </div>
        <div className="edustat-card green">
          <div className="card-icon"><UserCheck size={20} /></div>
          <div className="stat-details">
            <span className="stat-value">486</span>
            <span className="stat-label">Verified Educators</span>
            <span className="stat-trend positive">↑ +18 this month</span>
          </div>
        </div>
        <div className="edustat-card red">
          <div className="card-icon"><Clock size={20} /></div>
          <div className="stat-details">
            <span className="stat-value">2.3 days</span>
            <span className="stat-label">Avg. Processing Time</span>
            <span className="stat-trend negative">↓ +0.5 days from target</span>
          </div>
        </div>
      </section>

      {/* --- Main Filter Card --- */}
      <section className="edu-applications-table-card">
        <div className="edu-table-header-actions">
            <h3>Pending Educator Applications</h3>
            <div className="edu-table-filters">
            <div className="edu-table-search-bar">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <select><option>All Status</option></select>
            <select><option>All Specializations</option></select>
            </div>
        </div>

        <div className="edu-applications-table-wrapper">
          <div className="edu-applications-table">
            <div className="edu-table-header">
              <div>Applicant</div>
              <div>Specialization</div>
              <div>Experience</div>
              <div>Application Date</div>
              <div>Status</div>
              <div>Documents</div>
              <div>Actions</div>
            </div>

            {filteredApplications.map((app) => (
              <div key={app.id} className="edu-table-row">
                <div className="edu-applicant-cell">
                  <Image
                    src="/profile.jpg"
                    alt={app.name}
                    width={32}
                    height={32}
                    className="edu-applicant-avatar"
                  />
                  <div>
                    <span className="edu-applicant-name">{app.name}</span>
                    <span className="edu-applicant-email">{app.email}</span>
                  </div>
                </div>

                <div>
                  <span className={`edu-spec-badge edu-spec-${app.specialization.split(' ')[0].toLowerCase()}`}>
                    {app.specialization}
                  </span>
                </div>

                <div>
                  <span className="edu-exp-years">{app.experience}</span>
                  <span className="edu-exp-uni">{app.university}</span>
                </div>

                <div>
                  <span className="edu-app-date">{app.date}</span>
                  {/* removed daysAgo */}
                </div>

                <div>
                  <span className={`edu-status-badge edu-status-${app.status.replace(/\s+/g, '-').toLowerCase()}`}>
                    {app.status}
                  </span>
                </div>

                <div className="edu-doc-icons">
                  <FileText size={16} />
                  <FolderOpen size={16} />
                  <Mail size={16} />
                </div>

                <div className="edu-action-buttons">
                  <button className="edu-action-btn edu-view"><Eye size={14}/></button>
                  <button className="edu-action-btn edu-approve"><Check size={14}/></button>
                  <button className="edu-action-btn edu-reject"><X size={14}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="edu-table-footer">
            <span>Showing {filteredApplications.length} of {applications.length} applications</span>
            <div className="edu-pagination">
            <a href="#" className="edu-page-link">Previous</a>
            <a href="#" className="edu-page-link active">1</a>
            <a href="#" className="edu-page-link">2</a>
            <a href="#" className="edu-page-link">3</a>
            <a href="#" className="edu-page-link">4</a>
            <a href="#" className="edu-page-link">Next</a>
            </div>
        </div>
      </section>
    </>
  );
};

export default EducatorVerificationPage;
