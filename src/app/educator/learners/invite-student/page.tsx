"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import './invitestudent.css';


type Role = "freelance" | "institution";

export default function InviteStudentPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("freelance");
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    course: "",
    department: "",
    message: "",
  });

  useEffect(() => {
    // Detect role from localStorage (optional). If you use a real auth context,
    // replace this logic with your auth value (e.g. from useAuth()).
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("signifi_role");
      if (stored === "institution") setRole("institution");
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // basic validation
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.course.trim()) {
      alert("Please fill required fields: First name, Last name, Email, Course");
      return;
    }

    setSubmitting(true);
    try {
      // TODO: replace with your real API call
      // Example:
      // await fetch('/api/invite-student', { method: 'POST', body: JSON.stringify(form) })

      // Simulate network delay for experience
      await new Promise((res) => setTimeout(res, 700));

      alert(`Invite sent to ${form.email}`);
      router.back(); // close modal / navigate back
    } catch (err) {
      console.error(err);
      alert("Something went wrong sending the invite.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="invite-overlay" role="dialog" aria-modal="true" aria-label="Invite student dialog">
      <div className="invite-modal" role="document">
        <div className="invite-header">
          <h2>Invite Student</h2>
          <button
            type="button"
            className="close-btn"
            aria-label="Close invite dialog"
            onClick={() => router.back()}
          >
            ✕
          </button>
        </div>

        <form className="invite-form" onSubmit={handleSubmit}>
          {/* First + Last Name side-by-side */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Juan"
                required
                autoComplete="given-name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Dela Cruz"
                required
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="student@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="course">Course *</label>
            <select id="course" name="course" value={form.course} onChange={handleChange} required>
              <option value="">-- Choose a course --</option>
              <option value="FSL Basics">FSL Basics</option>
              <option value="Intermediate FSL">Intermediate FSL</option>
              <option value="Advanced FSL">Advanced FSL</option>
            </select>
          </div>

          {role === "institution" && (
            <div className="form-group">
              <label htmlFor="department">Department / Section (optional)</label>
              <input
                id="department"
                name="department"
                type="text"
                value={form.department}
                onChange={handleChange}
                placeholder="Dept. / Section"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="message">Message (optional)</label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={form.message}
              onChange={handleChange}
              placeholder="Welcome message or instructions..."
            />
          </div>

          <div className="invite-actions">
            <button type="button" className="cancel-btn" onClick={() => router.back()} disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? "Sending..." : "Send Invite"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
