"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Video, Target, BarChart2, Eye, EyeOff } from 'lucide-react';
import './signup.css';
import { apiFetch } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const SignupPage = () => {
  const router = useRouter();
  const { login } = useAuth();

  // --- Form States ---
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  // --- UI States ---
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // --- Handle Submit ---
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!acceptTerms) {
      setError('Please accept the Terms to continue');
      return;
    }

    try {
      setLoading(true);
      const full_name = `${firstName} ${lastName}`.trim();
      const resp = await apiFetch<{ token: string; user: any }>(
        '/api/auth/register-educator',
        {
          method: 'POST',
          body: JSON.stringify({ email, password, full_name }),
        }
      );

      // login user after success
      login(resp.token, resp.user);
      router.replace('/educator/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="signup-container">
      {/* --- Left Panel (Informational) --- */}
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

      {/* --- Right Panel (The Form) --- */}
      <div className="form-panel-signup">
        <div className="form-content-signup">
          <h2>Create account <span className="highlight">.</span></h2>

          <form className="signup-form" onSubmit={onSubmit}>
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

            <div className="input-group">
              <label htmlFor="institution">Education Institution</label>
              <input
                type="text"
                id="institution"
                placeholder="University/College Name"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
              />
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

export default SignupPage;
