"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Video, Target, BarChart2, Eye, EyeOff, Upload } from 'lucide-react';
import './adminsignup.css';
import { apiFetch } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const AdminSignupPage = () => {
  const router = useRouter();
  const { login } = useAuth();

  // --- Form States ---
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('');
  const [institutionAddress, setInstitutionAddress] = useState('');
  const [role, setRole] = useState('');
  const [adminAgreement, setAdminAgreement] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [verificationFile, setVerificationFile] = useState<File | null>(null);

  // --- UI States ---
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVerificationFile(e.target.files[0]);
    }
  };

  // --- Example list of recognized institutions ---
  const institutionList = [
    'University of the Philippines',
    'Ateneo de Manila University',
    'De La Salle University',
    'Other'
  ];

  // --- Handle Submit ---
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!acceptTerms || !adminAgreement) {
      setError('Please accept all required agreements to continue');
      return;
    }

    try {
      setLoading(true);
      const full_name = `${firstName} ${lastName}`.trim();

      const formData = new FormData();
      formData.append('full_name', full_name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('institution', institution);
      formData.append('institution_address', institutionAddress);
      formData.append('role', role);
      if (verificationFile) {
        formData.append('verification_file', verificationFile);
      }

      const resp = await apiFetch<{ token: string; user: any }>(
        '/api/auth/register-institution-admin',
        {
          method: 'POST',
          body: formData,
        }
      );

      login(resp.token, resp.user);
      router.replace('/institution/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="signup-container">
      {/* --- Left Panel --- */}
      <div className="info-panel-signup">
        <div className="info-content-signup">
          <div className="logo-header">
            <Image src="/SigniFi.png" alt="SigniFi Logo" width={40} height={40} />
            <h2>SigniFi</h2>
          </div>

          <h1 className="tagline">
            Empower <span className="highlight">learning and inclusivity</span> — start your SigniFi journey today.
          </h1>

          <ul className="feature-list-signup">
            <li><Video size={18} /> Interactive Video Lessons.</li>
            <li><Target size={18} /> Real Time Gesture Recognition.</li>
            <li><BarChart2 size={18} /> Comprehensive Analytics</li>
          </ul>

          <p className="signin-prompt">
            — Already have an Account? <a href="/login"> Sign in</a>
          </p>
        </div>
      </div>

      {/* --- Right Panel (Form) --- */}
      <div className="form-panel-signup">
        <div className="form-content-signup">
          <h2>Create Account <span className="highlight">.</span></h2>
          <p className="admin-note">
            NOTE: This account will represent your institution.
          </p>
          <p className="admin-note">
            Please provide your information as the designated admin.
          </p>

          <form className="signup-form" onSubmit={onSubmit}>
            {/* Name Row */}
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-field-password">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  placeholder="Create Strong Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="visibility-toggle"
                >
                  {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Institution Selection */}
            <div className="input-group">
              <label htmlFor="institution">Select Institution</label>
              <select
                id="institution"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                required
              >
                <option value="">-- Select University --</option>
                {institutionList.map((inst) => (
                  <option key={inst} value={inst}>{inst}</option>
                ))}
              </select>
            </div>

            {/* Institution Address */}
            <div className="input-group">
              <label htmlFor="institutionAddress">Institution Address / Campus Location (optional)</label>
              <input
                type="text"
                id="institutionAddress"
                placeholder="Enter address or campus location"
                value={institutionAddress}
                onChange={(e) => setInstitutionAddress(e.target.value)}
              />
            </div>

            {/* Role 
            <div className="input-group">
              <label htmlFor="role">Role / Department</label>
              <input
                type="text"
                id="role"
                placeholder="e.g., IT Admin, Registrar"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div>*/}

            {/* Verification File */}
            <div className="input-group">
              <label htmlFor="verificationFile">Upload Institution Verification Document (optional)</label>
              <input
                type="file"
                id="verificationFile"
                accept=".pdf"
                onChange={handleFileChange}
              />
            </div>

            {/* Agreements */}
            <div className="terms-group">
              <input
                type="checkbox"
                id="adminAgreement"
                checked={adminAgreement}
                onChange={(e) => setAdminAgreement(e.target.checked)}
              />
              <label htmlFor="adminAgreement">
                I agree to the <a href="#">Admin Guidelines / Institution Agreement</a>
              </label>
            </div>

            <div className="terms-group">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </label>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              type="submit"
              className="btn-create-account"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSignupPage;
