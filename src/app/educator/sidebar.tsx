"use client";

import React, { memo, useMemo, useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, BookOpen, Users, BarChart2, User, Settings, LogOut, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Sidebar = memo(() => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = useCallback(() => {
    logout();
    router.push('/login');
    setShowLogoutModal(false);
  }, [logout, router]);

  const navItems = useMemo(() => [
    { href: "/educator/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/educator/courses", icon: BookOpen, label: "Courses" },
    { href: "/educator/students", icon: Users, label: "Students" },
    { href: "/educator/analytics", icon: BarChart2, label: "Analytics" },
    { href: "/educator/profile", icon: User, label: "Profile" },
    { href: "/educator/settings", icon: Settings, label: "Settings" }
  ], []);

  return (
    <aside className="educator-sidebar">
      <div className="sidebar-logo">
        <Image 
          src="/SigniFi.png" 
          alt="SigniFi Logo" 
          width={30} 
          height={30} 
          priority
        />
        <h1>SigniFi</h1>
      </div>
      <nav className="educator-sidebar-nav">
        <ul>
          {navItems.map(({ href, icon: Icon, label }) => (
            <li key={href} className={pathname === href ? "active" : ""}>
              <Link href={href}>
                <Icon size={20} className="nav-icon" /> 
                <span className="nav-label">{label}</span>
              </Link>
            </li>
          ))}
          <li>
            <button onClick={() => setShowLogoutModal(true)} className="logout-button">
              <LogOut size={20} className="nav-icon" /> 
              <span className="nav-label">Logout</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* --- Logout Confirmation Modal --- */}
      {showLogoutModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">

              <button
                onClick={() => setShowLogoutModal(false)}
                className="close-button"
              >
              </button>
            </div>
            <p>Are you sure you want to logout?</p>
            <div className="modal-actions">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="btn-cancel"
              >
                Cancel
              </button>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';
export default Sidebar;
