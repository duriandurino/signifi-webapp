"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, University, UserCheck, Eye, Settings, LogOut
} from 'lucide-react';

// Admin-specific navigation links
const navLinks = [
  { href: "/superadmin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/superadmin/usermanagement", icon: Users, label: "User Management" },
  { href: "/superadmin/institutionverification", icon: University, label: "Institution Verification" },
  { href: "/superadmin/educatorverification", icon: UserCheck, label: "Educator Verification" },
  { href: "/superadmin/superadmin-profile", icon: Eye, label: "View Profile" },
  { href: "/superadmin/settings", icon: Settings, label: "Settings" }
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <Image src="/SigniFi.png" alt="SigniFi Logo" width={30} height={30}/>
        <h1>SigniFi</h1>
      </div>

      {/* Navigation */}
      <nav className="admin-sidebar-nav">
        <ul>
          {navLinks.map(({ href, icon: Icon, label }) => (
            <li key={href} className={pathname === href ? "active" : ""}>
              <Link href={href}>
                <Icon size={20} className="nav-icon" /> 
                <span className="nav-label">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout button at the bottom */}
      <div className="sidebar-logout">
        <button className="logout-btn">
          <LogOut size={20} className="nav-icon" />
          <span className="nav-label">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
