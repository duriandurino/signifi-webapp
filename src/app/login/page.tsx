"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Video,
  Target,
  BarChart2,
} from "lucide-react";
import "./login.css"; // Using your new stylesheet
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const resp = await apiFetch<{ token: string; user: any }>(
        "/api/auth/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        }
      );
      login(resp.token, resp.user);
      router.replace("/educator/dashboard");
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      {/* --- Left Panel (Login Form) --- */}
      <div className="form-panel">
        <div className="form-content">
          <div className="logo-header">
            <Image src="/SigniFi.png" alt="SigniFi Logo" width={40} height={40} />
            <h2>SigniFi</h2>
          </div>

          <h1>
            Welcome back<span className="highlight3">.</span>
          </h1>

          <form className="auth-form" onSubmit={onSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-field">
                <Mail size={20} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-field">
                <Lock size={20} className="input-icon" />
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
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

            <a href="#" className="forgot-password-link">
              Forgot Password?
            </a>

            {error && (
              <div style={{ color: "#b00020", marginBottom: "8px" }}>
                {error}
              </div>
            )}

            <button type="submit" className="btn-signin" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="extra-links">
            <p>
              Don’t have an account? <a href="/signup">Create Account</a>
            </p>
            <p className="terms-text">
              By signing in, you agree to our{" "}
              <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>

      {/* --- Right Panel (Informational) --- */}
      <div className="info-panel">
        <div className="info-content">
          <h2>
            Bridge <span className="highlight1">communication</span> and promote
            accessibility through{" "}
            <span className="highlight2">innovative digital learning.</span>
          </h2>
          <ul className="feature-list-auth">
            <li>
              <Video size={18} /> Interactive Video Lessons.
            </li>
            <li>
              <Target size={18} /> Real Time Gesture Recognition.
            </li>
            <li>
              <BarChart2 size={18} /> Comprehensive Analytics
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
