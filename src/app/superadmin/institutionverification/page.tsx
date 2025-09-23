"use client";

import React, { useEffect, useState } from "react";
import {
  University,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  ChevronDown,
  Bell,
} from "lucide-react";
import Image from "next/image";
import "./institutionverification.css";

// Institution type
interface Institution {
  id: number;
  name: string;
  location: string;
  type: string;
  status: string;
  submitted: string;
  initials: string;
}

const InstitutionVerificationPage = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock backend fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((res) => setTimeout(res, 600));

        const mockData: Institution[] = [
          {
            id: 1,
            name: "University of Cebu",
            location: "Cebu, CA",
            type: "Public University",
            status: "Under Review",
            submitted: "Nov 10, 2023",
            initials: "UC",
          },
          {
            id: 2,
            name: "PHISHI",
            location: "Talisay",
            type: "Private University",
            status: "Approved",
            submitted: "Nov 8, 2023",
            initials: "PH",
          },
          {
            id: 3,
            name: "City College",
            location: "Cebu",
            type: "Community College",
            status: "Documents Required",
            submitted: "Nov 12, 2023",
            initials: "CC",
          },
          {
            id: 4,
            name: "National Polytechnic",
            location: "Quezon City",
            type: "Polytechnic University",
            status: "Rejected",
            submitted: "Nov 15, 2023",
            initials: "NP",
          },
          {
            id: 5,
            name: "Saint Dominic Academy",
            location: "Makati",
            type: "Private College",
            status: "Approved",
            submitted: "Nov 9, 2023",
            initials: "SD",
          },
        ];

        setInstitutions(mockData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load institutions");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      <section className="stats-cards-verification">
        <div className="instat-card blue">
          <div className="instat-icon">
            <University size={20} />
          </div>
          <div className="instat-details">
            <span className="instat-value">{institutions.length}</span>
            <span className="instat-label">Total Institutions</span>
          </div>
        </div>
        <div className="instat-card orange">
          <div className="instat-icon">
            <Clock size={20} />
          </div>
          <div className="instat-details">
            <span className="instat-value">
              {institutions.filter((i) => i.status === "Under Review").length}
            </span>
            <span className="instat-label">Pending Reviews</span>
          </div>
        </div>
        <div className="instat-card green">
          <div className="instat-icon">
            <CheckCircle size={20} />
          </div>
          <div className="instat-details">
            <span className="instat-value">
              {institutions.filter((i) => i.status === "Approved").length}
            </span>
            <span className="instat-label">Approved</span>
          </div>
        </div>
        <div className="instat-card red">
          <div className="instat-icon">
            <XCircle size={20} />
          </div>
          <div className="instat-details">
            <span className="instat-value">
              {institutions.filter((i) => i.status === "Rejected").length}
            </span>
            <span className="instat-label">Rejected</span>
          </div>
        </div>
      </section>

      {/* --- Workflow Timeline --- */}
      <section className="workflow-card">
        <h3>Institution Registration Workflow</h3>
        <div className="workflow-steps">
          <div className="step one">
            <div className="step-circle">1</div>
            <div className="step-info">
              <h4>Application</h4>
              <p>Institution submits registration</p>
            </div>
          </div>
          <div className="step two">
            <div className="step-circle">2</div>
            <div className="step-info">
              <h4>Document Review</h4>
              <p>Admin reviews documents</p>
            </div>
          </div>
          <div className="step three">
            <div className="step-circle">3</div>
            <div className="step-info">
              <h4>Verification</h4>
              <p>Identity verification process</p>
            </div>
          </div>
          <div className="step four">
            <div className="step-circle">4</div>
            <div className="step-info">
              <h4>Approval</h4>
              <p>Final approval decision</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Applications Table Card --- */}
      <section className="applications-table-card">
        <div className="instable-header-actions">
          <h3>Recent Institution Applications</h3>
          <button className="btn-add-institution">
            <Plus size={16} /> Add Institution
          </button>
        </div>

        {loading && <p className="loading-text">Loading institutions...</p>}
        {error && <p className="error-text">{error}</p>}

        <div className="ins-table">
          {!loading && !error && (
            <div className="table-container">
            <div className="applications-table">
              <div className="instable-header">
                <div>Institution</div>
                <div>Type</div>
                <div>Status</div>
                <div>Submitted</div>
                <div>Actions</div>
              </div>
              {institutions.map((inst) => (
                <div key={inst.id} className="instable-row">
                  <div className="institution-cell">
                    <div className={`inst-avatar-initials color-${inst.id}`}>
                      {inst.initials}
                    </div>
                    <div className="institution-info">
                      <div className="inst-name">{inst.name}</div>
                      <div className="inst-location">{inst.location}</div>
                    </div>
                  </div>
                  <div>{inst.type}</div>
                  <div>
                    <span
                      className={`status-badge status-${inst.status
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`}
                    >
                      {inst.status}
                    </span>
                  </div>
                  <div>{inst.submitted}</div>
                  <div className="action-links">
                    {inst.status === "Approved" ? (
                    <>
                        <a href="#" className="btn view">View Details</a>
                        <a href="#" className="btn edit">Edit</a>
                    </>
                    ) : inst.status === "Documents Required" ? (
                    <>
                        <a href="#" className="btn request">Request Docs</a>
                        <a href="#" className="btn danger">Reject</a>
                    </>
                    ) : (
                    <>
                        <a href="#" className="btn review">Review</a>
                        <a href="#" className="btn approve">Approve</a>
                        <a href="#" className="btn danger">Reject</a>
                    </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            </div>
          )}
        </div>

        <div className="instable-footer">
          <span>
            Showing {institutions.length} of {institutions.length} applications
          </span>
          <div className="pagination">
            <a href="#" className="page-link">
              Previous
            </a>
            <a href="#" className="page-link active">
              1
            </a>
            <a href="#" className="page-link">
              2
            </a>
            <a href="#" className="page-link">
              3
            </a>
            <a href="#" className="page-link">
              Next
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default InstitutionVerificationPage;
