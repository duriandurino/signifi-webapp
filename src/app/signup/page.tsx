"use client";

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, UserPlus } from 'lucide-react';
import './signup.css'; 
import { apiFetch } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const RegisterPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

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
          body: JSON.stringify({ email, password, full_name })
        }
      );
      login(resp.token, resp.user);
      router.replace('/educator/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    // The main container now just holds the form panel
    <div className="register-container">
      {/* The form panel is now the only direct child */}
      <div className="form-panel">
        <div className="form-wrapper">
          <div className="form-header">
            {/* You can add your logo here if you want */}
            {/* <img src="/logo.png" alt="SigniFi Logo" className="form-logo" /> */}
            <h2>Create Your Educator Account</h2>
            <p>Join SigniFi and start teaching FSL today</p>
          </div>

          <form className="register-form" onSubmit={onSubmit}>
            <div className="name-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={togglePasswordVisibility} className="password-toggle">
                  {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="institution">Educational Institution</label>
              <input type="text" id="institution" placeholder="University/College name" value={institution} onChange={(e) => setInstitution(e.target.value)} />
            </div>

            <div className="terms-agreement">
              <input type="checkbox" id="terms" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </label>
            </div>

            {error && <div style={{ color: '#b00020', marginBottom: '8px' }}>{error}</div>}
            <button type="submit" className="btn-create-account" disabled={loading}>
              <UserPlus size={20} />
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          <div className="signin-link-footer">
            Already have an account? <a href="/login">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;